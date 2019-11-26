import { AbstractNode } from "./ASTNode";
import { Range } from "vscode-languageserver-types";

export class ASTUtils {

    public static findNodeFromRange(range: Range, root : AbstractNode): AbstractNode {
        if(!this.doesContainRange(range, root))
            return new AbstractNode();
        let result = root;
        root.getChildren().forEach((val: AbstractNode) => {
            if(this.doesContainRange(range, val))
                result = this.nodeRange(range, val);
        });
        return result;
    }

    private static nodeRange(range: Range, node: AbstractNode): AbstractNode {
        let result = node;
        node.getChildren().forEach((val: AbstractNode) => {
            if(this.doesContainRange(range, val))
                result = this.nodeRange(range, val);
        });
        return result;
    }

    private static doesContainRange(rangeTarget: Range, node: AbstractNode): boolean {
        let nodeRange = node.getRange();
        let startLineDif = nodeRange.start.line - rangeTarget.start.line;
        let endLineDif = rangeTarget.end.line - nodeRange.end.line;
        if(startLineDif < 0 || endLineDif < 0)
            return true;
        else if(startLineDif == 0){
            let startPositionDif = nodeRange.start.character - rangeTarget.start.character;
            if(startPositionDif <= 0)
                return true;
        } else if(endLineDif === 0) {
            let endPositionDif = rangeTarget.end.character - nodeRange.end.character;
            if(endPositionDif <= 0)
                return true;        
        }
        return false;
    }

}