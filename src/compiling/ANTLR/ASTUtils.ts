import { AbstractNode } from "./ASTNode";
import { Range } from "vscode-languageserver-types";
import { ParseTreeMatch } from "antlr4ts/tree/pattern/ParseTreeMatch";

export class ASTUtils {

    public static findNodeFromRange(range: Range, root : AbstractNode): AbstractNode {
        if(this.isInRange(range, root))
            throw new Error("Range does not exist in defined tree");
        root.getChildren().forEach((val: AbstractNode) => {
            if(this.isInRange(range, val))
                return this.findNodeFromRange(range, val);
        });
        return root;
    }

    private static isInRange(rangeTarget: Range, node: AbstractNode): boolean {
        var nodeRange = node.getRange();
        var startLineDif = nodeRange.start.line - rangeTarget.start.line;
        var endLineDif = rangeTarget.end.line - nodeRange.end.line;
        if(startLineDif < 0 || endLineDif < 0)
            return false;
        else if(startLineDif == 0){
            var startPositionDif = nodeRange.start.character - rangeTarget.start.character;
            if(startPositionDif === 0)
                return false;
        } else if(endLineDif === 0) {
            var endPositionDif = rangeTarget.end.character - nodeRange.end.character;
            if(endPositionDif === 0)
                return false;
        } else {
            return true;
        }
    }

}