import { SystemVerilogVisitor } from "./grammar/build/SystemVerilogVisitor";
import { AbstractParseTreeVisitor } from "antlr4ts/tree/AbstractParseTreeVisitor";
import { AbstractNode, ClassNode, FunctionNode, RootNode, IncludeNode, VariableNode, ConstraintNode, ModuleNode, PortNode } from "./ASTNode";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { System_verilog_textContext, Source_textContext, DescriptionContext, Module_nonansi_headerContext, Module_ansi_headerContext, 
    Module_declarationContext, Module_keywordContext, Interface_declarationContext, Interface_nonansi_headerContext, Interface_ansi_headerContext, 
    Program_declarationContext, Program_nonansi_headerContext, Program_ansi_headerContext, Checker_declarationContext, Class_declarationContext, 
    Interface_class_typeContext, Interface_class_declarationContext, Interface_class_itemContext, Interface_class_methodContext, Package_declarationContext, 
    Timeunits_declarationContext, Parameter_port_listContext, Parameter_port_declarationContext, List_of_portsContext, List_of_port_declarationsContext, 
    Port_declarationContext, PortContext, Port_expressionContext, Port_referenceContext, Port_directionContext, Net_port_headerContext, 
    Variable_port_headerContext, Interface_port_headerContext, Ansi_port_declarationContext, Elaboration_system_taskContext, Finish_numberContext, 
    Module_common_itemContext, Module_itemContext, Module_or_generate_itemContext, Module_or_generate_item_declarationContext, Non_port_module_itemContext, 
    Parameter_overrideContext, Bind_directiveContext, Bind_target_scopeContext, Bind_target_instanceContext, Bind_target_instance_listContext, 
    Bind_instantiationContext, Config_declarationContext, Design_statementContext, Config_rule_statementContext, Default_clauseContext, Inst_clauseContext, 
    Inst_nameContext, Cell_clauseContext, Liblist_clauseContext, Use_clauseContext, Interface_or_generate_itemContext, Extern_tf_declarationContext, 
    Interface_itemContext, Non_port_interface_itemContext, Program_itemContext, Non_port_program_itemContext, Program_generate_itemContext, 
    Checker_port_listContext, Checker_port_itemContext, Checker_port_directionContext, Checker_or_generate_itemContext, 
    Checker_or_generate_item_declarationContext, Checker_generate_itemContext, Class_itemContext, Class_propertyContext, Class_methodContext, 
    Class_constructor_prototypeContext, Class_constraintContext, Class_item_qualifierContext, Property_qualifierContext, Random_qualifierContext, 
    Method_qualifierContext, Method_prototypeContext, Class_constructor_declarationContext, Constraint_declarationContext, Constraint_blockContext, 
    Constraint_block_itemContext, Solve_before_listContext, Constraint_primaryContext, Constraint_expressionContext, Uniqueness_constraintContext, Constraint_setContext, 
    Dist_listContext, Dist_itemContext, Dist_weightContext, Constraint_prototypeContext, Constraint_prototype_qualifierContext, Extern_constraint_declarationContext, 
    Identifier_listContext, Package_itemContext, Package_or_generate_item_declarationContext, Anonymous_programContext, Anonymous_program_itemContext, 
    Local_parameter_declarationContext, Parameter_declarationContext, Specparam_declarationContext, Inout_declarationContext, Input_declarationContext, 
    Output_declarationContext, Interface_port_declarationContext, Ref_declarationContext, Data_declarationContext, Package_import_declarationContext, 
    Package_import_itemContext, Package_export_declarationContext, Genvar_declarationContext, Net_declarationContext, Type_declarationContext, 
    Net_type_declarationContext, LifetimeContext, Data_typeContext, Data_type_or_implicitContext, Implicit_data_typeContext, Enum_base_typeContext, 
    Enum_name_declarationContext, Class_scopeContext, Class_typeContext, Integer_typeContext, Integer_atom_typeContext, Integer_vector_typeContext, 
    Non_integer_typeContext, Net_typeContext, Net_port_typeContext, Variable_port_typeContext, Var_data_typeContext, SigningContext, Simple_typeContext, 
    Struct_union_memberContext, Data_type_or_voidContext, Struct_unionContext, Type_referenceContext, Drive_strengthContext, Strength0Context, 
    Strength1Context, Charge_strengthContext, Delay3Context, Delay2Context, Delay_valueContext, List_of_defparam_assignmentsContext, 
    List_of_genvar_identifiersContext, List_of_interface_identifiersContext, List_of_net_decl_assignmentsContext, List_of_param_assignmentsContext, 
    List_of_port_identifiersContext, List_of_udp_port_identifiersContext, List_of_specparam_assignmentsContext, List_of_tf_variable_identifiersContext, 
    List_of_type_assignmentsContext, List_of_variable_decl_assignmentsContext, List_of_variable_identifiersContext, 
    List_of_variable_port_identifiersContext, Defparam_assignmentContext, Net_decl_assignmentContext, Param_assignmentContext, 
    Specparam_assignmentContext, Type_assignmentContext, Pulse_control_specparamContext, Error_limit_valueContext, Reject_limit_valueContext, 
    Limit_valueContext, Variable_decl_assignmentContext, Class_newContext, Dynamic_array_newContext, Unpacked_dimensionContext, Packed_dimensionContext, 
    Associative_dimensionContext, Variable_dimensionContext, Queue_dimensionContext, Unsized_dimensionContext, Function_data_type_or_implicitContext, 
    Function_declarationContext, Function_body_declarationContext, Function_prototypeContext, Dpi_import_exportContext, Dpi_spec_stringContext, 
    Dpi_function_import_propertyContext, Dpi_task_import_propertyContext, Dpi_function_protoContext, Dpi_task_protoContext, Task_declarationContext, 
    Task_body_declarationContext, Tf_item_declarationContext, Tf_port_listContext, Tf_port_itemContext, Tf_port_directionContext, 
    Tf_port_declarationContext, Task_prototypeContext, Block_item_declarationContext, Modport_declarationContext, Modport_itemContext, 
    Modport_ports_declarationContext, Modport_clocking_declarationContext, Modport_simple_ports_declarationContext, Modport_simple_portContext, 
    Modport_tf_ports_declarationContext, Modport_tf_portContext, Import_exportContext, Concurrent_assertion_itemContext, 
    Concurrent_assertion_statementContext, Assert_property_statementContext, Assume_property_statementContext, Cover_property_statementContext, 
    Expect_property_statementContext, Cover_sequence_statementContext, Restrict_property_statementContext, Property_instanceContext, 
    Property_list_of_argumentsContext, Property_actual_argContext, Assertion_item_declarationContext, Property_declarationContext, 
    Property_port_listContext, Property_port_itemContext, Property_lvar_port_directionContext, Property_formal_typeContext, Property_specContext, 
    Property_exprContext, Property_case_itemContext, Sequence_declarationContext, Sequence_port_listContext, Sequence_port_itemContext, 
    Sequence_lvar_port_directionContext, Sequence_formal_typeContext, Sequence_exprContext, Cycle_delay_rangeContext, Sequence_method_callContext, 
    Sequence_match_itemContext, Sequence_instanceContext, Sequence_list_of_argumentsContext, Sequence_actual_argContext, Boolean_abbrevContext, 
    Sequence_abbrevContext, Consecutive_repetitionContext, Non_consecutive_repetitionContext, Goto_repetitionContext, Const_or_range_expressionContext, 
    Cycle_delay_const_range_expressionContext, Expression_or_distContext, Assertion_variable_declarationContext, Covergroup_declarationContext,
    Coverage_spec_or_optionContext, Coverage_optionContext, Coverage_specContext, Coverage_eventContext, Block_event_expressionContext, 
    Hierarchical_btf_identifierContext, Cover_pointContext, Bins_or_emptyContext, Bins_or_optionsContext, Bins_keywordContext, Trans_listContext, 
    Trans_setContext, Trans_range_listContext, Trans_itemContext, Repeat_rangeContext, Cover_crossContext, List_of_cross_itemsContext, Cross_itemContext, 
    Cross_bodyContext, Cross_body_itemContext, Bins_selection_or_optionContext, Bins_selectionContext, Select_expressionContext, Select_conditionContext, 
    Bins_expressionContext, Covergroup_range_listContext, Covergroup_value_rangeContext, With_covergroup_expressionContext, 
    Set_covergroup_expressionContext, Integer_covergroup_expressionContext, Cross_set_expressionContext, Covergroup_expressionContext, 
    Let_declarationContext, Let_identifierContext, Let_port_listContext, Let_port_itemContext, Let_formal_typeContext, Let_expressionContext, 
    Let_list_of_argumentsContext, Let_actual_argContext, Gate_instantiationContext, Cmos_switch_instanceContext, Enable_gate_instanceContext, 
    Mos_switch_instanceContext, N_input_gate_instanceContext, N_output_gate_instanceContext, Pass_switch_instanceContext, 
    Pass_enable_switch_instanceContext, Pull_gate_instanceContext, Pulldown_strengthContext, Pullup_strengthContext, Enable_terminalContext, 
    Inout_terminalContext, Input_terminalContext, Ncontrol_terminalContext, Output_terminalContext, Pcontrol_terminalContext, Cmos_switchtypeContext, 
    Enable_gatetypeContext, Mos_switchtypeContext, N_input_gatetypeContext, N_output_gatetypeContext, Pass_en_switchtypeContext, Pass_switchtypeContext, 
    Module_instantiationContext, Parameter_value_assignmentContext, List_of_parameter_assignmentsContext, Ordered_parameter_assignmentContext, 
    Named_parameter_assignmentContext, Hierarchical_instanceContext, Name_of_instanceContext, List_of_port_connectionsContext, 
    Ordered_port_connectionContext, Named_port_connectionContext, Interface_instantiationContext, Program_instantiationContext, 
    Checker_instantiationContext, List_of_checker_port_connectionsContext, Ordered_checker_port_connectionContext, Named_checker_port_connectionContext, 
    Generate_regionContext, Loop_generate_constructContext, Genvar_initializationContext, Genvar_iterationContext, Conditional_generate_constructContext, 
    If_generate_constructContext, Case_generate_constructContext, Case_generate_itemContext, Generate_blockContext, Generate_itemContext, 
    Udp_nonansi_declarationContext, Udp_ansi_declarationContext, Udp_declarationContext, Udp_port_listContext, Udp_declaration_port_listContext, 
    Udp_port_declarationContext, Udp_output_declarationContext, Udp_input_declarationContext, Udp_reg_declarationContext, Udp_bodyContext, 
    Combinational_bodyContext, Combinational_entryContext, Sequential_bodyContext, Udp_initial_statementContext, Init_valContext, Sequential_entryContext, 
    Seq_input_listContext, Level_input_listContext, Edge_input_listContext, Edge_indicatorContext, Current_stateContext, Next_stateContext, 
    Output_symbolContext, Level_symbolContext, Edge_symbolContext, Udp_instantiationContext, Udp_instanceContext, Continuous_assignContext, 
    List_of_net_assignmentsContext, List_of_variable_assignmentsContext, Net_aliasContext, Net_assignmentContext, Initial_constructContext, 
    Always_constructContext, Always_keywordContext, Final_constructContext, Blocking_assignmentContext, Operator_assignmentContext, 
    Assignment_operatorContext, Nonblocking_assignmentContext, Procedural_continuous_assignmentContext, Variable_assignmentContext, Action_blockContext, 
    Seq_blockContext, Par_blockContext, Join_keywordContext, Statement_or_nullContext, StatementContext, Statement_itemContext, Function_statementContext, 
    Function_statement_or_nullContext, Variable_identifier_listContext, Procedural_timing_control_statementContext, Delay_or_event_controlContext, 
    Delay_controlContext, Event_controlContext, Event_expressionContext, Procedural_timing_controlContext, Jump_statementContext, Wait_statementContext, 
    Event_triggerContext, Disable_statementContext, Conditional_statementContext, Unique_priorityContext, Cond_predicateContext, Case_statementContext, 
    Case_keywordContext, Case_expressionContext, Case_itemContext, Case_pattern_itemContext, Case_inside_itemContext, Case_item_expressionContext, 
    Randcase_statementContext, Randcase_itemContext, Open_range_listContext, Open_value_rangeContext, PatternContext, Assignment_patternContext, 
    Structure_pattern_keyContext, Array_pattern_keyContext, Assignment_pattern_keyContext, Assignment_pattern_expressionContext, 
    Assignment_pattern_expression_typeContext, Constant_assignment_pattern_expressionContext, Assignment_pattern_net_lvalueContext, 
    Assignment_pattern_variable_lvalueContext, Loop_statementContext, For_initializationContext, For_variable_declarationContext, For_stepContext, 
    For_step_assignmentContext, Loop_variablesContext, Subroutine_call_statementContext, Assertion_itemContext, Deferred_immediate_assertion_itemContext, 
    Procedural_assertion_statementContext, Immediate_assertion_statementContext, Simple_immediate_assertion_statementContext, 
    Simple_immediate_assert_statementContext, Simple_immediate_assume_statementContext, Simple_immediate_cover_statementContext, 
    Deferred_immediate_assertion_statementContext, Deferred_immediate_assert_statementContext, Deferred_immediate_assume_statementContext, 
    Deferred_immediate_cover_statementContext, Clocking_declarationContext, Clocking_eventContext, Clocking_itemContext, Default_skewContext, 
    Clocking_directionContext, List_of_clocking_decl_assignContext, Clocking_decl_assignContext, Clocking_skewContext, Clocking_driveContext, 
    Cycle_delayContext, ClockvarContext, Clockvar_expressionContext, Randsequence_statementContext, ProductionContext, Rs_ruleContext, 
    Rs_production_listContext, Weight_specificationContext, Rs_code_blockContext, Rs_prodContext, Production_itemContext, Rs_if_elseContext, 
    Rs_repeatContext, Rs_caseContext, Rs_case_itemContext, Specify_blockContext, Specify_itemContext, Pulsestyle_declarationContext, 
    Showcancelled_declarationContext, Path_declarationContext, Simple_path_declarationContext, Parallel_path_descriptionContext, 
    Full_path_descriptionContext, List_of_path_inputsContext, List_of_path_outputsContext, Specify_input_terminal_descriptorContext, 
    Specify_output_terminal_descriptorContext, Input_identifierContext, Output_identifierContext, Path_delay_valueContext, 
    List_of_path_delay_expressionsContext, T_path_delay_expressionContext, Trise_path_delay_expressionContext, Tfall_path_delay_expressionContext, 
    Tz_path_delay_expressionContext, T01_path_delay_expressionContext, T10_path_delay_expressionContext, T0z_path_delay_expressionContext, 
    Tz1_path_delay_expressionContext, T1z_path_delay_expressionContext, Tz0_path_delay_expressionContext, T0x_path_delay_expressionContext, 
    Tx1_path_delay_expressionContext, T1x_path_delay_expressionContext, Tx0_path_delay_expressionContext, Txz_path_delay_expressionContext, 
    Tzx_path_delay_expressionContext, Path_delay_expressionContext, Edge_sensitive_path_declarationContext, Parallel_edge_sensitive_path_descriptionContext, 
    Full_edge_sensitive_path_descriptionContext, Data_source_expressionContext, Edge_identifierContext, State_dependent_path_declarationContext, 
    Polarity_operatorContext, System_timing_checkContext, Setup_timing_checkContext, Hold_timing_checkContext, Setuphold_timing_checkContext, 
    Recovery_timing_checkContext, Removal_timing_checkContext, Recrem_timing_checkContext,  Skew_timing_checkContext, Timeskew_timing_checkContext, 
    Fullskew_timing_checkContext, Period_timing_checkContext, Width_timing_checkContext, Nochange_timing_checkContext, Timecheck_conditionContext, 
    Controlled_reference_eventContext, Data_eventContext, Delayed_dataContext, Delayed_referenceContext, End_edge_offsetContext, Event_based_flagContext, 
    NotifierContext, Reference_eventContext, Remain_active_flagContext, Timestamp_conditionContext, Start_edge_offsetContext, ThresholdContext, 
    Timing_check_limitContext, Timing_check_eventContext, Controlled_timing_check_eventContext, Timing_check_event_controlContext, 
    Specify_terminal_descriptorContext, Edge_control_specifierContext, Edge_descriptorContext, Zero_or_oneContext, Z_or_xContext, 
    Timing_check_conditionContext, Scalar_timing_check_conditionContext, Scalar_constantContext, ConcatenationContext, Constant_concatenationContext, 
    Constant_multiple_concatenationContext, Module_path_concatenationContext, Module_path_multiple_concatenationContext, Multiple_concatenationContext, 
    Streaming_concatenationContext, Stream_operatorContext, Slice_sizeContext, Stream_concatenationContext, Stream_expressionContext, 
    Array_range_expressionContext, Empty_unpacked_array_concatenationContext, Tf_callContext, System_tf_callContext, Subroutine_callContext, 
    Function_subroutine_callContext, List_of_argumentsContext, Method_call_bodyContext, Built_in_method_callContext, Array_manipulation_callContext, 
    Randomize_callContext, Array_method_nameContext, Inc_or_dec_expressionContext, Constant_expressionContext, Constant_mintypmax_expressionContext, 
    Constant_param_expressionContext, Param_expressionContext, Constant_range_expressionContext, Constant_part_select_rangeContext, Constant_rangeContext, 
    Constant_indexed_rangeContext, ExpressionContext, Tagged_union_expressionContext, Value_rangeContext, Mintypmax_expressionContext, 
    Module_path_conditional_expressionContext, Module_path_expressionContext, Module_path_mintypmax_expressionContext, Part_select_rangeContext, 
    Indexed_rangeContext, Genvar_expressionContext, Constant_primaryContext, PrimaryContext, Module_path_primaryContext, Class_qualifierContext, 
    Range_expressionContext, Primary_literalContext, Time_literalContext, Time_unitContext, Implicit_class_handleContext, Bit_selectContext, SelectContext, 
    Nonrange_selectContext, Constant_bit_selectContext, Constant_selectContext, Constant_let_expressionContext, Net_lvalueContext, Variable_lvalueContext, 
    Nonrange_variable_lvalueContext, Unary_operatorContext, Binary_operatorContext, Inc_or_dec_operatorContext, Unary_module_path_operatorContext, 
    Binary_module_path_operatorContext, NumberContext, Integral_numberContext, Decimal_numberContext, Binary_numberContext, Octal_numberContext, 
    Hex_numberContext, SignContext, SizeContext, Non_zero_unsigned_numberContext, Real_numberContext, Fixed_point_numberContext, ExpContext, 
    Unsigned_numberContext, Binary_valueContext, Octal_valueContext, Hex_valueContext, Decimal_baseContext, Binary_baseContext, Octal_baseContext, 
    Hex_baseContext, Non_zero_decimal_digitContext, Decimal_digitContext, Binary_digitContext, Octal_digitContext, Hex_digitContext, X_digitContext, 
    Z_digitContext, Unbased_unsized_literalContext, String_literalContext, Attribute_instanceContext, Attr_specContext, Attr_nameContext, 
    Array_identifierContext, Block_identifierContext, Bin_identifierContext, C_identifierContext, Cell_identifierContext, Checker_identifierContext, 
    Class_identifierContext, Class_variable_identifierContext, Clocking_identifierContext, Config_identifierContext, Const_identifierContext, 
    Constraint_identifierContext, Covergroup_identifierContext, Covergroup_variable_identifierContext, Cover_point_identifierContext, 
    Cross_identifierContext, Dynamic_array_variable_identifierContext, Enum_identifierContext, Formal_identifierContext, Formal_port_identifierContext, 
    Function_identifierContext, Generate_block_identifierContext, Genvar_identifierContext, Hierarchical_array_identifierContext, 
    Hierarchical_block_identifierContext, Hierarchical_event_identifierContext, Hierarchical_identifierContext, Hierarchical_net_identifierContext, 
    Hierarchical_parameter_identifierContext, Hierarchical_property_identifierContext, Hierarchical_sequence_identifierContext, 
    Hierarchical_task_identifierContext, Hierarchical_tf_identifierContext, Hierarchical_variable_identifierContext, IdentifierContext, 
    Index_variable_identifierContext, Interface_identifierContext, Interface_instance_identifierContext, Inout_port_identifierContext, 
    Input_port_identifierContext, Instance_identifierContext, Library_identifierContext, Member_identifierContext, Method_identifierContext, 
    Modport_identifierContext, Module_identifierContext, Net_identifierContext, Net_type_identifierContext, Output_port_identifierContext, 
    Package_identifierContext, Package_scopeContext, Parameter_identifierContext, Port_identifierContext, Production_identifierContext, 
    Program_identifierContext, Property_identifierContext, Ps_class_identifierContext, Ps_covergroup_identifierContext, Ps_checker_identifierContext, 
    Ps_identifierContext, Ps_or_hierarchical_array_identifierContext, Ps_or_hierarchical_net_identifierContext, Ps_or_hierarchical_property_identifierContext, 
    Ps_or_hierarchical_sequence_identifierContext, Ps_or_hierarchical_tf_identifierContext, Ps_parameter_identifierContext, Ps_type_identifierContext, 
    Sequence_identifierContext, Signal_identifierContext, Simple_identifierContext, Specparam_identifierContext, Task_identifierContext, Tf_identifierContext, 
    Terminal_identifierContext, Topmodule_identifierContext, Type_identifierContext, Udp_identifierContext, Variable_identifierContext, Include_compiler_directiveContext } from "./grammar/build/SystemVerilogParser";
