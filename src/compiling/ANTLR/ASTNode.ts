import { Class_declarationContext, Function_body_declarationContext, Include_compiler_directiveContext, Variable_decl_assignmentContext, Constraint_declarationContext, Module_declarationContext, System_verilog_textContext, IdentifierContext, Port_identifierContext, Net_decl_assignmentContext, Net_declarationContext, List_of_port_identifiersContext, Inout_declarationContext, Input_declarationContext, Output_declarationContext, List_of_variable_port_identifiersContext, List_of_tf_variable_identifiersContext, Tf_port_declarationContext, Ansi_port_declarationContext, Specify_output_terminal_descriptorContext, Tf_port_itemContext, PrimaryContext, Class_constructor_declarationContext, ExpressionContext, StatementContext, Hierarchical_identifierContext, Implicit_class_handleContext, Blocking_assignmentContext, Data_declarationContext, Assertion_variable_declarationContext, Struct_union_memberContext, Data_type_or_implicitContext, Packed_dimensionContext, Data_typeContext } from "./grammar/build/SystemVerilogParser";
import { Token } from "antlr4ts/Token";
import { ParserRuleContext } from "antlr4ts";
import { Range, Position } from "vscode-languageserver-types";
import { State } from "vscode-languageclient";
import { PassThrough } from "stream";

export class AbstractNode {

