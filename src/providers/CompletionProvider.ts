
import { SystemVerilogIndexer } from '../indexer';
//import {CompletionItemProvider, TextDocument, commands} from 'vscode';
import {CompletionItem, Position, TextDocument, CancellationToken, CompletionContext, CompletionItemKind, Command } from 'vscode-languageserver';
import { SystemVerilogSymbol } from '../symbol';

// See test/SymbolKind_icons.png for an overview of the icons
export function getCompletionItemKind(name: String): CompletionItemKind {
    switch (name) {
        case 'parameter':
        case 'localparam': return CompletionItemKind.Property;
        case 'package':
        case 'import': return CompletionItemKind.File;
        case 'wire':
        case 'reg':
        case 'logic': return CompletionItemKind.Variable;
        case 'string': return CompletionItemKind.Text;
        case 'class': return CompletionItemKind.Class;
        case 'task': return CompletionItemKind.Method;
        case 'function': return CompletionItemKind.Function;
        case 'interface': return CompletionItemKind.Interface;
        case 'event': return CompletionItemKind.Event;
        case 'struct': return CompletionItemKind.Struct;
        case 'program':
        case 'module':
        default: return CompletionItemKind.Reference;
    }
}


export class SVCompletionItemProvider {
    private indexer: SystemVerilogIndexer;
    private globals: CompletionItem[]
    private known_types: CompletionItem[]

    constructor() {
        //this.indexer = indexer;

        // See CompletionItemKind for overview
        this.globals.push ({
            label: "begin",
            kind: CompletionItemKind.Module
        });
        //     new CompletionItem("end"        ,CompletionItemKind.Module),
        //     new CompletionItem("parameter"  ,CompletionItemKind.Constant),
        //     new CompletionItem("localparam" ,CompletionItemKind.Constant),
        //     new CompletionItem("logic"      ,CompletionItemKind.Variable),

        // this.known_types = [
        //     new CompletionItem("input"   ,CompletionItemKind.Interface),
        //     new CompletionItem("output"  ,CompletionItemKind.Interface),
        // ];

    };

    //Entrypoint for getting completion items
    public provideCompletionItems(document: TextDocument, position: Position): CompletionItem[]{
        
        //return new Promise( (resolve) => {
            let completionItems: CompletionItem[] = [];
            completionItems = completionItems.concat(this.globals);
            // var lookupRange = document.getWordRangeAtPosition(position);
            // var lookupTerm = document.getText(lookupRange);
            const offset = document.offsetAt(position);
            if (document.getText()[offset] === '$') {
                completionItems.concat(this.getDollarItems());
            }
            // if (context.triggerCharacter == '$') {
            //     completionItems.concat(this.getDollarItems());
            // }
            // get all DocumentSymbolproviders and step to each of them

            //return Command.executeCommand("vscode.executeDocumentSymbolProvider", document.uri)
            // return (this.globals)
            // .then( (symbols : SystemVerilogSymbol[]) => {
            //     symbols.forEach( (value: SystemVerilogSymbol) => {
            //        console.log(value.containerName);
            //        completionItems.push(this.constructModuleItem(value));
            //     });
            // }).then(_ => {
            //     return resolve(completionItems)
            // });

            return completionItems;
            // this.indexer.provideWorkspaceSymbols(lookupTerm, token, false).then((symbols: SystemVerilogSymbol[]) => {
            //     symbols.forEach((value: SystemVerilogSymbol) => {
            //         if(value.kind = SymbolKind.Module){
            //             completionItems.push(this.constructModuleItem(value));

            //         }
            //     }, completionItems);
            //     resolve(completionItems);
            // });
        // });
        //})
    };


    // Contruct completion item for all system verilog module items
    private constructModuleItem(symbol: SystemVerilogSymbol): CompletionItem {
        let completionItem = CompletionItem.create(symbol.name);
        completionItem.kind = getCompletionItemKind(symbol.containerName);
        return completionItem;
    }

    
    getDollarItems(): CompletionItem[] {
        let completionItems : CompletionItem[] = [];
        completionItems.push ({
            label: 'display',
            kind: CompletionItemKind.Text
        });
        return completionItems;
    }

    // resolveCompletionItem(item:CompletionItem, token:CancellationToken): CompletionItem {

    //     var descMarkdownString = new MarkdownString();
    //     descMarkdownString.appendCodeblock(this.indexer.modules[item.label+item.insertText].toString(), "systemverilog");
    //     item.documentation = descMarkdownString;

    //     item.insertText = new SnippetString(this.createModuleInsertionText(item));
    //     return item;
    // };



    // createModuleInsertionText(item: CompletionItem) : string {

    //     var rawText = this.indexer.modules[item.label+item.insertText];
    //     var text = rawText.replace(/\/\*[\s\S]*?\*\/|([\\:]|^)\/\/.*$/gm, '');
    //     var hasParameters = 0;
    //     var parameters = [];
    //     var insertText = "";
    //     var tabstopCnt = 2;

    //     if (text.indexOf("#") > -1){
    //         hasParameters = 1;
    //         parameters = text.slice(text.indexOf("(") + 1, text.indexOf(")")).split(",");
    //     }
    //     var signals = text.slice(text.lastIndexOf("(") + 1, text.lastIndexOf(")")).split(",");

    //     // Extracting list of parameters
    //     if(hasParameters ){
    //         for(var i = 0; i < parameters.length; i++){
    //             var splitParameter = parameters[i].trim().replace(/\[(.*?)\]/,"").split(/ +/);
    //             var p = splitParameter[splitParameter.length - 1];
    //             parameters[i] = p;
    //         }
    //     }

    //     // Extracting list of signals
    //     for(var i = 0; i < signals.length; i++){
    //         var splitSignal = signals[i].trim().replace(/\[(.*?)\]/,"").split(/ +/);
    //         var s = splitSignal[splitSignal.length - 1];
    //         signals[i] = s;
    //     }

    //     // Creatign the insertText based on the module name parameters and signals
    //     insertText = item.label;
    //     if (hasParameters){
    //         insertText = insertText +  + hasParameters ? "  #(\n" : "";
    //         for(var i = 0; i < parameters.length; i++ ){
    //             if (i != 0){
    //                 insertText = insertText + ",\n";
    //             }
    //             insertText = insertText + "\t." + parameters[i] + "($" + tabstopCnt.toString() + ")";
    //             tabstopCnt++;
    //         }
    //         insertText = insertText + "\n)";
    //     }

    //     insertText = insertText + "  $1 (\n";
    //     for(var i = 0; i < signals.length; i++ ){
    //         if (i != 0){
    //             insertText = insertText + ",\n";
    //         }
    //         insertText = insertText + "\t." + signals[i] + "($" + tabstopCnt.toString() + ")";
    //         tabstopCnt++;
    //     }
    //     insertText = insertText + "\n);";
    //     return insertText;
    // };
};
