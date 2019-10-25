import { ParseTree } from "antlr4ts/tree/ParseTree";
import { AbstractTokenTree } from "./AbstractTokenTree";
import { System_verilog_textContext } from "./grammar/build/SystemVerilogParser";
import { Token, RuleContext, ANTLRInputStream } from "antlr4ts";
import { SystemVerilogLexer } from "./grammar/build/SystemVerilogLexer";
import { ParseTreeMatch } from "antlr4ts/tree/pattern/ParseTreeMatch";

export class AbstractTreeGenerator {

    public static generateVariablesAbstractTree(concreteTree : System_verilog_textContext) : AbstractTokenTree {
        let tokenTreeRoot : AbstractTokenTree = new AbstractTokenTree(null);
        let concreteChildren : ParseTree[] = concreteTree.children;
        let childrenMap : Map<ParseTree, ParseTree[]>;
        concreteChildren.forEach((child: ParseTree) => {
            if(childrenMap.has(child.parent)){
                childrenMap.get(child.parent).push(child);
            } else {
                if(child.parent) {
                    childrenMap.set(child.parent, [child]);
                }
            }
        });

        let subRoot : AbstractTokenTree = tokenTreeRoot;
        childrenMap.forEach((children: ParseTree[], parent: ParseTree) => {
            visitParseTree(subRoot, children, parent);
        });

        //Given the subRoot of the current subTree, parse the current rule to see if it is an identifier
        //If it is create a new node in the AbstractTokenTree
        //Else set the sub
        const visitParseTree = (subRoot : AbstractTokenTree, children : ParseTree[], parent: ParseTree) => {
            let out = subRoot;
            if(!parent.parent){
                out = tokenTreeRoot;
            } else {
                if(parent.payload instanceof RuleContext){
                    if(this.isSimpleIdentifier(parent.payload.toString(this.simpleIdentifiers()))){
                        let identifierChild : ParseTree = parent.getChild(0);
                        while(identifierChild.childCount > 0){
                            identifierChild = identifierChild.getChild(0);
                        }
                        let identifierToken : Token = identifierChild.payload as Token;
                        let tokenNode : AbstractTokenTree = new AbstractTokenTree(identifierToken, out, tokenTreeRoot);
                        return tokenNode;
                    }
                } else {
                    children.forEach((child: ParseTree) => {
                        out = !subRoot.getParent() ? visitParseTree(out, childrenMap.get(child), child) : subRoot;
                    });
                }
            }
            return out;
        }

        return tokenTreeRoot;
    }

    private static findSimpleIdentifierLeaf(currentChild : number, concreteTree: System_verilog_textContext): Token {
        let currentTree = concreteTree.getChild(currentChild);
        let leafIndex = currentChild;
        let nextChild = currentTree.getChild(0);
        while(nextChild.getChild(0)) {
            leafIndex++;
            nextChild = nextChild.getChild(0);
        }
        let chStream : ANTLRInputStream = new ANTLRInputStream(nextChild.text);
        let tempLexer : SystemVerilogLexer = new SystemVerilogLexer(chStream);
        let tokenType = tempLexer.nextToken().type;
        return concreteTree.tryGetToken(tokenType, leafIndex)._symbol;
    }

    private static simpleIdentifiers() : string[] {
        return new Array(
            "array_identifier", "block_identifier", "bin_identifier", "cell_identifier", "checker_identifier", "class_identfier",
            "clocking_identifier", "config_identifier", "const_identifier", "constraint_identifier", "covergroup_identifier", "cover_point_identifier",
            "cross_identifier", "enum_identifier", "formal_identifier", "formal_port_identifier", "function_identifier", "generate_block_identifier",
            "genvar_identifier", "index_variable_identifier", "interface_identifier", "interface_instance_identifier", "inout_port_identifier",
            "input_port_identifier", "instance_identifier", "library_identifier", "memeber_identifier", "method_identifier", "modport_identifier",
            "module_identifier", "net_identifier", "net_type_identifier", "output_port_identifier", "package_identifier", "parameter_identifier",
            "port_identifier", "production_identifier", "program_identifier", "property_identifier", "sequence_identifier", "signal_identifier", 
            "specparam_identifier", "task_identifier", "tf_identifier", "terminal_identifier", "topmodule_identifier", "type_identifier", "udp_identifier",
            "variable_identifier"
        );
    }

    private static isSimpleIdentifier(ruleName : string) : boolean {
        return ruleName !== "" && ruleName !== null;
    }
}