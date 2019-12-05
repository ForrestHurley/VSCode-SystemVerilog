import {ANTLRBackend} from '../compiling/ANTLRBackend';
import {Range, CompletionItem, Position, TextDocument, CancellationToken, CompletionContext, CompletionItemKind, Command } from 'vscode-languageserver';
import { ASTUtils } from "../compiling/ANTLR/ASTUtils"
import { type } from 'os';
import { PortNode, AbstractVariableNode, ClassNode, VariableDeclarationNode } from '../compiling/ANTLR/ASTNode';

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
/**
 * Provides autocomplete items based on trigger character
 */
export class SVCompletionItemProvider {
    private globals: CompletionItem[] = [];     
    private backend: ANTLRBackend;

    constructor(backend: ANTLRBackend) {
        this.backend = backend;
    };

    //Entrypoint for getting completion items
    public provideCompletionItems(document: TextDocument, position: Position, context: CompletionContext): CompletionItem[]{
        let completionItems: CompletionItem[] = [];
        let triggerChar: string = context.triggerCharacter;

        //gets different completion items based on trigger character
        switch (triggerChar) {
            case '$':
                completionItems = completionItems.concat(this.getDollarItems());
                break;
            case '.':
                completionItems = completionItems.concat(this.getFieldItems(document, position));
                break;
            case ' ':
                //completion items for empty space trigger char
                break;
            case '[':
                break;
        }
        
        return completionItems;
    };

    private getDollarItems(): CompletionItem[] {
        let completionItems : CompletionItem[] = [];

        //more dollar items can be added here, or this list can be extracted in separate file
        var dollaritems = new Map([
            ['display', 'function'],
            ['finish', 'string'],
            ['monitor', 'function'],
            ['dumpfile', 'function'],
            ['support', 'function']
         ]);

        for (let [key, value] of dollaritems.entries()) {
            completionItems.push(this.constructCompletionItems(key, value));
        };
        
        return completionItems;
    }

    private getFieldItems(document: TextDocument, position: Position): CompletionItem[] {
        let completionItems : CompletionItem[] = [];
        let property_items: string[] = [];
        let method_items: string[] = [];
        
        //use passed in position to
        //find token before "."
        //get field items using AST
        //
        
        let uri = document.uri.toString();
        let ast = this.backend.abstract_trees[uri];
        
        let loc = document.positionAt(document.offsetAt(position)-2);
        loc.line += 1;
        let range = Range.create(loc,loc);

        let node = ASTUtils.findNodeFromRange(range,ast);

        if (node instanceof AbstractVariableNode){
            if (node.getIdentifier() == "this"){
                let this_node = ASTUtils.findThis(node);
                if (this_node instanceof ClassNode){
                    this_node.getProperties().forEach((val) => {
                        property_items.push(val.getIdentifier());
                    });
                    this_node.getMethods().forEach((val) => {
                        method_items.push(val.getIdentifier());
                    });
                }
            }
            else {
                let defin_node = ASTUtils.findDefinition(node);
                if (defin_node instanceof VariableDeclarationNode) {
                    //something with the type of the definition
                }
            }
        }
        
        // this.backend.abstract_trees[uri].children[*]
        // ast.entries.forEach(entry => {
        
        // });
        
        property_items.forEach(element => {
            completionItems.push(this.constructCompletionItems(element, 'parameter'));
        });
        method_items.forEach(element => {
            completionItems.push(this.constructCompletionItems(element, 'task'));
        });
        return completionItems;
    }

    private constructCompletionItems(value: string, kind: string): CompletionItem {
        let item : CompletionItem = CompletionItem.create(value);
        item.kind = getCompletionItemKind(kind);
        return item;
    }
};

