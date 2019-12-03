import {
    Position,
    Range,
    DiagnosticSeverity,
    Diagnostic,
    TextDocument,
} from "vscode-languageserver";
import { ANTLRInputStream, CommonTokenStream, ConsoleErrorListener} from 'antlr4ts';
import {SystemVerilogLexer} from './ANTLR/grammar/build/SystemVerilogLexer'
import {SystemVerilogParser, System_verilog_textContext} from './ANTLR/grammar/build/SystemVerilogParser'
import {SyntaxErrorListener} from './ANTLR/SyntaxErrorListener'
import { isSystemVerilogDocument, isVerilogDocument, getLineRange } from '../utils/server';
import { DiagnosticData, isDiagnosticDataUndefined } from "./DiagnosticData";
import { ASTBuilder } from "./ANTLR/ASTBuilder";
import { RootNode, IncludeNode } from "./ANTLR/ASTNode";
import * as path from 'path';
import { Preprocessor } from "./ANTLR/Preprocessor";

export class ANTLRBackend{
    built_parse_trees = new Map<string, System_verilog_textContext>();
    abstract_trees = new Map<string, RootNode>();
    building_errors = new Map<string, SyntaxErrorListener>();
    currently_parsing = new Map<string, boolean>();
    preprocessor = new Preprocessor();

    openFunction:Function;

    constructor(openFunction?:Function){
        this.openFunction = openFunction;
    }

    /**
     * Parse a document with the ANTLR parser and return any diagnostic errors
     * 
     * @param document the document to parse
     * @returns a null promise
     */
    public async parseDocument(document: TextDocument): Promise<void> {
        if (this.currently_parsing[document.uri])
            return new Promise((resolve, reject) => { reject(); });
        
        this.currently_parsing[document.uri] = true;
        return new Promise(async (resolve, reject) => {
            if (!document) {
                this.currently_parsing[document.uri] = false;
                reject("SystemVerilog: Invalid document.");
                return;
            }

            if (!isSystemVerilogDocument(document) && !isVerilogDocument(document)) {
                this.currently_parsing[document.uri] = false;
                reject("The document is not a SystemVerilog/Verilog file.");
                return;
            }

            let text = document.getText();
            // Preprocess text
            let new_text = this.preprocessor.preprocess(text);
            // Create the lexer and parser
            let inputStream = new ANTLRInputStream(new_text);   
            let lexer = new SystemVerilogLexer(inputStream);
            let tokenStream = new CommonTokenStream(lexer);
            let parser = new SystemVerilogParser(tokenStream);

            //Use syntaxError to collect a list of errors found by the parser
            let syntaxError = new SyntaxErrorListener();
            parser.addErrorListener(syntaxError);

            // Parse the input
            let tree = parser.system_verilog_text();
            
            let builder = new ASTBuilder();
            let ast = builder.visit(tree) as RootNode;
            ast.uri = document.uri;
            await this.loadIncludes(ast);

            this.built_parse_trees[document.uri] = tree;
            this.abstract_trees[document.uri] = ast;
            this.building_errors[document.uri] = syntaxError;
            this.currently_parsing[document.uri] = false;
            resolve();
        });
    }

    public async loadIncludes(ast: RootNode): Promise<void> {
        if (!ast.uri)
            return;

        ast.getChildren().forEach(async (val) => {
            if (val instanceof IncludeNode){
                let include_dir = path.dirname(ast.uri) + "/" + val.getFileName();
                if (this.openFunction) {
                    if (!this.built_parse_trees[include_dir] &&
                        !this.currently_parsing[include_dir])
                        this.openFunction(include_dir);
                }
            }
        });
    }

    /**
     * Parse a document with the ANTLR parser and return any diagnostic errors
     * 
     * @param document the document to parse
     * @returns a dictionary of arrays of errors with uri as keys
     */
    public async getDiagnostics(document: TextDocument, always_parse: boolean = false): Promise<Map<string, Diagnostic[]>> {
        let iterations = 100;
        let wait_time = 100;

        //wait for currently_parsing to not be true
        if (!this.built_parse_trees[document.uri] || this.currently_parsing[document.uri] || always_parse){
            if (!this.currently_parsing[document.uri]){
                await this.parseDocument(document);
            }

            let idx = 0;
            while(this.currently_parsing[document.uri] && idx < iterations){
                idx++;
                await new Promise((r, j)=>setTimeout(r, wait_time));
            }
        }

        if (!this.built_parse_trees[document.uri] || this.currently_parsing[document.uri])
            return new Promise((resolve,reject) => { reject(); });

        return new Promise((resolve, reject) => {
            let syntaxError = this.building_errors[document.uri];
            let diagnosticCollection: Map<string, Diagnostic[]> = new Map();
            //place errors in the diagnostic list
            let diagnosticList = new Array<Diagnostic>();
            for (let i = 0; i < syntaxError.error_list.length; i++) {
                let range: Range = getLineRange(
                    syntaxError.error_list[i].line, 
                    syntaxError.error_list[i].offendingSymbol.text, 
                    syntaxError.error_list[i].charPositionInLine);

                let diagnostic = {
                    severity: DiagnosticSeverity.Error,
                    range: range,
                    message: this.getImprovedMessage(syntaxError.error_list[i],document.uri,i+1),
                    source: 'systemverilog'
                };

                if (diagnostic.message != "") //If message is blank, ignore it
                    diagnosticList.push(diagnostic);
            }
            diagnosticCollection.set(document.uri,diagnosticList);

            resolve(diagnosticCollection);
        });
    }

    /**
        Function for getting a more helpful error message than the one included
        in the parser error msg property.

        @param parser_error The error object given by the parser
        @param uri The document the error is in
        @param error_count The number of errors found in the file, used to filter out some messages
        @returns The appropriate user facing error message
    */
    public getImprovedMessage(parser_error: any, uri: string, error_count: Number): string {
        let out: string = parser_error.msg;
        if (parser_error.msg.startsWith("extraneous input")) {
            out = 'extraneous input "' + parser_error.offendingSymbol.text + '"';
        }
        if (parser_error.msg.startsWith("mismatched input")) {
            if (error_count > 1)
                out = ""; //filter out all errors for mismatched input
            else
                out = 'mismatched input "' + parser_error.offendingSymbol.text + '"';
        }
        return out;
    }
};