import { RuleNode } from "antlr4ts/tree/RuleNode";

export class ASTBuilder extends AbstractParseTreeVisitor<AbstractNode> implements SystemVerilogVisitor<AbstractNode> {
    protected defaultResult(): AbstractNode {
        return new AbstractNode();
    }
    visitSystem_verilog_text(ctx: System_verilog_textContext) : RootNode {
        let child_nodes = this.traverseChildren(ctx);
        return new RootNode(ctx, child_nodes);
    }
    visitSource_text?: (ctx: Source_textContext) => AbstractNode;
    visitDescription?: (ctx: DescriptionContext) => AbstractNode;
    visitModule_nonansi_header?: (ctx: Module_nonansi_headerContext) => AbstractNode;
    visitModule_ansi_header?: (ctx: Module_ansi_headerContext) => AbstractNode;
    visitModule_declaration(ctx: Module_declarationContext): AbstractNode {
        let items: AbstractNode[] = new Array<AbstractNode>();
        ctx.module_item().forEach((val) => {
            items = items.concat(this.traverseChildren(val));
        });
        let nonPorts: AbstractNode[] = new Array<AbstractNode>();
        ctx.non_port_module_item().forEach((val) => {
            nonPorts = nonPorts.concat(this.traverseChildren(val));
        });
        return new ModuleNode(ctx, items, nonPorts);
    }
    visitModule_keyword?: (ctx: Module_keywordContext) => AbstractNode;
    visitInterface_declaration?: (ctx: Interface_declarationContext) => AbstractNode;
    visitInterface_nonansi_header?: (ctx: Interface_nonansi_headerContext) => AbstractNode;
    visitInterface_ansi_header?: (ctx: Interface_ansi_headerContext) => AbstractNode;
    visitInclude_compiler_directive(ctx: Include_compiler_directiveContext): IncludeNode {
        return new IncludeNode(ctx);
    }
    visitProgram_declaration?: (ctx: Program_declarationContext) => AbstractNode;
    visitProgram_nonansi_header?: (ctx: Program_nonansi_headerContext) => AbstractNode;
    visitProgram_ansi_header?: (ctx: Program_ansi_headerContext) => AbstractNode;
    visitChecker_declaration?: (ctx: Checker_declarationContext) => AbstractNode;
    visitClass_declaration(ctx: Class_declarationContext): ClassNode {
        let items: AbstractNode[] = new Array<AbstractNode>();
        ctx.class_item().forEach((val) => {
            items = items.concat(this.traverseChildren(val));
        });
        return new ClassNode(ctx,items);
    }
    visitInterface_class_type?: (ctx: Interface_class_typeContext) => AbstractNode;
    visitInterface_class_declaration?: (ctx: Interface_class_declarationContext) => AbstractNode;
    visitInterface_class_item?: (ctx: Interface_class_itemContext) => AbstractNode;
    visitInterface_class_method?: (ctx: Interface_class_methodContext) => AbstractNode;
    visitPackage_declaration?: (ctx: Package_declarationContext) => AbstractNode;
    visitTimeunits_declaration?: (ctx: Timeunits_declarationContext) => AbstractNode;
    visitParameter_port_list?: (ctx: Parameter_port_listContext) => AbstractNode;
    visitParameter_port_declaration?: (ctx: Parameter_port_declarationContext) => AbstractNode;
    visitList_of_ports?: (ctx: List_of_portsContext) => AbstractNode;
    visitList_of_port_declarations?: (ctx: List_of_port_declarationsContext) => AbstractNode;
    visitPort_declaration?: (ctx: Port_declarationContext) => AbstractNode;
    visitPort?: (ctx: PortContext) => AbstractNode;
    visitPort_expression?: (ctx: Port_expressionContext) => AbstractNode;
    visitPort_reference?: (ctx: Port_referenceContext) => AbstractNode;
    visitPort_direction?: (ctx: Port_directionContext) => AbstractNode;
    visitNet_port_header?: (ctx: Net_port_headerContext) => AbstractNode;
    visitVariable_port_header?: (ctx: Variable_port_headerContext) => AbstractNode;
    visitInterface_port_header?: (ctx: Interface_port_headerContext) => AbstractNode;
    visitAnsi_port_declaration?: (ctx: Ansi_port_declarationContext) => AbstractNode;
    visitElaboration_system_task?: (ctx: Elaboration_system_taskContext) => AbstractNode;
    visitFinish_number?: (ctx: Finish_numberContext) => AbstractNode;
    visitModule_common_item?: (ctx: Module_common_itemContext) => AbstractNode;
    visitModule_item?: (ctx: Module_itemContext) => AbstractNode;
    visitModule_or_generate_item?: (ctx: Module_or_generate_itemContext) => AbstractNode;
    visitModule_or_generate_item_declaration?: (ctx: Module_or_generate_item_declarationContext) => AbstractNode;
    visitNon_port_module_item?: (ctx: Non_port_module_itemContext) => AbstractNode;
    visitParameter_override?: (ctx: Parameter_overrideContext) => AbstractNode;
    visitBind_directive?: (ctx: Bind_directiveContext) => AbstractNode;
    visitBind_target_scope?: (ctx: Bind_target_scopeContext) => AbstractNode;
    visitBind_target_instance?: (ctx: Bind_target_instanceContext) => AbstractNode;
    visitBind_target_instance_list?: (ctx: Bind_target_instance_listContext) => AbstractNode;
    visitBind_instantiation?: (ctx: Bind_instantiationContext) => AbstractNode;
    visitConfig_declaration?: (ctx: Config_declarationContext) => AbstractNode;
    visitDesign_statement?: (ctx: Design_statementContext) => AbstractNode;
    visitConfig_rule_statement?: (ctx: Config_rule_statementContext) => AbstractNode;
    visitDefault_clause?: (ctx: Default_clauseContext) => AbstractNode;
    visitInst_clause?: (ctx: Inst_clauseContext) => AbstractNode;
    visitInst_name?: (ctx: Inst_nameContext) => AbstractNode;
    visitCell_clause?: (ctx: Cell_clauseContext) => AbstractNode;
    visitLiblist_clause?: (ctx: Liblist_clauseContext) => AbstractNode;
    visitUse_clause?: (ctx: Use_clauseContext) => AbstractNode;
    visitInterface_or_generate_item?: (ctx: Interface_or_generate_itemContext) => AbstractNode;
    visitExtern_tf_declaration?: (ctx: Extern_tf_declarationContext) => AbstractNode;
    visitInterface_item?: (ctx: Interface_itemContext) => AbstractNode;
    visitNon_port_interface_item?: (ctx: Non_port_interface_itemContext) => AbstractNode;
    visitProgram_item?: (ctx: Program_itemContext) => AbstractNode;
    visitNon_port_program_item?: (ctx: Non_port_program_itemContext) => AbstractNode;
    visitProgram_generate_item?: (ctx: Program_generate_itemContext) => AbstractNode;
    visitChecker_port_list?: (ctx: Checker_port_listContext) => AbstractNode;
    visitChecker_port_item?: (ctx: Checker_port_itemContext) => AbstractNode;
    visitChecker_port_direction?: (ctx: Checker_port_directionContext) => AbstractNode;
    visitChecker_or_generate_item?: (ctx: Checker_or_generate_itemContext) => AbstractNode;
    visitChecker_or_generate_item_declaration?: (ctx: Checker_or_generate_item_declarationContext) => AbstractNode;
    visitChecker_generate_item?: (ctx: Checker_generate_itemContext) => AbstractNode;
    visitClass_item?: (ctx: Class_itemContext) => AbstractNode;
    visitClass_property?: (ctx: Class_propertyContext) => AbstractNode;
    visitClass_method?: (ctx: Class_methodContext) => AbstractNode;
    visitClass_constructor_prototype?: (ctx: Class_constructor_prototypeContext) => AbstractNode;
    visitClass_constraint?: (ctx: Class_constraintContext) => AbstractNode;
    visitClass_item_qualifier?: (ctx: Class_item_qualifierContext) => AbstractNode;
    visitProperty_qualifier?: (ctx: Property_qualifierContext) => AbstractNode;
    visitRandom_qualifier?: (ctx: Random_qualifierContext) => AbstractNode;
    visitMethod_qualifier?: (ctx: Method_qualifierContext) => AbstractNode;
    visitMethod_prototype?: (ctx: Method_prototypeContext) => AbstractNode;
    visitClass_constructor_declaration?: (ctx: Class_constructor_declarationContext) => AbstractNode;
    visitConstraint_declaration(ctx: Constraint_declarationContext) : ConstraintNode {
        return new ConstraintNode(ctx);
    }
    visitConstraint_block?: (ctx: Constraint_blockContext) => AbstractNode;
    visitConstraint_block_item?: (ctx: Constraint_block_itemContext) => AbstractNode;
    visitSolve_before_list?: (ctx: Solve_before_listContext) => AbstractNode;
    visitConstraint_primary?: (ctx: Constraint_primaryContext) => AbstractNode;
    visitConstraint_expression?: (ctx: Constraint_expressionContext) => AbstractNode;
    visitUniqueness_constraint?: (ctx: Uniqueness_constraintContext) => AbstractNode;
    visitConstraint_set?: (ctx: Constraint_setContext) => AbstractNode;
    visitDist_list?: (ctx: Dist_listContext) => AbstractNode;
    visitDist_item?: (ctx: Dist_itemContext) => AbstractNode;
    visitDist_weight?: (ctx: Dist_weightContext) => AbstractNode;
    visitConstraint_prototype?: (ctx: Constraint_prototypeContext) => AbstractNode;
    visitConstraint_prototype_qualifier?: (ctx: Constraint_prototype_qualifierContext) => AbstractNode;
    visitExtern_constraint_declaration?: (ctx: Extern_constraint_declarationContext) => AbstractNode;
    visitIdentifier_list?: (ctx: Identifier_listContext) => AbstractNode;
    visitPackage_item?: (ctx: Package_itemContext) => AbstractNode;
    visitPackage_or_generate_item_declaration?: (ctx: Package_or_generate_item_declarationContext) => AbstractNode;
    visitAnonymous_program?: (ctx: Anonymous_programContext) => AbstractNode;
    visitAnonymous_program_item?: (ctx: Anonymous_program_itemContext) => AbstractNode;
    visitLocal_parameter_declaration?: (ctx: Local_parameter_declarationContext) => AbstractNode;
    visitParameter_declaration?: (ctx: Parameter_declarationContext) => AbstractNode;
    visitSpecparam_declaration?: (ctx: Specparam_declarationContext) => AbstractNode;
    visitInout_declaration?: (ctx: Inout_declarationContext) => AbstractNode;
    visitInput_declaration?: (ctx: Input_declarationContext) => AbstractNode;
    visitOutput_declaration?: (ctx: Output_declarationContext) => AbstractNode;
    visitInterface_port_declaration?: (ctx: Interface_port_declarationContext) => AbstractNode;
    visitRef_declaration?: (ctx: Ref_declarationContext) => AbstractNode;
    visitData_declaration?: (ctx: Data_declarationContext) => AbstractNode;
    visitPackage_import_declaration?: (ctx: Package_import_declarationContext) => AbstractNode;
    visitPackage_import_item?: (ctx: Package_import_itemContext) => AbstractNode;
    visitPackage_export_declaration?: (ctx: Package_export_declarationContext) => AbstractNode;
    visitGenvar_declaration?: (ctx: Genvar_declarationContext) => AbstractNode;
    visitNet_declaration?: (ctx: Net_declarationContext) => AbstractNode;
    visitType_declaration?: (ctx: Type_declarationContext) => AbstractNode;
    visitNet_type_declaration?: (ctx: Net_type_declarationContext) => AbstractNode;
    visitLifetime?: (ctx: LifetimeContext) => AbstractNode;
    visitData_type?: (ctx: Data_typeContext) => AbstractNode;
    visitData_type_or_implicit?: (ctx: Data_type_or_implicitContext) => AbstractNode;
    visitImplicit_data_type?: (ctx: Implicit_data_typeContext) => AbstractNode;
    visitEnum_base_type?: (ctx: Enum_base_typeContext) => AbstractNode;
    visitEnum_name_declaration?: (ctx: Enum_name_declarationContext) => AbstractNode;
    visitClass_scope?: (ctx: Class_scopeContext) => AbstractNode;
    visitClass_type?: (ctx: Class_typeContext) => AbstractNode;
    visitInteger_type?: (ctx: Integer_typeContext) => AbstractNode;
    visitInteger_atom_type?: (ctx: Integer_atom_typeContext) => AbstractNode;
    visitInteger_vector_type?: (ctx: Integer_vector_typeContext) => AbstractNode;
    visitNon_integer_type?: (ctx: Non_integer_typeContext) => AbstractNode;
    visitNet_type?: (ctx: Net_typeContext) => AbstractNode;
    visitNet_port_type?: (ctx: Net_port_typeContext) => AbstractNode;
    visitVariable_port_type?: (ctx: Variable_port_typeContext) => AbstractNode;
    visitVar_data_type?: (ctx: Var_data_typeContext) => AbstractNode;
    visitSigning?: (ctx: SigningContext) => AbstractNode;
    visitSimple_type?: (ctx: Simple_typeContext) => AbstractNode;
    visitStruct_union_member?: (ctx: Struct_union_memberContext) => AbstractNode;
    visitData_type_or_void?: (ctx: Data_type_or_voidContext) => AbstractNode;
    visitStruct_union?: (ctx: Struct_unionContext) => AbstractNode;
    visitType_reference?: (ctx: Type_referenceContext) => AbstractNode;
    visitDrive_strength?: (ctx: Drive_strengthContext) => AbstractNode;
    visitStrength0?: (ctx: Strength0Context) => AbstractNode;
    visitStrength1?: (ctx: Strength1Context) => AbstractNode;
    visitCharge_strength?: (ctx: Charge_strengthContext) => AbstractNode;
    visitDelay3?: (ctx: Delay3Context) => AbstractNode;
    visitDelay2?: (ctx: Delay2Context) => AbstractNode;
    visitDelay_value?: (ctx: Delay_valueContext) => AbstractNode;
    visitList_of_defparam_assignments?: (ctx: List_of_defparam_assignmentsContext) => AbstractNode;
    visitList_of_genvar_identifiers?: (ctx: List_of_genvar_identifiersContext) => AbstractNode;
    visitList_of_interface_identifiers?: (ctx: List_of_interface_identifiersContext) => AbstractNode;
    visitList_of_net_decl_assignments?: (ctx: List_of_net_decl_assignmentsContext) => AbstractNode;
    visitList_of_param_assignments?: (ctx: List_of_param_assignmentsContext) => AbstractNode;
    visitList_of_port_identifiers?: (ctx: List_of_port_identifiersContext) => AbstractNode;
    visitList_of_udp_port_identifiers?: (ctx: List_of_udp_port_identifiersContext) => AbstractNode;
    visitList_of_specparam_assignments?: (ctx: List_of_specparam_assignmentsContext) => AbstractNode;
    visitList_of_tf_variable_identifiers?: (ctx: List_of_tf_variable_identifiersContext) => AbstractNode;
    visitList_of_type_assignments?: (ctx: List_of_type_assignmentsContext) => AbstractNode;
    visitList_of_variable_decl_assignments?: (ctx: List_of_variable_decl_assignmentsContext) => AbstractNode;
    visitList_of_variable_identifiers?: (ctx: List_of_variable_identifiersContext) => AbstractNode;
    visitList_of_variable_port_identifiers?: (ctx: List_of_variable_port_identifiersContext) => AbstractNode;
    visitDefparam_assignment?: (ctx: Defparam_assignmentContext) => AbstractNode;
    visitNet_decl_assignment(ctx: Net_decl_assignmentContext):AbstractNode {
        return new PortNode(ctx);
    }
    visitParam_assignment?: (ctx: Param_assignmentContext) => AbstractNode;
    visitSpecparam_assignment?: (ctx: Specparam_assignmentContext) => AbstractNode;
    visitType_assignment?: (ctx: Type_assignmentContext) => AbstractNode;
    visitPulse_control_specparam?: (ctx: Pulse_control_specparamContext) => AbstractNode;
    visitError_limit_value?: (ctx: Error_limit_valueContext) => AbstractNode;
    visitReject_limit_value?: (ctx: Reject_limit_valueContext) => AbstractNode;
    visitLimit_value?: (ctx: Limit_valueContext) => AbstractNode;
    visitVariable_decl_assignment(ctx: Variable_decl_assignmentContext): VariableNode {
        return new VariableNode(ctx);
    }
    // Variable Declaration
    visitClass_new?: (ctx: Class_newContext) => AbstractNode;
    visitDynamic_array_new?: (ctx: Dynamic_array_newContext) => AbstractNode;
    visitUnpacked_dimension?: (ctx: Unpacked_dimensionContext) => AbstractNode;
    visitPacked_dimension?: (ctx: Packed_dimensionContext) => AbstractNode;
    visitAssociative_dimension?: (ctx: Associative_dimensionContext) => AbstractNode;
    visitVariable_dimension?: (ctx: Variable_dimensionContext) => AbstractNode;
    visitQueue_dimension?: (ctx: Queue_dimensionContext) => AbstractNode;
    visitUnsized_dimension?: (ctx: Unsized_dimensionContext) => AbstractNode;
    visitFunction_data_type_or_implicit?: (ctx: Function_data_type_or_implicitContext) => AbstractNode;
    visitFunction_declaration(ctx: Function_declarationContext): AbstractNode {
        return new AbstractNode();
    }
    visitFunction_body_declaration(ctx: Function_body_declarationContext): AbstractNode {
        let tfitems: AbstractNode[] = new Array<AbstractNode>();
        ctx.tf_item_declaration().forEach((val) => {
            tfitems = tfitems.concat(this.traverseChildren(val));
        });
        return new FunctionNode(ctx, tfitems);
    }
    visitFunction_prototype?: (ctx: Function_prototypeContext) => AbstractNode;
    visitDpi_import_export?: (ctx: Dpi_import_exportContext) => AbstractNode;
    visitDpi_spec_string?: (ctx: Dpi_spec_stringContext) => AbstractNode;
    visitDpi_function_import_property?: (ctx: Dpi_function_import_propertyContext) => AbstractNode;
    visitDpi_task_import_property?: (ctx: Dpi_task_import_propertyContext) => AbstractNode;
    visitDpi_function_proto?: (ctx: Dpi_function_protoContext) => AbstractNode;
    visitDpi_task_proto?: (ctx: Dpi_task_protoContext) => AbstractNode;
    visitTask_declaration?: (ctx: Task_declarationContext) => AbstractNode;
    visitTask_body_declaration?: (ctx: Task_body_declarationContext) => AbstractNode;
    visitTf_item_declaration?: (ctx: Tf_item_declarationContext) => AbstractNode;
    visitTf_port_list?: (ctx: Tf_port_listContext) => AbstractNode;
    visitTf_port_item?: (ctx: Tf_port_itemContext) => AbstractNode;
    visitTf_port_direction?: (ctx: Tf_port_directionContext) => AbstractNode;
    visitTf_port_declaration?: (ctx: Tf_port_declarationContext) => AbstractNode;
    visitTask_prototype?: (ctx: Task_prototypeContext) => AbstractNode;
    visitBlock_item_declaration?: (ctx: Block_item_declarationContext) => AbstractNode;
    visitModport_declaration?: (ctx: Modport_declarationContext) => AbstractNode;
    visitModport_item?: (ctx: Modport_itemContext) => AbstractNode;
    visitModport_ports_declaration?: (ctx: Modport_ports_declarationContext) => AbstractNode;
    visitModport_clocking_declaration?: (ctx: Modport_clocking_declarationContext) => AbstractNode;
    visitModport_simple_ports_declaration?: (ctx: Modport_simple_ports_declarationContext) => AbstractNode;
    visitModport_simple_port?: (ctx: Modport_simple_portContext) => AbstractNode;
    visitModport_tf_ports_declaration?: (ctx: Modport_tf_ports_declarationContext) => AbstractNode;
    visitModport_tf_port?: (ctx: Modport_tf_portContext) => AbstractNode;
    visitImport_export?: (ctx: Import_exportContext) => AbstractNode;
    visitConcurrent_assertion_item?: (ctx: Concurrent_assertion_itemContext) => AbstractNode;
    visitConcurrent_assertion_statement?: (ctx: Concurrent_assertion_statementContext) => AbstractNode;
    visitAssert_property_statement?: (ctx: Assert_property_statementContext) => AbstractNode;
    visitAssume_property_statement?: (ctx: Assume_property_statementContext) => AbstractNode;
    visitCover_property_statement?: (ctx: Cover_property_statementContext) => AbstractNode;
    visitExpect_property_statement?: (ctx: Expect_property_statementContext) => AbstractNode;
    visitCover_sequence_statement?: (ctx: Cover_sequence_statementContext) => AbstractNode;
    visitRestrict_property_statement?: (ctx: Restrict_property_statementContext) => AbstractNode;
    visitProperty_instance?: (ctx: Property_instanceContext) => AbstractNode;
    visitProperty_list_of_arguments?: (ctx: Property_list_of_argumentsContext) => AbstractNode;
    visitProperty_actual_arg?: (ctx: Property_actual_argContext) => AbstractNode;
    visitAssertion_item_declaration?: (ctx: Assertion_item_declarationContext) => AbstractNode;
    visitProperty_declaration?: (ctx: Property_declarationContext) => AbstractNode;
    visitProperty_port_list?: (ctx: Property_port_listContext) => AbstractNode;
    visitProperty_port_item?: (ctx: Property_port_itemContext) => AbstractNode;
    visitProperty_lvar_port_direction?: (ctx: Property_lvar_port_directionContext) => AbstractNode;
    visitProperty_formal_type?: (ctx: Property_formal_typeContext) => AbstractNode;
    visitProperty_spec?: (ctx: Property_specContext) => AbstractNode;
    visitProperty_expr?: (ctx: Property_exprContext) => AbstractNode;
    visitProperty_case_item?: (ctx: Property_case_itemContext) => AbstractNode;
    visitSequence_declaration?: (ctx: Sequence_declarationContext) => AbstractNode;
    visitSequence_port_list?: (ctx: Sequence_port_listContext) => AbstractNode;
    visitSequence_port_item?: (ctx: Sequence_port_itemContext) => AbstractNode;
    visitSequence_lvar_port_direction?: (ctx: Sequence_lvar_port_directionContext) => AbstractNode;
    visitSequence_formal_type?: (ctx: Sequence_formal_typeContext) => AbstractNode;
    visitSequence_expr?: (ctx: Sequence_exprContext) => AbstractNode;
    visitCycle_delay_range?: (ctx: Cycle_delay_rangeContext) => AbstractNode;
    visitSequence_method_call?: (ctx: Sequence_method_callContext) => AbstractNode;
    visitSequence_match_item?: (ctx: Sequence_match_itemContext) => AbstractNode;
    visitSequence_instance?: (ctx: Sequence_instanceContext) => AbstractNode;
    visitSequence_list_of_arguments?: (ctx: Sequence_list_of_argumentsContext) => AbstractNode;
    visitSequence_actual_arg?: (ctx: Sequence_actual_argContext) => AbstractNode;
    visitBoolean_abbrev?: (ctx: Boolean_abbrevContext) => AbstractNode;
    visitSequence_abbrev?: (ctx: Sequence_abbrevContext) => AbstractNode;
    visitConsecutive_repetition?: (ctx: Consecutive_repetitionContext) => AbstractNode;
    visitNon_consecutive_repetition?: (ctx: Non_consecutive_repetitionContext) => AbstractNode;
    visitGoto_repetition?: (ctx: Goto_repetitionContext) => AbstractNode;
    visitConst_or_range_expression?: (ctx: Const_or_range_expressionContext) => AbstractNode;
    visitCycle_delay_const_range_expression?: (ctx: Cycle_delay_const_range_expressionContext) => AbstractNode;
    visitExpression_or_dist?: (ctx: Expression_or_distContext) => AbstractNode;
    visitAssertion_variable_declaration?: (ctx: Assertion_variable_declarationContext) => AbstractNode;
    visitCovergroup_declaration?: (ctx: Covergroup_declarationContext) => AbstractNode;
    visitCoverage_spec_or_option?: (ctx: Coverage_spec_or_optionContext) => AbstractNode;
    visitCoverage_option?: (ctx: Coverage_optionContext) => AbstractNode;
    visitCoverage_spec?: (ctx: Coverage_specContext) => AbstractNode;
    visitCoverage_event?: (ctx: Coverage_eventContext) => AbstractNode;
    visitBlock_event_expression?: (ctx: Block_event_expressionContext) => AbstractNode;
    visitHierarchical_btf_identifier?: (ctx: Hierarchical_btf_identifierContext) => AbstractNode;
    visitCover_point?: (ctx: Cover_pointContext) => AbstractNode;
    visitBins_or_empty?: (ctx: Bins_or_emptyContext) => AbstractNode;
    visitBins_or_options?: (ctx: Bins_or_optionsContext) => AbstractNode;
    visitBins_keyword?: (ctx: Bins_keywordContext) => AbstractNode;
    visitTrans_list?: (ctx: Trans_listContext) => AbstractNode;
    visitTrans_set?: (ctx: Trans_setContext) => AbstractNode;
    visitTrans_range_list?: (ctx: Trans_range_listContext) => AbstractNode;
    visitTrans_item?: (ctx: Trans_itemContext) => AbstractNode;
    visitRepeat_range?: (ctx: Repeat_rangeContext) => AbstractNode;
    visitCover_cross?: (ctx: Cover_crossContext) => AbstractNode;
    visitList_of_cross_items?: (ctx: List_of_cross_itemsContext) => AbstractNode;
    visitCross_item?: (ctx: Cross_itemContext) => AbstractNode;
    visitCross_body?: (ctx: Cross_bodyContext) => AbstractNode;
    visitCross_body_item?: (ctx: Cross_body_itemContext) => AbstractNode;
    visitBins_selection_or_option?: (ctx: Bins_selection_or_optionContext) => AbstractNode;
    visitBins_selection?: (ctx: Bins_selectionContext) => AbstractNode;
    visitSelect_expression?: (ctx: Select_expressionContext) => AbstractNode;
    visitSelect_condition?: (ctx: Select_conditionContext) => AbstractNode;
    visitBins_expression?: (ctx: Bins_expressionContext) => AbstractNode;
    visitCovergroup_range_list?: (ctx: Covergroup_range_listContext) => AbstractNode;
    visitCovergroup_value_range?: (ctx: Covergroup_value_rangeContext) => AbstractNode;
    visitWith_covergroup_expression?: (ctx: With_covergroup_expressionContext) => AbstractNode;
    visitSet_covergroup_expression?: (ctx: Set_covergroup_expressionContext) => AbstractNode;
    visitInteger_covergroup_expression?: (ctx: Integer_covergroup_expressionContext) => AbstractNode;
    visitCross_set_expression?: (ctx: Cross_set_expressionContext) => AbstractNode;
    visitCovergroup_expression?: (ctx: Covergroup_expressionContext) => AbstractNode;
    visitLet_declaration?: (ctx: Let_declarationContext) => AbstractNode;
    visitLet_identifier?: (ctx: Let_identifierContext) => AbstractNode;
    visitLet_port_list?: (ctx: Let_port_listContext) => AbstractNode;
    visitLet_port_item?: (ctx: Let_port_itemContext) => AbstractNode;
    visitLet_formal_type?: (ctx: Let_formal_typeContext) => AbstractNode;
    visitLet_expression?: (ctx: Let_expressionContext) => AbstractNode;
    visitLet_list_of_arguments?: (ctx: Let_list_of_argumentsContext) => AbstractNode;
    visitLet_actual_arg?: (ctx: Let_actual_argContext) => AbstractNode;
    visitGate_instantiation?: (ctx: Gate_instantiationContext) => AbstractNode;
    visitCmos_switch_instance?: (ctx: Cmos_switch_instanceContext) => AbstractNode;
    visitEnable_gate_instance?: (ctx: Enable_gate_instanceContext) => AbstractNode;
    visitMos_switch_instance?: (ctx: Mos_switch_instanceContext) => AbstractNode;
    visitN_input_gate_instance?: (ctx: N_input_gate_instanceContext) => AbstractNode;
    visitN_output_gate_instance?: (ctx: N_output_gate_instanceContext) => AbstractNode;
    visitPass_switch_instance?: (ctx: Pass_switch_instanceContext) => AbstractNode;
    visitPass_enable_switch_instance?: (ctx: Pass_enable_switch_instanceContext) => AbstractNode;
    visitPull_gate_instance?: (ctx: Pull_gate_instanceContext) => AbstractNode;
    visitPulldown_strength?: (ctx: Pulldown_strengthContext) => AbstractNode;
    visitPullup_strength?: (ctx: Pullup_strengthContext) => AbstractNode;
    visitEnable_terminal?: (ctx: Enable_terminalContext) => AbstractNode;
    visitInout_terminal?: (ctx: Inout_terminalContext) => AbstractNode;
    visitInput_terminal?: (ctx: Input_terminalContext) => AbstractNode;
    visitNcontrol_terminal?: (ctx: Ncontrol_terminalContext) => AbstractNode;
    visitOutput_terminal?: (ctx: Output_terminalContext) => AbstractNode;
    visitPcontrol_terminal?: (ctx: Pcontrol_terminalContext) => AbstractNode;
    visitCmos_switchtype?: (ctx: Cmos_switchtypeContext) => AbstractNode;
    visitEnable_gatetype?: (ctx: Enable_gatetypeContext) => AbstractNode;
    visitMos_switchtype?: (ctx: Mos_switchtypeContext) => AbstractNode;
    visitN_input_gatetype?: (ctx: N_input_gatetypeContext) => AbstractNode;
    visitN_output_gatetype?: (ctx: N_output_gatetypeContext) => AbstractNode;
    visitPass_en_switchtype?: (ctx: Pass_en_switchtypeContext) => AbstractNode;
    visitPass_switchtype?: (ctx: Pass_switchtypeContext) => AbstractNode;
    visitModule_instantiation?: (ctx: Module_instantiationContext) => AbstractNode;
    visitParameter_value_assignment?: (ctx: Parameter_value_assignmentContext) => AbstractNode;
    visitList_of_parameter_assignments?: (ctx: List_of_parameter_assignmentsContext) => AbstractNode;
    visitOrdered_parameter_assignment?: (ctx: Ordered_parameter_assignmentContext) => AbstractNode;
    visitNamed_parameter_assignment?: (ctx: Named_parameter_assignmentContext) => AbstractNode;
    visitHierarchical_instance?: (ctx: Hierarchical_instanceContext) => AbstractNode;
    visitName_of_instance?: (ctx: Name_of_instanceContext) => AbstractNode;
    visitList_of_port_connections?: (ctx: List_of_port_connectionsContext) => AbstractNode;
    visitOrdered_port_connection?: (ctx: Ordered_port_connectionContext) => AbstractNode;
    visitNamed_port_connection?: (ctx: Named_port_connectionContext) => AbstractNode;
    visitInterface_instantiation?: (ctx: Interface_instantiationContext) => AbstractNode;
    visitProgram_instantiation?: (ctx: Program_instantiationContext) => AbstractNode;
    visitChecker_instantiation?: (ctx: Checker_instantiationContext) => AbstractNode;
    visitList_of_checker_port_connections?: (ctx: List_of_checker_port_connectionsContext) => AbstractNode;
    visitOrdered_checker_port_connection?: (ctx: Ordered_checker_port_connectionContext) => AbstractNode;
    visitNamed_checker_port_connection?: (ctx: Named_checker_port_connectionContext) => AbstractNode;
    visitGenerate_region?: (ctx: Generate_regionContext) => AbstractNode;
    visitLoop_generate_construct?: (ctx: Loop_generate_constructContext) => AbstractNode;
    visitGenvar_initialization?: (ctx: Genvar_initializationContext) => AbstractNode;
    visitGenvar_iteration?: (ctx: Genvar_iterationContext) => AbstractNode;
    visitConditional_generate_construct?: (ctx: Conditional_generate_constructContext) => AbstractNode;
    visitIf_generate_construct?: (ctx: If_generate_constructContext) => AbstractNode;
    visitCase_generate_construct?: (ctx: Case_generate_constructContext) => AbstractNode;
    visitCase_generate_item?: (ctx: Case_generate_itemContext) => AbstractNode;
    visitGenerate_block?: (ctx: Generate_blockContext) => AbstractNode;
    visitGenerate_item?: (ctx: Generate_itemContext) => AbstractNode;
    visitUdp_nonansi_declaration?: (ctx: Udp_nonansi_declarationContext) => AbstractNode;
    visitUdp_ansi_declaration?: (ctx: Udp_ansi_declarationContext) => AbstractNode;
    visitUdp_declaration?: (ctx: Udp_declarationContext) => AbstractNode;
    visitUdp_port_list?: (ctx: Udp_port_listContext) => AbstractNode;
    visitUdp_declaration_port_list?: (ctx: Udp_declaration_port_listContext) => AbstractNode;
    visitUdp_port_declaration?: (ctx: Udp_port_declarationContext) => AbstractNode;
    visitUdp_output_declaration?: (ctx: Udp_output_declarationContext) => AbstractNode;
    visitUdp_input_declaration?: (ctx: Udp_input_declarationContext) => AbstractNode;
    visitUdp_reg_declaration?: (ctx: Udp_reg_declarationContext) => AbstractNode;
    visitUdp_body?: (ctx: Udp_bodyContext) => AbstractNode;
    visitCombinational_body?: (ctx: Combinational_bodyContext) => AbstractNode;
    visitCombinational_entry?: (ctx: Combinational_entryContext) => AbstractNode;
    visitSequential_body?: (ctx: Sequential_bodyContext) => AbstractNode;
    visitUdp_initial_statement?: (ctx: Udp_initial_statementContext) => AbstractNode;
    visitInit_val?: (ctx: Init_valContext) => AbstractNode;
    visitSequential_entry?: (ctx: Sequential_entryContext) => AbstractNode;
    visitSeq_input_list?: (ctx: Seq_input_listContext) => AbstractNode;
    visitLevel_input_list?: (ctx: Level_input_listContext) => AbstractNode;
    visitEdge_input_list?: (ctx: Edge_input_listContext) => AbstractNode;
    visitEdge_indicator?: (ctx: Edge_indicatorContext) => AbstractNode;
    visitCurrent_state?: (ctx: Current_stateContext) => AbstractNode;
    visitNext_state?: (ctx: Next_stateContext) => AbstractNode;
    visitOutput_symbol?: (ctx: Output_symbolContext) => AbstractNode;
    visitLevel_symbol?: (ctx: Level_symbolContext) => AbstractNode;
    visitEdge_symbol?: (ctx: Edge_symbolContext) => AbstractNode;
    visitUdp_instantiation?: (ctx: Udp_instantiationContext) => AbstractNode;
    visitUdp_instance?: (ctx: Udp_instanceContext) => AbstractNode;
    visitContinuous_assign?: (ctx: Continuous_assignContext) => AbstractNode;
    visitList_of_net_assignments?: (ctx: List_of_net_assignmentsContext) => AbstractNode;
    visitList_of_variable_assignments?: (ctx: List_of_variable_assignmentsContext) => AbstractNode;
    visitNet_alias?: (ctx: Net_aliasContext) => AbstractNode;
    visitNet_assignment?: (ctx: Net_assignmentContext) => AbstractNode;
    visitInitial_construct?: (ctx: Initial_constructContext) => AbstractNode;
    visitAlways_construct?: (ctx: Always_constructContext) => AbstractNode;
    visitAlways_keyword?: (ctx: Always_keywordContext) => AbstractNode;
    visitFinal_construct?: (ctx: Final_constructContext) => AbstractNode;
    visitBlocking_assignment?: (ctx: Blocking_assignmentContext) => AbstractNode;
    visitOperator_assignment?: (ctx: Operator_assignmentContext) => AbstractNode;
    visitAssignment_operator?: (ctx: Assignment_operatorContext) => AbstractNode;
    visitNonblocking_assignment?: (ctx: Nonblocking_assignmentContext) => AbstractNode;
    visitProcedural_continuous_assignment?: (ctx: Procedural_continuous_assignmentContext) => AbstractNode;
    visitVariable_assignment?: (ctx: Variable_assignmentContext) => AbstractNode;
    visitAction_block?: (ctx: Action_blockContext) => AbstractNode;
    visitSeq_block?: (ctx: Seq_blockContext) => AbstractNode;
    visitPar_block?: (ctx: Par_blockContext) => AbstractNode;
    visitJoin_keyword?: (ctx: Join_keywordContext) => AbstractNode;
    visitStatement_or_null?: (ctx: Statement_or_nullContext) => AbstractNode;
    visitStatement?: (ctx: StatementContext) => AbstractNode;
    visitStatement_item?: (ctx: Statement_itemContext) => AbstractNode;
    visitFunction_statement?: (ctx: Function_statementContext) => AbstractNode;
    visitFunction_statement_or_null?: (ctx: Function_statement_or_nullContext) => AbstractNode;
    visitVariable_identifier_list?: (ctx: Variable_identifier_listContext) => AbstractNode;
    visitProcedural_timing_control_statement?: (ctx: Procedural_timing_control_statementContext) => AbstractNode;
    visitDelay_or_event_control?: (ctx: Delay_or_event_controlContext) => AbstractNode;
    visitDelay_control?: (ctx: Delay_controlContext) => AbstractNode;
    visitEvent_control?: (ctx: Event_controlContext) => AbstractNode;
    visitEvent_expression?: (ctx: Event_expressionContext) => AbstractNode;
    visitProcedural_timing_control?: (ctx: Procedural_timing_controlContext) => AbstractNode;
    visitJump_statement?: (ctx: Jump_statementContext) => AbstractNode;
    visitWait_statement?: (ctx: Wait_statementContext) => AbstractNode;
    visitEvent_trigger?: (ctx: Event_triggerContext) => AbstractNode;
    visitDisable_statement?: (ctx: Disable_statementContext) => AbstractNode;
    visitConditional_statement?: (ctx: Conditional_statementContext) => AbstractNode;
    visitUnique_priority?: (ctx: Unique_priorityContext) => AbstractNode;
    visitCond_predicate?: (ctx: Cond_predicateContext) => AbstractNode;
    visitCase_statement?: (ctx: Case_statementContext) => AbstractNode;
    visitCase_keyword?: (ctx: Case_keywordContext) => AbstractNode;
    visitCase_expression?: (ctx: Case_expressionContext) => AbstractNode;
    visitCase_item?: (ctx: Case_itemContext) => AbstractNode;
    visitCase_pattern_item?: (ctx: Case_pattern_itemContext) => AbstractNode;
    visitCase_inside_item?: (ctx: Case_inside_itemContext) => AbstractNode;
    visitCase_item_expression?: (ctx: Case_item_expressionContext) => AbstractNode;
    visitRandcase_statement?: (ctx: Randcase_statementContext) => AbstractNode;
    visitRandcase_item?: (ctx: Randcase_itemContext) => AbstractNode;
    visitOpen_range_list?: (ctx: Open_range_listContext) => AbstractNode;
    visitOpen_value_range?: (ctx: Open_value_rangeContext) => AbstractNode;
    visitPattern?: (ctx: PatternContext) => AbstractNode;
    visitAssignment_pattern?: (ctx: Assignment_patternContext) => AbstractNode;
    visitStructure_pattern_key?: (ctx: Structure_pattern_keyContext) => AbstractNode;
    visitArray_pattern_key?: (ctx: Array_pattern_keyContext) => AbstractNode;
    visitAssignment_pattern_key?: (ctx: Assignment_pattern_keyContext) => AbstractNode;
    visitAssignment_pattern_expression?: (ctx: Assignment_pattern_expressionContext) => AbstractNode;
    visitAssignment_pattern_expression_type?: (ctx: Assignment_pattern_expression_typeContext) => AbstractNode;
    visitConstant_assignment_pattern_expression?: (ctx: Constant_assignment_pattern_expressionContext) => AbstractNode;
    visitAssignment_pattern_net_lvalue?: (ctx: Assignment_pattern_net_lvalueContext) => AbstractNode;
    visitAssignment_pattern_variable_lvalue?: (ctx: Assignment_pattern_variable_lvalueContext) => AbstractNode;
    visitLoop_statement?: (ctx: Loop_statementContext) => AbstractNode;
    visitFor_initialization?: (ctx: For_initializationContext) => AbstractNode;
    visitFor_variable_declaration?: (ctx: For_variable_declarationContext) => AbstractNode;
    visitFor_step?: (ctx: For_stepContext) => AbstractNode;
    visitFor_step_assignment?: (ctx: For_step_assignmentContext) => AbstractNode;
    visitLoop_variables?: (ctx: Loop_variablesContext) => AbstractNode;
    visitSubroutine_call_statement?: (ctx: Subroutine_call_statementContext) => AbstractNode;
    visitAssertion_item?: (ctx: Assertion_itemContext) => AbstractNode;
    visitDeferred_immediate_assertion_item?: (ctx: Deferred_immediate_assertion_itemContext) => AbstractNode;
    visitProcedural_assertion_statement?: (ctx: Procedural_assertion_statementContext) => AbstractNode;
    visitImmediate_assertion_statement?: (ctx: Immediate_assertion_statementContext) => AbstractNode;
    visitSimple_immediate_assertion_statement?: (ctx: Simple_immediate_assertion_statementContext) => AbstractNode;
    visitSimple_immediate_assert_statement?: (ctx: Simple_immediate_assert_statementContext) => AbstractNode;
    visitSimple_immediate_assume_statement?: (ctx: Simple_immediate_assume_statementContext) => AbstractNode;
    visitSimple_immediate_cover_statement?: (ctx: Simple_immediate_cover_statementContext) => AbstractNode;
    visitDeferred_immediate_assertion_statement?: (ctx: Deferred_immediate_assertion_statementContext) => AbstractNode;
    visitDeferred_immediate_assert_statement?: (ctx: Deferred_immediate_assert_statementContext) => AbstractNode;
    visitDeferred_immediate_assume_statement?: (ctx: Deferred_immediate_assume_statementContext) => AbstractNode;
    visitDeferred_immediate_cover_statement?: (ctx: Deferred_immediate_cover_statementContext) => AbstractNode;
    visitClocking_declaration?: (ctx: Clocking_declarationContext) => AbstractNode;
    visitClocking_event?: (ctx: Clocking_eventContext) => AbstractNode;
    visitClocking_item?: (ctx: Clocking_itemContext) => AbstractNode;
    visitDefault_skew?: (ctx: Default_skewContext) => AbstractNode;
    visitClocking_direction?: (ctx: Clocking_directionContext) => AbstractNode;
    visitList_of_clocking_decl_assign?: (ctx: List_of_clocking_decl_assignContext) => AbstractNode;
    visitClocking_decl_assign?: (ctx: Clocking_decl_assignContext) => AbstractNode;
    visitClocking_skew?: (ctx: Clocking_skewContext) => AbstractNode;
    visitClocking_drive?: (ctx: Clocking_driveContext) => AbstractNode;
    visitCycle_delay?: (ctx: Cycle_delayContext) => AbstractNode;
    visitClockvar?: (ctx: ClockvarContext) => AbstractNode;
    visitClockvar_expression?: (ctx: Clockvar_expressionContext) => AbstractNode;
    visitRandsequence_statement?: (ctx: Randsequence_statementContext) => AbstractNode;
    visitProduction?: (ctx: ProductionContext) => AbstractNode;
    visitRs_rule?: (ctx: Rs_ruleContext) => AbstractNode;
    visitRs_production_list?: (ctx: Rs_production_listContext) => AbstractNode;
    visitWeight_specification?: (ctx: Weight_specificationContext) => AbstractNode;
    visitRs_code_block?: (ctx: Rs_code_blockContext) => AbstractNode;
    visitRs_prod?: (ctx: Rs_prodContext) => AbstractNode;
    visitProduction_item?: (ctx: Production_itemContext) => AbstractNode;
    visitRs_if_else?: (ctx: Rs_if_elseContext) => AbstractNode;
    visitRs_repeat?: (ctx: Rs_repeatContext) => AbstractNode;
    visitRs_case?: (ctx: Rs_caseContext) => AbstractNode;
    visitRs_case_item?: (ctx: Rs_case_itemContext) => AbstractNode;
    visitSpecify_block?: (ctx: Specify_blockContext) => AbstractNode;
    visitSpecify_item?: (ctx: Specify_itemContext) => AbstractNode;
    visitPulsestyle_declaration?: (ctx: Pulsestyle_declarationContext) => AbstractNode;
    visitShowcancelled_declaration?: (ctx: Showcancelled_declarationContext) => AbstractNode;
    visitPath_declaration?: (ctx: Path_declarationContext) => AbstractNode;
    visitSimple_path_declaration?: (ctx: Simple_path_declarationContext) => AbstractNode;
    visitParallel_path_description?: (ctx: Parallel_path_descriptionContext) => AbstractNode;
    visitFull_path_description?: (ctx: Full_path_descriptionContext) => AbstractNode;
    visitList_of_path_inputs?: (ctx: List_of_path_inputsContext) => AbstractNode;
    visitList_of_path_outputs?: (ctx: List_of_path_outputsContext) => AbstractNode;
    visitSpecify_input_terminal_descriptor?: (ctx: Specify_input_terminal_descriptorContext) => AbstractNode;
    visitSpecify_output_terminal_descriptor?: (ctx: Specify_output_terminal_descriptorContext) => AbstractNode;
    visitInput_identifier?: (ctx: Input_identifierContext) => AbstractNode;
    visitOutput_identifier?: (ctx: Output_identifierContext) => AbstractNode;
    visitPath_delay_value?: (ctx: Path_delay_valueContext) => AbstractNode;
    visitList_of_path_delay_expressions?: (ctx: List_of_path_delay_expressionsContext) => AbstractNode;
    visitT_path_delay_expression?: (ctx: T_path_delay_expressionContext) => AbstractNode;
    visitTrise_path_delay_expression?: (ctx: Trise_path_delay_expressionContext) => AbstractNode;
    visitTfall_path_delay_expression?: (ctx: Tfall_path_delay_expressionContext) => AbstractNode;
    visitTz_path_delay_expression?: (ctx: Tz_path_delay_expressionContext) => AbstractNode;
    visitT01_path_delay_expression?: (ctx: T01_path_delay_expressionContext) => AbstractNode;
    visitT10_path_delay_expression?: (ctx: T10_path_delay_expressionContext) => AbstractNode;
    visitT0z_path_delay_expression?: (ctx: T0z_path_delay_expressionContext) => AbstractNode;
    visitTz1_path_delay_expression?: (ctx: Tz1_path_delay_expressionContext) => AbstractNode;
    visitT1z_path_delay_expression?: (ctx: T1z_path_delay_expressionContext) => AbstractNode;
    visitTz0_path_delay_expression?: (ctx: Tz0_path_delay_expressionContext) => AbstractNode;
    visitT0x_path_delay_expression?: (ctx: T0x_path_delay_expressionContext) => AbstractNode;
    visitTx1_path_delay_expression?: (ctx: Tx1_path_delay_expressionContext) => AbstractNode;
    visitT1x_path_delay_expression?: (ctx: T1x_path_delay_expressionContext) => AbstractNode;
    visitTx0_path_delay_expression?: (ctx: Tx0_path_delay_expressionContext) => AbstractNode;
    visitTxz_path_delay_expression?: (ctx: Txz_path_delay_expressionContext) => AbstractNode;
    visitTzx_path_delay_expression?: (ctx: Tzx_path_delay_expressionContext) => AbstractNode;
    visitPath_delay_expression?: (ctx: Path_delay_expressionContext) => AbstractNode;
    visitEdge_sensitive_path_declaration?: (ctx: Edge_sensitive_path_declarationContext) => AbstractNode;
    visitParallel_edge_sensitive_path_description?: (ctx: Parallel_edge_sensitive_path_descriptionContext) => AbstractNode;
    visitFull_edge_sensitive_path_description?: (ctx: Full_edge_sensitive_path_descriptionContext) => AbstractNode;
    visitData_source_expression?: (ctx: Data_source_expressionContext) => AbstractNode;
    visitEdge_identifier?: (ctx: Edge_identifierContext) => AbstractNode;
    visitState_dependent_path_declaration?: (ctx: State_dependent_path_declarationContext) => AbstractNode;
    visitPolarity_operator?: (ctx: Polarity_operatorContext) => AbstractNode;
    visitSystem_timing_check?: (ctx: System_timing_checkContext) => AbstractNode;
    visitSetup_timing_check?: (ctx: Setup_timing_checkContext) => AbstractNode;
    visitHold_timing_check?: (ctx: Hold_timing_checkContext) => AbstractNode;
    visitSetuphold_timing_check?: (ctx: Setuphold_timing_checkContext) => AbstractNode;
    visitRecovery_timing_check?: (ctx: Recovery_timing_checkContext) => AbstractNode;
    visitRemoval_timing_check?: (ctx: Removal_timing_checkContext) => AbstractNode;
    visitRecrem_timing_check?: (ctx: Recrem_timing_checkContext) => AbstractNode;
    visitSkew_timing_check?: (ctx: Skew_timing_checkContext) => AbstractNode;
    visitTimeskew_timing_check?: (ctx: Timeskew_timing_checkContext) => AbstractNode;
    visitFullskew_timing_check?: (ctx: Fullskew_timing_checkContext) => AbstractNode;
    visitPeriod_timing_check?: (ctx: Period_timing_checkContext) => AbstractNode;
    visitWidth_timing_check?: (ctx: Width_timing_checkContext) => AbstractNode;
    visitNochange_timing_check?: (ctx: Nochange_timing_checkContext) => AbstractNode;
    visitTimecheck_condition?: (ctx: Timecheck_conditionContext) => AbstractNode;
    visitControlled_reference_event?: (ctx: Controlled_reference_eventContext) => AbstractNode;
    visitData_event?: (ctx: Data_eventContext) => AbstractNode;
    visitDelayed_data?: (ctx: Delayed_dataContext) => AbstractNode;
    visitDelayed_reference?: (ctx: Delayed_referenceContext) => AbstractNode;
    visitEnd_edge_offset?: (ctx: End_edge_offsetContext) => AbstractNode;
    visitEvent_based_flag?: (ctx: Event_based_flagContext) => AbstractNode;
    visitNotifier?: (ctx: NotifierContext) => AbstractNode;
    visitReference_event?: (ctx: Reference_eventContext) => AbstractNode;
    visitRemain_active_flag?: (ctx: Remain_active_flagContext) => AbstractNode;
    visitTimestamp_condition?: (ctx: Timestamp_conditionContext) => AbstractNode;
    visitStart_edge_offset?: (ctx: Start_edge_offsetContext) => AbstractNode;
    visitThreshold?: (ctx: ThresholdContext) => AbstractNode;
    visitTiming_check_limit?: (ctx: Timing_check_limitContext) => AbstractNode;
    visitTiming_check_event?: (ctx: Timing_check_eventContext) => AbstractNode;
    visitControlled_timing_check_event?: (ctx: Controlled_timing_check_eventContext) => AbstractNode;
    visitTiming_check_event_control?: (ctx: Timing_check_event_controlContext) => AbstractNode;
    visitSpecify_terminal_descriptor?: (ctx: Specify_terminal_descriptorContext) => AbstractNode;
    visitEdge_control_specifier?: (ctx: Edge_control_specifierContext) => AbstractNode;
    visitEdge_descriptor?: (ctx: Edge_descriptorContext) => AbstractNode;
    visitZero_or_one?: (ctx: Zero_or_oneContext) => AbstractNode;
    visitZ_or_x?: (ctx: Z_or_xContext) => AbstractNode;
    visitTiming_check_condition?: (ctx: Timing_check_conditionContext) => AbstractNode;
    visitScalar_timing_check_condition?: (ctx: Scalar_timing_check_conditionContext) => AbstractNode;
    visitScalar_constant?: (ctx: Scalar_constantContext) => AbstractNode;
    visitConcatenation?: (ctx: ConcatenationContext) => AbstractNode;
    visitConstant_concatenation?: (ctx: Constant_concatenationContext) => AbstractNode;
    visitConstant_multiple_concatenation?: (ctx: Constant_multiple_concatenationContext) => AbstractNode;
    visitModule_path_concatenation?: (ctx: Module_path_concatenationContext) => AbstractNode;
    visitModule_path_multiple_concatenation?: (ctx: Module_path_multiple_concatenationContext) => AbstractNode;
    visitMultiple_concatenation?: (ctx: Multiple_concatenationContext) => AbstractNode;
    visitStreaming_concatenation?: (ctx: Streaming_concatenationContext) => AbstractNode;
    visitStream_operator?: (ctx: Stream_operatorContext) => AbstractNode;
    visitSlice_size?: (ctx: Slice_sizeContext) => AbstractNode;
    visitStream_concatenation?: (ctx: Stream_concatenationContext) => AbstractNode;
    visitStream_expression?: (ctx: Stream_expressionContext) => AbstractNode;
    visitArray_range_expression?: (ctx: Array_range_expressionContext) => AbstractNode;
    visitEmpty_unpacked_array_concatenation?: (ctx: Empty_unpacked_array_concatenationContext) => AbstractNode;
    visitTf_call?: (ctx: Tf_callContext) => AbstractNode;
    visitSystem_tf_call?: (ctx: System_tf_callContext) => AbstractNode;
    visitSubroutine_call?: (ctx: Subroutine_callContext) => AbstractNode;
    visitFunction_subroutine_call?: (ctx: Function_subroutine_callContext) => AbstractNode;
    visitList_of_arguments?: (ctx: List_of_argumentsContext) => AbstractNode;
    visitMethod_call_body?: (ctx: Method_call_bodyContext) => AbstractNode;
    visitBuilt_in_method_call?: (ctx: Built_in_method_callContext) => AbstractNode;
    visitArray_manipulation_call?: (ctx: Array_manipulation_callContext) => AbstractNode;
    visitRandomize_call?: (ctx: Randomize_callContext) => AbstractNode;
    visitArray_method_name?: (ctx: Array_method_nameContext) => AbstractNode;
    visitInc_or_dec_expression?: (ctx: Inc_or_dec_expressionContext) => AbstractNode;
    visitConstant_expression?: (ctx: Constant_expressionContext) => AbstractNode;
    visitConstant_mintypmax_expression?: (ctx: Constant_mintypmax_expressionContext) => AbstractNode;
    visitConstant_param_expression?: (ctx: Constant_param_expressionContext) => AbstractNode;
    visitParam_expression?: (ctx: Param_expressionContext) => AbstractNode;
    visitConstant_range_expression?: (ctx: Constant_range_expressionContext) => AbstractNode;
    visitConstant_part_select_range?: (ctx: Constant_part_select_rangeContext) => AbstractNode;
    visitConstant_range?: (ctx: Constant_rangeContext) => AbstractNode;
    visitConstant_indexed_range?: (ctx: Constant_indexed_rangeContext) => AbstractNode;
    visitExpression?: (ctx: ExpressionContext) => AbstractNode;
    visitTagged_union_expression?: (ctx: Tagged_union_expressionContext) => AbstractNode;
    visitValue_range?: (ctx: Value_rangeContext) => AbstractNode;
    visitMintypmax_expression?: (ctx: Mintypmax_expressionContext) => AbstractNode;
    visitModule_path_conditional_expression?: (ctx: Module_path_conditional_expressionContext) => AbstractNode;
    visitModule_path_expression?: (ctx: Module_path_expressionContext) => AbstractNode;
    visitModule_path_mintypmax_expression?: (ctx: Module_path_mintypmax_expressionContext) => AbstractNode;
    visitPart_select_range?: (ctx: Part_select_rangeContext) => AbstractNode;
    visitIndexed_range?: (ctx: Indexed_rangeContext) => AbstractNode;
    visitGenvar_expression?: (ctx: Genvar_expressionContext) => AbstractNode;
    visitConstant_primary?: (ctx: Constant_primaryContext) => AbstractNode;
    visitPrimary?: (ctx: PrimaryContext) => AbstractNode;
    visitModule_path_primary?: (ctx: Module_path_primaryContext) => AbstractNode;
    visitClass_qualifier?: (ctx: Class_qualifierContext) => AbstractNode;
    visitRange_expression?: (ctx: Range_expressionContext) => AbstractNode;
    visitPrimary_literal?: (ctx: Primary_literalContext) => AbstractNode;
    visitTime_literal?: (ctx: Time_literalContext) => AbstractNode;
    visitTime_unit?: (ctx: Time_unitContext) => AbstractNode;
    visitImplicit_class_handle?: (ctx: Implicit_class_handleContext) => AbstractNode;
    visitBit_select?: (ctx: Bit_selectContext) => AbstractNode;
    visitSelect?: (ctx: SelectContext) => AbstractNode;
    visitNonrange_select?: (ctx: Nonrange_selectContext) => AbstractNode;
    visitConstant_bit_select?: (ctx: Constant_bit_selectContext) => AbstractNode;
    visitConstant_select?: (ctx: Constant_selectContext) => AbstractNode;
    visitConstant_let_expression?: (ctx: Constant_let_expressionContext) => AbstractNode;
    visitNet_lvalue?: (ctx: Net_lvalueContext) => AbstractNode;
    visitVariable_lvalue?: (ctx: Variable_lvalueContext) => AbstractNode;
    visitNonrange_variable_lvalue?: (ctx: Nonrange_variable_lvalueContext) => AbstractNode;
    visitUnary_operator?: (ctx: Unary_operatorContext) => AbstractNode;
    visitBinary_operator?: (ctx: Binary_operatorContext) => AbstractNode;
    visitInc_or_dec_operator?: (ctx: Inc_or_dec_operatorContext) => AbstractNode;
    visitUnary_module_path_operator?: (ctx: Unary_module_path_operatorContext) => AbstractNode;
    visitBinary_module_path_operator?: (ctx: Binary_module_path_operatorContext) => AbstractNode;
    visitNumber?: (ctx: NumberContext) => AbstractNode;
    visitIntegral_number?: (ctx: Integral_numberContext) => AbstractNode;
    visitDecimal_number?: (ctx: Decimal_numberContext) => AbstractNode;
    visitBinary_number?: (ctx: Binary_numberContext) => AbstractNode;
    visitOctal_number?: (ctx: Octal_numberContext) => AbstractNode;
    visitHex_number?: (ctx: Hex_numberContext) => AbstractNode;
    visitSign?: (ctx: SignContext) => AbstractNode;
    visitSize?: (ctx: SizeContext) => AbstractNode;
    visitNon_zero_unsigned_number?: (ctx: Non_zero_unsigned_numberContext) => AbstractNode;
    visitReal_number?: (ctx: Real_numberContext) => AbstractNode;
    visitFixed_point_number?: (ctx: Fixed_point_numberContext) => AbstractNode;
    visitExp?: (ctx: ExpContext) => AbstractNode;
    visitUnsigned_number?: (ctx: Unsigned_numberContext) => AbstractNode;
    visitBinary_value?: (ctx: Binary_valueContext) => AbstractNode;
    visitOctal_value?: (ctx: Octal_valueContext) => AbstractNode;
    visitHex_value?: (ctx: Hex_valueContext) => AbstractNode;
    visitDecimal_base?: (ctx: Decimal_baseContext) => AbstractNode;
    visitBinary_base?: (ctx: Binary_baseContext) => AbstractNode;
    visitOctal_base?: (ctx: Octal_baseContext) => AbstractNode;
    visitHex_base?: (ctx: Hex_baseContext) => AbstractNode;
    visitNon_zero_decimal_digit?: (ctx: Non_zero_decimal_digitContext) => AbstractNode;
    visitDecimal_digit?: (ctx: Decimal_digitContext) => AbstractNode;
    visitBinary_digit?: (ctx: Binary_digitContext) => AbstractNode;
    visitOctal_digit?: (ctx: Octal_digitContext) => AbstractNode;
    visitHex_digit?: (ctx: Hex_digitContext) => AbstractNode;
    visitX_digit?: (ctx: X_digitContext) => AbstractNode;
    visitZ_digit?: (ctx: Z_digitContext) => AbstractNode;
    visitUnbased_unsized_literal?: (ctx: Unbased_unsized_literalContext) => AbstractNode;
    visitString_literal?: (ctx: String_literalContext) => AbstractNode;
    visitAttribute_instance?: (ctx: Attribute_instanceContext) => AbstractNode;
    visitAttr_spec?: (ctx: Attr_specContext) => AbstractNode;
    visitAttr_name?: (ctx: Attr_nameContext) => AbstractNode;
    visitArray_identifier?: (ctx: Array_identifierContext) => AbstractNode;
    visitBlock_identifier?: (ctx: Block_identifierContext) => AbstractNode;
    visitBin_identifier?: (ctx: Bin_identifierContext) => AbstractNode;
    visitC_identifier?: (ctx: C_identifierContext) => AbstractNode;
    visitCell_identifier?: (ctx: Cell_identifierContext) => AbstractNode;
    visitChecker_identifier?: (ctx: Checker_identifierContext) => AbstractNode;
    visitClass_identifier?: (ctx: Class_identifierContext) => AbstractNode;
    visitClass_variable_identifier?: (ctx: Class_variable_identifierContext) => AbstractNode;
    visitClocking_identifier?: (ctx: Clocking_identifierContext) => AbstractNode;
    visitConfig_identifier?: (ctx: Config_identifierContext) => AbstractNode;
    visitConst_identifier?: (ctx: Const_identifierContext) => AbstractNode;
    visitConstraint_identifier?: (ctx: Constraint_identifierContext) => AbstractNode;
    visitCovergroup_identifier?: (ctx: Covergroup_identifierContext) => AbstractNode;
    visitCovergroup_variable_identifier?: (ctx: Covergroup_variable_identifierContext) => AbstractNode;
    visitCover_point_identifier?: (ctx: Cover_point_identifierContext) => AbstractNode;
    visitCross_identifier?: (ctx: Cross_identifierContext) => AbstractNode;
    visitDynamic_array_variable_identifier?: (ctx: Dynamic_array_variable_identifierContext) => AbstractNode;
    visitEnum_identifier?: (ctx: Enum_identifierContext) => AbstractNode;
    visitFormal_identifier?: (ctx: Formal_identifierContext) => AbstractNode;
    visitFormal_port_identifier?: (ctx: Formal_port_identifierContext) => AbstractNode;
    visitFunction_identifier?: (ctx: Function_identifierContext) => AbstractNode;
    visitGenerate_block_identifier?: (ctx: Generate_block_identifierContext) => AbstractNode;
    visitGenvar_identifier?: (ctx: Genvar_identifierContext) => AbstractNode;
    visitHierarchical_array_identifier?: (ctx: Hierarchical_array_identifierContext) => AbstractNode;
    visitHierarchical_block_identifier?: (ctx: Hierarchical_block_identifierContext) => AbstractNode;
    visitHierarchical_event_identifier?: (ctx: Hierarchical_event_identifierContext) => AbstractNode;
    visitHierarchical_identifier?: (ctx: Hierarchical_identifierContext) => AbstractNode;
    visitHierarchical_net_identifier?: (ctx: Hierarchical_net_identifierContext) => AbstractNode;
    visitHierarchical_parameter_identifier?: (ctx: Hierarchical_parameter_identifierContext) => AbstractNode;
    visitHierarchical_property_identifier?: (ctx: Hierarchical_property_identifierContext) => AbstractNode;
    visitHierarchical_sequence_identifier?: (ctx: Hierarchical_sequence_identifierContext) => AbstractNode;
    visitHierarchical_task_identifier?: (ctx: Hierarchical_task_identifierContext) => AbstractNode;
    visitHierarchical_tf_identifier?: (ctx: Hierarchical_tf_identifierContext) => AbstractNode;
    visitHierarchical_variable_identifier?: (ctx: Hierarchical_variable_identifierContext) => AbstractNode;
    visitIdentifier(ctx: IdentifierContext): AbstractNode {
        return new AbstractNode();
    }
    visitIndex_variable_identifier?: (ctx: Index_variable_identifierContext) => AbstractNode;
    visitInterface_identifier?: (ctx: Interface_identifierContext) => AbstractNode;
    visitInterface_instance_identifier?: (ctx: Interface_instance_identifierContext) => AbstractNode;
    visitInout_port_identifier?: (ctx: Inout_port_identifierContext) => AbstractNode;
    visitInput_port_identifier?: (ctx: Input_port_identifierContext) => AbstractNode;
    visitInstance_identifier?: (ctx: Instance_identifierContext) => AbstractNode;
    visitLibrary_identifier?: (ctx: Library_identifierContext) => AbstractNode;
    visitMember_identifier?: (ctx: Member_identifierContext) => AbstractNode;
    visitMethod_identifier?: (ctx: Method_identifierContext) => AbstractNode;
    visitModport_identifier?: (ctx: Modport_identifierContext) => AbstractNode;
    visitModule_identifier?: (ctx: Module_identifierContext) => AbstractNode;
    visitNet_identifier?: (ctx: Net_identifierContext) => AbstractNode;
    visitNet_type_identifier?: (ctx: Net_type_identifierContext) => AbstractNode;
    visitOutput_port_identifier?: (ctx: Output_port_identifierContext) => AbstractNode;
    visitPackage_identifier?: (ctx: Package_identifierContext) => AbstractNode;
    visitPackage_scope?: (ctx: Package_scopeContext) => AbstractNode;
    visitParameter_identifier?: (ctx: Parameter_identifierContext) => AbstractNode;
    visitPort_identifier(ctx: Port_identifierContext): AbstractNode {
        return new PortNode(ctx);
    }
    visitProduction_identifier?: (ctx: Production_identifierContext) => AbstractNode;
    visitProgram_identifier?: (ctx: Program_identifierContext) => AbstractNode;
    visitProperty_identifier?: (ctx: Property_identifierContext) => AbstractNode;
    visitPs_class_identifier?: (ctx: Ps_class_identifierContext) => AbstractNode;
    visitPs_covergroup_identifier?: (ctx: Ps_covergroup_identifierContext) => AbstractNode;
    visitPs_checker_identifier?: (ctx: Ps_checker_identifierContext) => AbstractNode;
    visitPs_identifier?: (ctx: Ps_identifierContext) => AbstractNode;
    visitPs_or_hierarchical_array_identifier?: (ctx: Ps_or_hierarchical_array_identifierContext) => AbstractNode;
    visitPs_or_hierarchical_net_identifier?: (ctx: Ps_or_hierarchical_net_identifierContext) => AbstractNode;
    visitPs_or_hierarchical_property_identifier?: (ctx: Ps_or_hierarchical_property_identifierContext) => AbstractNode;
    visitPs_or_hierarchical_sequence_identifier?: (ctx: Ps_or_hierarchical_sequence_identifierContext) => AbstractNode;
    visitPs_or_hierarchical_tf_identifier?: (ctx: Ps_or_hierarchical_tf_identifierContext) => AbstractNode;
    visitPs_parameter_identifier?: (ctx: Ps_parameter_identifierContext) => AbstractNode;
    visitPs_type_identifier?: (ctx: Ps_type_identifierContext) => AbstractNode;
    visitSequence_identifier?: (ctx: Sequence_identifierContext) => AbstractNode;
    visitSignal_identifier?: (ctx: Signal_identifierContext) => AbstractNode;
    visitSimple_identifier?: (ctx: Simple_identifierContext) => AbstractNode;
    visitSpecparam_identifier?: (ctx: Specparam_identifierContext) => AbstractNode;
    visitTask_identifier?: (ctx: Task_identifierContext) => AbstractNode;
    visitTf_identifier?: (ctx: Tf_identifierContext) => AbstractNode;
    visitTerminal_identifier?: (ctx: Terminal_identifierContext) => AbstractNode;
    visitTopmodule_identifier?: (ctx: Topmodule_identifierContext) => AbstractNode;
    visitType_identifier?: (ctx: Type_identifierContext) => AbstractNode;
    visitUdp_identifier?: (ctx: Udp_identifierContext) => AbstractNode;
    visitVariable_identifier?: (ctx: Variable_identifierContext) => AbstractNode;

    /*visitTerminal(node: import("antlr4ts/tree/TerminalNode").TerminalNode): AbstractNode {
        return new TerminalNode(node);
    }

    /*visitErrorNode(node: import("antlr4ts/tree/ErrorNode").ErrorNode): AbstractNode {
        throw new Error("Method not implemented.");
    }*/

    visitChildren(rule : RuleNode) : AbstractNode {
        //DO NOTHING
        return this.defaultResult();
    }

    traverseChildren(tree : ParseTree) : AbstractNode[] {
        let childArray = new Array<AbstractNode>();
        for(let i = 0; i < tree.childCount; i++){
            let child = tree.getChild(i);
            let absChild = this.visit(child);
            if(absChild.isAbstract()){
                childArray = childArray.concat(this.traverseChildren(child));
            } else {
                childArray.push(absChild);
            }
        }
        return childArray;
    }

}
