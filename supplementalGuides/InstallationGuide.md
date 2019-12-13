# Installation Guide

Installation guide includes steps for building and publishing the project - **SystemVerilog Language Extension for Visual Studio Code**. 

## Requirements

* Java
* [nodejs/npm](https://nodejs.org/en/download/)

## Installing Dependencies

    npm install

## Generating Parser
**ANTLR** parser generator uses SystemVerilog grammar files in `/src/compiling/ANTLR/grammar` folder and generates the following files under `build` folder.

    SystemVerilogLexer.ts
    SystemVerilogListener.ts
    SystemVerilogParser.ts
    SystemVerilogVisitor.ts

Generate parser using ANTLR parser generator

    npm antlr4ts_compile
Compile code and generate parser

    npm run compile

## Publishing Extension

### vsce
> [vsce](https://github.com/Microsoft/vsce), short for "Visual Studio Code Extensions", is a command-line tool for packaging, publishing and managing VS Code extensions.

#### Installing vsce

    npm install -g vsce
 #### Package the extension
 
Pre-publish step is added in `pakage.json` under `"scripts":` section

    vsce package
 `systemverilog-<version>.vsix` file is generated

#### Installing the packaged extension

    code --install-extension systemverilog-<version>.vsix

#### Verification of the installation
First, make sure that no other extensions for `SystemVerilog` is enabled. You can see the list of enabled extensions by checking `extensions tab` on the left of VSCode. 
Easiest way of verifying the correct installation of the extension is opening up one of the `.sv` document on VSCode. Check if the additional functionalities added for current release are working correctly.
