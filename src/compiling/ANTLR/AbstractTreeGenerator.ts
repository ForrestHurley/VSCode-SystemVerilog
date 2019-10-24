import { ParseTree } from "antlr4ts/tree/ParseTree";
import { AbstractTokenTree } from "./AbstractTokenTree";
import { System_verilog_textContext } from "./grammar/build/SystemVerilogParser";
import { Token, RuleContext, ANTLRInputStream } from "antlr4ts";
import { SystemVerilogLexer } from "./grammar/build/SystemVerilogLexer";

export class AbstractTreeGenerator {
    public static generateVariablesAbstractTree(concreteTree : System_verilog_textContext) : AbstractTokenTree {
        let tokenTreeRoot : AbstractTokenTree;
        let concreteChildren : ParseTree[] = concreteTree.children;
        let index = 0;
        concreteChildren.forEach((child: ParseTree) => {
            if(child.payload instanceof RuleContext){
                if(this.isSimpleIdentifier(child.payload.toString(this.simpleIdentifiers()))){
                    let tempToken = this.findSimpleIdentifierLeaf(index, concreteTree);
                    if(tempToken) {
                        let tokenNodeTree : AbstractTokenTree = new AbstractTokenTree(tempToken, tokenTreeRoot );
                    }
                    index += child.childCount;
                }
            }
            index++;
        });
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