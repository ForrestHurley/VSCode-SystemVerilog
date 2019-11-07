
import {CompletionItem, Position, TextDocument, CancellationToken, CompletionContext, CompletionItemKind, Command } from 'vscode-languageserver';

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

    constructor() {
        // See CompletionItemKind for overview
        this.globals.push ({
            label: "begin",
            kind: CompletionItemKind.Module
        });
        //     new CompletionItem("end"        ,CompletionItemKind.Module),
        //     new CompletionItem("parameter"  ,CompletionItemKind.Constant),
        //     new CompletionItem("localparam" ,CompletionItemKind.Constant),
        //     new CompletionItem("logic"      ,CompletionItemKind.Variable),
    };

    //Entrypoint for getting completion items
    public provideCompletionItems(document: TextDocument, position: Position, context: CompletionContext): CompletionItem[]{
        let completionItems: CompletionItem[] = [];
        let triggerChar: string = context.triggerCharacter;

        //gets different completion items based on trigger character
        switch (triggerChar) {
            case '$':
                completionItems = completionItems.concat(this.getDollarItems());
            case '.':
                completionItems = completionItems.concat(this.getFieldItems(position));
            case ' ':
                //completion items for empty space trigger char
        }
        
        return completionItems;
    };

    private getDollarItems(): CompletionItem[] {
        let completionItems : CompletionItem[] = [];
        let dollaritems: string[] = ['display', 'finish', 'monitor', 'dumpfile', 'support']
        dollaritems.forEach(element => {
            completionItems.push(this.constructCompletionItems(element, 'function'));
        });
        return completionItems;
    }

    private getFieldItems(position: Position): CompletionItem[] {
        let completionItems : CompletionItem[] = [];
        let fieldItems: string[] = [];
        
        //use passed in position to
        //find token before "."
        //get field items using AST
        //
        fieldItems.forEach(element => {
            //check field type - variable, method
            completionItems.push(this.constructCompletionItems(element, 'string'));
        });
        return completionItems;
    }

    private constructCompletionItems(value: string, kind: string): CompletionItem {
        let item : CompletionItem = CompletionItem.create(value);
        item.kind = getCompletionItemKind(kind);
        return item;
    }
};
