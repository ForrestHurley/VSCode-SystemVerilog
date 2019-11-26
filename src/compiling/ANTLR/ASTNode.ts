import { Class_declarationContext, Function_body_declarationContext, Include_compiler_directiveContext, Variable_decl_assignmentContext, Constraint_declarationContext, Module_declarationContext, System_verilog_textContext, IdentifierContext, Port_identifierContext, Net_decl_assignmentContext } from "./grammar/build/SystemVerilogParser";
import { Token } from "antlr4ts/Token";
import { ParserRuleContext } from "antlr4ts";
import { Range, Position } from "vscode-languageserver-types";
import { Override } from "antlr4ts/Decorators";

export class AbstractNode {

    private start;
    private stop;

    constructor(ctx?: ParserRuleContext) {
        if(ctx) {
            this.start = ctx.start;
            this.stop = ctx.stop;
        }
    }

    public isAbstract() { return true; }

    public getStartToken(): Token {
        return this.start;
    }

    public getStopToken(): Token {
        return this.stop;
    }

    public getChildren(): AbstractNode[] {
        return new AbstractNode[0]();
    }

    public getRange(): Range {
        return {
            start: Position.create(this.start.line, this.start.charPositionInLine),
            end: Position.create(this.stop.line, this.stop.charPositionInLine ),
        }
    }

    //public getIdentifier?: () => string;
}

export class ConstraintNode extends AbstractNode {

    private constraintIdentifier: string;

    constructor(ctx: Constraint_declarationContext) {
        super(ctx);
        this.constraintIdentifier = ctx.constraint_identifier().text;
    }

    public getIdentifier() {
        return this.constraintIdentifier;
    }

    public isAbstract() { return false; }
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
        super(ctx);
        this.class_identifier = ctx.class_identifier()[0].text;
        this.interfaces = ctx.interface_class_type().map((val) => { return val.text; });
        
        this.methods = new Array<FunctionNode>();
        this.properties = new Array<VariableNode>();
        this.subclasses = new Array<ClassNode>();
        this.constraints = new Array<ConstraintNode>();

        if (ctx.class_type()){
            this.parent_class = ctx.class_type().text;
        }
        if (ctx.virtual_class_modifier().text == "")
            this.virtual = false;
        else
            this.virtual = true;

        items.forEach((val) => {
            if (val instanceof FunctionNode)
                this.methods.push(val);
            if (val instanceof VariableNode)
                this.properties.push(val);
            if (val instanceof ClassNode)
                this.subclasses.push(val);
            if (val instanceof ConstraintNode)
                this.constraints.push(val);
        });

    }

    public getIdentifier(): string {
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

export class FunctionNode extends AbstractNode {
    private function_identifier: string;
    private ports: PortNode[];

    constructor(ctx: Function_body_declarationContext, tfItems: AbstractNode[]){
        super(ctx);
        this.ports = new Array<PortNode>();
        tfItems.forEach((val) => {
            if(val instanceof PortNode)
                this.ports.push(val);
        })
        this.function_identifier = ctx.function_identifier(0).text;
    }

    public getIdentifier(): string {
        return this.function_identifier;
    }

    public isAbstract() {
        return false;
    }
}

export class IdentifierNode extends AbstractNode {

    private text : string;

    constructor(ctx: IdentifierContext) {
        super(ctx);
        this.text = ctx.text;
    }

    public isAbstract() { return false; }

    public getText() : string {
        return this.text;
    }

}

export class IncludeNode extends AbstractNode {

    private file_name : string;

    constructor(ctx: Include_compiler_directiveContext){
        super(ctx);
        this.file_name = "None";
        if (!ctx.exception && ctx.FILENAME())
            this.file_name = ctx.FILENAME().text.replace(/['"]+/g, '');
    }

    getFileName(){ return this.file_name; }

    public isAbstract() { return false; }
}

export class ModuleNode extends AbstractNode {
    private module_identifier: string;
    private ports: PortNode[];
    private variables: VariableNode[];
    
    constructor(ctx: Module_declarationContext, items: AbstractNode[], nonPorts: AbstractNode[]) {
        super(ctx);
        this.ports = new Array<PortNode>();
        this.variables = new Array<VariableNode>();
        this.module_identifier = ctx.module_ansi_header() ? ctx.module_ansi_header().module_identifier().text
                                                          : ctx.module_nonansi_header() ? ctx.module_nonansi_header().module_identifier().text
                                                                                        : "";
        items.forEach((val) => {
            if(val instanceof PortNode)
                this.ports.push(val);
            if(val instanceof VariableNode)
                this.variables.push(val);
        });
        nonPorts.forEach((val) => {
            if(val instanceof PortNode)
                this.ports.push(val);
            if(val instanceof VariableNode)
                this.variables.push(val);
        })
    }

    public getIdentifier(): string {
        return this.module_identifier;
    }

    public isAbstract() { return false; }
}

export class PortNode extends AbstractNode {

    private portIdentifier: string;
    
    constructor(ctx: Port_identifierContext | Net_decl_assignmentContext) {
        super(ctx);
        this.portIdentifier = ctx instanceof Net_decl_assignmentContext ? ctx.net_identifier().text
                                                                        : ctx.text;
    }

    public isAbstract() { return false; }

    public getIdentifier(): string {
        return this.portIdentifier;
    }

}

export class RootNode extends AbstractNode {

    private children : AbstractNode[];

    uri: string;

    constructor(ctx: System_verilog_textContext, children : AbstractNode[]){
        super(ctx);
        this.children = children;
    }

    public getChildren() : AbstractNode[] {
        return this.children;
    }

    public isAbstract() { return false; }

}

export class VariableNode extends AbstractNode {
    
    private variable_identifier: string;

    constructor(ctx: Variable_decl_assignmentContext){
        super(ctx);
        if(ctx.variable_identifier()){
            this.variable_identifier = ctx.variable_identifier().text;
        }
    }

    public getIdentifier(): string {
        return this.variable_identifier;
    }

    public isAbstract() { return false; }
    
}