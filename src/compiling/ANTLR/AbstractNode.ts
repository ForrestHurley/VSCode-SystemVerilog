import { Class_declarationContext, Class_itemContext } from "./grammar/build/SystemVerilogParser";

export class AbstractNode {

    constructor() {
        
    }

    public isAbstract() { return true; }
}

export class FunctionNode extends AbstractNode {

}

export class VariableNode extends AbstractNode {

}

export class ConstraintNode extends AbstractNode {

}

export class ClassNode extends AbstractNode {

    private class_identifier: string;
    private parent_class: string;
    private interfaces: string[];
    private virtual: boolean;

    private methods: FunctionNode[];
    private properties: VariableNode[];
    private subclasses: ClassNode[];
    private constraints: ConstraintNode[];

    constructor(ctx: Class_declarationContext, items: AbstractNode[]) {
        super();
        this.class_identifier = ctx.class_identifier()[0].text;
        this.interfaces = ctx.interface_class_type().map((val) => { return val.text; });
        if (ctx.class_type()){
            this.parent_class = ctx.class_type().text;
        }
        if (ctx.virtual_class_modifier().text == "")
            this.virtual = false;
        else
            this.virtual = true;
    }

    public isAbstract() { return false; }
}