    protected start: Token;
    protected stop: Token;
    private parent?: AbstractNode;

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
        return new Array<AbstractNode>();
    }

    public setParent(parent: AbstractNode): void {
        this.parent = parent;
    }

    public getParent(): AbstractNode {
        return this.parent;
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

export class AssignmentNode extends AbstractNode {

    private text:string;
    private children:AbstractNode[];

    constructor(ctx: Blocking_assignmentContext, right_items:AbstractNode[]){
        super(ctx);
        this.text = ctx.text;
        this.children = new Array<AbstractNode>();

        if (ctx.class_new()){
            let node_list = new Array<AbstractVariableNode>();
            if (ctx.implicit_class_handle())
                node_list.push(new VariableNode(ctx.implicit_class_handle()));
            if (ctx.class_scope())
                true;

            if(ctx.package_scope())
                true;

            node_list.push(new VariableNode(ctx.hierarchical_variable_identifier().hierarchical_identifier()));

            let new_node = node_list[0];
            node_list.slice(1).forEach((val)=>{
                new_node.appendToHierarchy(val);
            });

            this.children.push(new_node);
        }

        this.children = this.children.concat(right_items);
    }

    public getChildren(): AbstractNode[] {
        return this.children;
    }
    
    public isAbstract() { return false; }
}

export class ClassNode extends AbstractNode {

    private class_identifier: string;
    private parent_class: string;
    private interfaces: string[];
    private virtual: boolean;

    private methods: FunctionNode[];
    private properties: AbstractVariableNode[];
    private subclasses: ClassNode[];
    private constraints: ConstraintNode[];

    constructor(ctx: Class_declarationContext, items: AbstractNode[]) {
        super(ctx);
        this.class_identifier = ctx.class_identifier()[0].text;
        this.interfaces = ctx.interface_class_type().map((val) => { return val.text; });
        
        this.methods = new Array<FunctionNode>();
        this.properties = new Array<AbstractVariableNode>();
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
            else if (val instanceof AbstractVariableNode)
                this.properties.push(val);
            else if (val instanceof ClassNode)
                this.subclasses.push(val);
            else if (val instanceof ConstraintNode)
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

    public getProperties(): AbstractVariableNode[] {
        return this.properties;
    }

    public getSubClasses(): ClassNode[] {
        return this.subclasses;
    }

    public getConstraints(): ConstraintNode[] {
        return this.constraints;
    }

    public getChildren(): AbstractNode[] {
        let children = new Array<AbstractNode>();

        children = children
            .concat(this.methods)
            .concat(this.properties)
            .concat(this.subclasses)
            .concat(this.constraints);

        return children;
    }

    public isAbstract() { return false; }
}

export class FunctionNode extends AbstractNode {
    private function_identifier: string;
    private ports: PortNode[];
    private statements: StatementNode[];

    constructor(ctx: Function_body_declarationContext|Class_constructor_declarationContext, items: AbstractNode[]){
        super(ctx);
        this.ports = new Array<PortNode>();
        this.statements = new Array<StatementNode>();
        items.forEach((val) => {
            if(val instanceof PortNode)
                this.ports.push(val);
            if(val instanceof StatementNode)
                this.statements.push(val);
        })
        if (ctx instanceof Function_body_declarationContext)
            this.function_identifier = ctx.function_identifier(0).text;
        else if (ctx instanceof Class_constructor_declarationContext)
            this.function_identifier = "new";
    }

    public getChildren(): AbstractNode[] {
        let children = new Array<AbstractNode>();
        children = children
            .concat(this.ports)
            .concat(this.statements);

        return children;
    }

    public getIdentifier(): string {
        return this.function_identifier;
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
    private variables: AbstractVariableNode[];
    private statements: StatementNode[];
    
    constructor(ctx: Module_declarationContext, items: AbstractNode[], nonPorts: AbstractNode[]) {
        super(ctx);
        this.ports = new Array<PortNode>();
        this.variables = new Array<AbstractVariableNode>();
        this.statements = new Array<StatementNode>();
        this.module_identifier = ctx.module_ansi_header() ? ctx.module_ansi_header().module_identifier().text
                                                          : ctx.module_nonansi_header() ? ctx.module_nonansi_header().module_identifier().text
                                                                                        : "";
        items.forEach((val) => {
            if(val instanceof PortNode)
                this.ports.push(val);
            else if(val instanceof AbstractVariableNode)
                this.variables.push(val);
            else if(val instanceof StatementNode)
                this.statements.push(val);
        });
        nonPorts.forEach((val) => {
            if(val instanceof PortNode)
                this.ports.push(val);
            else if(val instanceof AbstractVariableNode)
                this.variables.push(val);
            else if(val instanceof StatementNode)
                this.statements.push(val);
        })
    }

    public getChildren(): AbstractNode[] {
        let children = new Array<AbstractNode>();
        return children
            .concat(this.ports)
            .concat(this.variables)
            .concat(this.statements);
    }

    public getIdentifier(): string {
        return this.module_identifier;
    }

    public isAbstract() { return false; }
}

export class StatementNode extends AbstractNode {
    private text:string;
    private children:AbstractNode[];

    constructor(ctx: StatementContext, items: AbstractNode[]){
        super(ctx);

        this.text = ctx.text;
        this.children = items;
    }

    public getChildren(): AbstractNode[]{
        return this.children;
    }

    public getText(): string{
        return this.text;
    }

    public isAbstract() { return false; }
}

export class AbstractVariableNode extends AbstractNode {
    
    private variable_identifier: string;
    private port_type: string;
    private virtual: boolean;
    private dimensions: [number, number][];

    private sub_variable?: AbstractVariableNode;

    constructor(ctx: ParserRuleContext, 
            variable_identifier: string, 
            port_type: string = "", 
            sub_variable?: AbstractVariableNode, 
            dimensions?: [number, number][],
            virtual: boolean = false,){
        super(ctx);

        this.variable_identifier = variable_identifier;
        this.port_type = port_type;
        this.sub_variable = sub_variable;
        this.virtual = virtual;
        this.dimensions = dimensions;
    }

    public appendToHierarchy(node: AbstractVariableNode){
        if (this.sub_variable)
            this.sub_variable.appendToHierarchy(node);
        else
            this.sub_variable = node;
        if (this.stop.stopIndex < node.getStopToken().stopIndex)
            this.stop = node.getStopToken();
    }

    public getIdentifier(): string {
        return this.variable_identifier;
    }

    public getType(): string {
        return this.port_type;
    }

    public getVirtual(): boolean {
        return this.virtual;
    }

    public getChildren(): AbstractNode[] {
        if (this.sub_variable)
            return [this.sub_variable];
        return new Array<AbstractNode>();
    }

    public getDimensions(): [number, number][] {
        if(this.dimensions)
            return this.dimensions;
        return new Array<[number,number]>();
    }

    public isAbstract() { return false; }
    
}

export class VariableDeclarationNode extends AbstractVariableNode {

    private static tempDimensions: [number, number][];

    constructor(ctx: Variable_decl_assignmentContext){
        VariableDeclarationNode.tempDimensions = new Array<[number,number]>();
        let variable_identifier = VariableDeclarationNode.findIdentifier(ctx);
        let variable_type = VariableDeclarationNode.findType(ctx);
        super(ctx,variable_identifier, variable_type, null, VariableDeclarationNode.tempDimensions);
    }

    private static findIdentifier(ctx: Variable_decl_assignmentContext): string {
        if(ctx.variable_identifier())
            return ctx.variable_identifier().text;
        else if(ctx.dynamic_array_variable_identifier())
            return ctx.dynamic_array_variable_identifier().text;
        else if(ctx.class_variable_identifier())
            return ctx.class_variable_identifier().text;
        return "";
    }

    private static findType(ctx: Variable_decl_assignmentContext): string {
        let grandparent = ctx.parent.parent;
        if(grandparent instanceof Assertion_variable_declarationContext)
            return grandparent.var_data_type().text;
        else if(grandparent instanceof Struct_union_memberContext)
            return grandparent.data_type_or_void().text;
        else if(grandparent instanceof Data_declarationContext)
            return this.findRange(grandparent.data_type_or_implicit());
        return "";
    }

    private static findRange(ctx: Data_type_or_implicitContext): string {
        if(ctx.data_type()) {
            for(let x = 0; x < ctx.data_type().packed_dimension().length; x++)
                this.addDimension(ctx.data_type(), x);
            if(ctx.data_type().integer_vector_type())
                return ctx.data_type().integer_vector_type().text;
            else if(ctx.data_type().type_identifier())
                return ctx.data_type().type_identifier().text
        }
        return ctx.text;
    }

    private static addDimension(ctx: Data_typeContext, index: number){
        let dim1 = parseInt(ctx.packed_dimension(index).constant_range().constant_expression(0).text);
        let dim2 = parseInt(ctx.packed_dimension(index).constant_range().constant_expression(1).text);
        this.tempDimensions.push([dim1, dim2]);
    }
}

export class VariableNode extends AbstractVariableNode {
    constructor(ctx: Hierarchical_identifierContext|Implicit_class_handleContext){
        if (ctx instanceof Hierarchical_identifierContext) {
            super(ctx,ctx.identifier()[0].text);
            ctx.identifier().slice(1).forEach((val) => {
                let new_node = new VariableNode(val);
                this.appendToHierarchy(new_node);
            });
        }
        else
            super(ctx,ctx.text);
    }
}

export class PortNode extends AbstractVariableNode {
    
    constructor(ctx: Port_identifierContext | Net_decl_assignmentContext) {
        let port_identifier = PortNode.findIdentifier(ctx);
        let port_type = PortNode.findType(ctx);

        let virtual = false;
        if (port_type.startsWith("virtual")){
            virtual = true;
            port_type = port_type.substring(7);
        }

        super(ctx,port_identifier,port_type,undefined,undefined,virtual);
    }

    private static findIdentifier(ctx: Port_identifierContext | Net_decl_assignmentContext) : string {
        return ctx instanceof Net_decl_assignmentContext ? ctx.net_identifier().text
                                                         : ctx.text;
    }

    private static findType(ctx: Port_identifierContext | Net_decl_assignmentContext) : string {
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