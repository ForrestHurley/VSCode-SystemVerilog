import { Class_declarationContext, Class_itemContext, Function_declarationContext, Tf_item_declarationContext, Include_compiler_directiveContext } from "./grammar/build/SystemVerilogParser";

export class AbstractNode {

    constructor() {
        
    }

    public isAbstract() { return true; }
}

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

export class IncludeNode extends AbstractNode {

    private file_name : string;

    constructor(ctx: Include_compiler_directiveContext){
        super();
        this.file_name = ctx.FILENAME().text.replace(/['"]+/g, '');
    }

    getFileName(){ return this.file_name; }

    public isAbstract() { return false; }
}

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

export class FunctionNode extends AbstractNode {
    private function_identifier: string;
    private function_type: string;
    private function_ports: string[];

    constructor(ctx: Function_declarationContext){
        super();
        this.function_identifier = ctx.function_body_declaration().function_identifier()[0].text;
        this.function_type = ctx.function_body_declaration().function_data_type_or_implicit().data_type_or_void() 
                                    ? ctx.function_body_declaration().function_data_type_or_implicit().data_type_or_void().text
                                    : ctx.function_body_declaration().function_data_type_or_implicit().implicit_data_type().text;
        //this.function_ports = ctx.function_body_declaration().tf_port_list().tf_port_item().map((val) => { return val.port_identifier().text});
    }

    public getFunctionIdentifier(): string {
        return this.function_identifier;
    }

    public getFunctionType(): string {
        return this.function_type;
    }

    public getFunctionPorts(): string[] {
        return this.function_ports;
    }

    public isAbstract() {
        return false;
    }
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
        
        this.methods = new Array<FunctionNode>();
        items.forEach((val) => {
            if (val instanceof FunctionNode)
                this.methods.push(val);
        });
    }

    public getClassIdentifier(): string {
        return this.class_identifier;
    }

    public getParentClass(): string {
        return this.parent_class;
    }

    public getInterfaces(): string[] {
        return this.interfaces;
    }

    public isVirtual(): boolean {
        return this.virtual;
    }

    public getMethods(): FunctionNode[] {
        return this.methods;
    }

    public getProperties(): VariableNode[] {
        return this.properties;
    }

    public getSubClasses(): ClassNode[] {
        return this.subclasses;
    }

    public getConstraints(): ConstraintNode[] {
        return this.constraints;
    }

    public isAbstract() { return false; }
}