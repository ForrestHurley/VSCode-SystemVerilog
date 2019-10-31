import { AbstractNode } from "./AbstractNode";

export class IdentifierNode extends AbstractNode {

    private tokenText : string;
    private children : AbstractNode[];

    constructor(text: string, children? : AbstractNode[]) {
        super();
        this.tokenText = text;
        this.children = children;
    }

    public isAbstract() { return false; }

    public getText() : string {
        return this.tokenText;
    }

    public getChildren() : AbstractNode[] {
        return this.children;
    }

}