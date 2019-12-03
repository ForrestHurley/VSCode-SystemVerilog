import { Class_declarationContext, Function_body_declarationContext, Include_compiler_directiveContext, Variable_decl_assignmentContext, Constraint_declarationContext, Module_declarationContext, System_verilog_textContext, IdentifierContext, Port_identifierContext, Net_decl_assignmentContext, Net_declarationContext, List_of_port_identifiersContext, Inout_declarationContext, Input_declarationContext, Output_declarationContext, List_of_variable_port_identifiersContext, List_of_tf_variable_identifiersContext, Tf_port_declarationContext, Ansi_port_declarationContext, Specify_output_terminal_descriptorContext, Tf_port_itemContext, Assertion_variable_declarationContext, Struct_union_memberContext, Data_declarationContext } from "./grammar/build/SystemVerilogParser";
import { Token } from "antlr4ts/Token";
import { ParserRuleContext } from "antlr4ts";
import { Range, Position } from "vscode-languageserver-types";

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

    public getIdentifier(): string{
        return "";
    }

    public getType(): string{
        return "";
    }
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
    private children: AbstractNode[];

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

        this.children = new Array<AbstractNode>();

        if (ctx.class_type()){
            this.parent_class = ctx.class_type().text;
        }
        if (ctx.virtual_class_modifier().text == "")
            this.virtual = false;
        else
            this.virtual = true;

        items.forEach((val) => {
            if (val instanceof FunctionNode){
                this.methods.push(val);
                this.children.push(val);
            }
            if (val instanceof VariableNode){
                this.properties.push(val);
                this.children.push(val);
            }
            if (val instanceof ClassNode){
                this.subclasses.push(val);
                this.children.push(val);
            }
            if (val instanceof ConstraintNode){
                this.constraints.push(val);
                this.children.push(val);
            }
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

    public getChildren(): AbstractNode[] {
        return this.children;
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

    public getChildren(): AbstractNode[] {
        return this.ports;
    }

    public getPorts(): AbstractNode[] {
        return this.ports;
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

    public getText() : string {
        return this.text;
    }

}

export class IncludeNode extends AbstractNode {

    private file_name : string;

    constructor(ctx: Include_compiler_directiveContext){
        super(ctx);
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
    private portType: string;
    
    constructor(ctx: Port_identifierContext | Net_decl_assignmentContext) {
        super(ctx);
        this.portIdentifier = this.findIdentifier(ctx);
        this.portType = this.findType(ctx);
    }

    public isAbstract() { return false; }

    public getIdentifier(): string {
        return this.portIdentifier;
    }

    public getType(): string {
        return this.portType;
    }

    private findIdentifier(ctx: Port_identifierContext | Net_decl_assignmentContext) : string {
        return ctx instanceof Net_decl_assignmentContext ? ctx.net_identifier().text
                                                         : ctx.text;
    }

    private findType(ctx: Port_identifierContext | Net_decl_assignmentContext) : string {
        if(ctx instanceof Net_decl_assignmentContext) {
            let netdeclaration = ctx.parent.parent as Net_declarationContext;
            if(netdeclaration.net_type_identifier())
                return netdeclaration.net_type_identifier().text;
            else if(netdeclaration.net_type())
                return netdeclaration.net_type().text;
            return netdeclaration.data_type_or_implicit().text;
        } else {
            let parent = ctx.parent;
            if(parent instanceof List_of_port_identifiersContext){
                if(parent.parent instanceof Input_declarationContext)
                    return "input";
                else if(parent.parent instanceof Output_declarationContext)
                    return "output";
                return "inout";
            } else if(parent instanceof List_of_variable_port_identifiersContext){
                let grandparent = parent.parent as Output_declarationContext;
                return grandparent.variable_port_type().text;
            } else if(parent instanceof List_of_tf_variable_identifiersContext){
                let grandparent = parent.parent as Tf_port_declarationContext;
                return grandparent.data_type_or_implicit().text;
            } else if(parent instanceof Ansi_port_declarationContext){
                return parent.net_port_header() ? parent.net_port_header().net_port_type().text
                : parent.interface_port_header() ? parent.interface_port_header().interface_identifier() 
                                                     ? parent.interface_port_header().interface_identifier().text 
                                                     : parent.variable_port_header().text : "";
            } else if(parent instanceof Tf_port_itemContext){
                return parent.data_type_or_implicit().text;
            }
            return "";
        }
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
    private variable_type: string;
    private variable_dimension: string;

    constructor(ctx: Variable_decl_assignmentContext){
        super(ctx);
        this.variable_identifier = this.findIdentifier(ctx);
        this.variable_type = this.findType(ctx);
    }

    public getIdentifier(): string {
        return this.variable_identifier;
    }

    public getType(): string {
        return this.variable_type;
    }

    public isAbstract() { return false; }

    private findIdentifier(ctx: Variable_decl_assignmentContext): string {
        if(ctx.variable_identifier())
            return ctx.variable_identifier().text;
        else if(ctx.dynamic_array_variable_identifier())
            return ctx.dynamic_array_variable_identifier().text;
        else if(ctx.class_variable_identifier())
            return ctx.class_variable_identifier().text;
        return "";
    }

    private findType(ctx: Variable_decl_assignmentContext): string {
        let grandparent = ctx.parent.parent;
        if(grandparent instanceof Assertion_variable_declarationContext)
            return grandparent.var_data_type().text;
        else if(grandparent instanceof Struct_union_memberContext)
            return grandparent.data_type_or_void().text;
        else if(grandparent instanceof Data_declarationContext)
            return grandparent.data_type_or_implicit().text
            //return this.findRange(grandparent);
        return "";
    }

    private findRange(ctx: Data_declarationContext): string {
        if(ctx.data_type_or_implicit().data_type() && ctx.data_type_or_implicit().data_type().packed_dimension()) {
            this.variable_dimension = ctx.data_type_or_implicit().data_type().packed_dimension(0).text;
            return ctx.data_type_or_implicit().data_type().integer_vector_type() ?
                        ctx.data_type_or_implicit().data_type().integer_vector_type().text :
                        ctx.data_type_or_implicit().data_type().type_identifier().text;
        }
        else
            return ctx.data_type_or_implicit().text;
    }
    
}