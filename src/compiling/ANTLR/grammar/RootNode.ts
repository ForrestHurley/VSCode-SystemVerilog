import { AbstractNode } from "./AbstractNode";

export class RootNode extends AbstractNode {

    private children : AbstractNode[];

    constructor(children : AbstractNode[]){
        super();
        this.children = children;
    }

    public getChildren() : AbstractNode[] {
        return this.children;
    }

    public isAbstract() { return false; }

}