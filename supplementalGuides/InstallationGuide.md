# Installation Guide

Installation guide includes steps for building and publishing the project - **SystemVerilog language extension for Visual Studio Code**. 

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
 
Pre-publish step is added in `pakage.json` under`scripts` sections

    vsce package
 `systemverilog-<version>.vsix` file generated

#### Installing the packaged extension

    code --install-extension systemverilog-<version>.vsix


## Continuous Integration and Deployment with Azure DevOps

All of the build and publish steps described in previous sections can be done automatically using **Azure DevOps** pipelines.

### Connect NCSU github repository to AzureDevOps pipeline

