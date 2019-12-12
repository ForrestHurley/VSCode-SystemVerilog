import { AbstractNode, ClassNode } from "./ASTNode";
import { Range } from "vscode-languageserver-types";

export class ASTUtils {

    public static findDefinition(node: AbstractNode): AbstractNode {
        return new AbstractNode();
    }

    public static findThis(node: AbstractNode): AbstractNode {
        if (node instanceof ClassNode)
            return node;
        if (!node.getParent())
            return node;
        return this.findThis(node.getParent());
    }

    public static initializeParents(node: AbstractNode): void {
        node.getChildren().forEach((val) => {
            val.setParent(node);
            ASTUtils.initializeParents(val);
        });
    }

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
        if(startLineDif > 0 || endLineDif > 0)
            return false;
        else if(startLineDif == 0){
            let startPositionDif = nodeRange.start.character - rangeTarget.start.character;
            if(startPositionDif > 0)
                return false;
        } else if(endLineDif == 0) {
            let endPositionDif = rangeTarget.end.character - nodeRange.end.character;
            if(endPositionDif > 0)
                return false;        
        }
        return true;
    }

}