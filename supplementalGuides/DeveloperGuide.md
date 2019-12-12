# Developer Guide

This Developer guide is for future senior design teams or other developers who want to extend or modify the project.


### Required Software Tools
- Java
- node.js and npm - documentation on installing them can be found [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Install and Compile

Run the following command to install all the dependencies and generate parser.

    npm ci && npm run compile
    
List of all the dependencies can be found in `\package.json` file    

![dependencies](dependencies.png)

## Files
### ANTLR4 Grammar
Our grammar files are in `\src\compiling\ANTLR\grammar\` and if you want to edit them, refer to the [ANTLR4 Documentation](https://github.com/antlr/antlr4/blob/master/doc/index.md) for information on ANTLR, or [IEEE Standard 1800-2017](https://ieeexplore.ieee.org/servlet/opac?punumber=8299593) for the the formal syntax they are based on. `SystemVerilog.g4` is the root file for the grammar.

### Abstract Syntax Tree
Abstract Syntax Tree contains high level information about SystemVerilog code structure
`//explain how to improve AST`

## Adding a New Feature
Adding a new feature?
- identify Language Server Protocol specificaton for the desired feature
https://microsoft.github.io/language-server-protocol/specifications/specification-3-14/
- add to `src\server.ts`

    For example, `connection.onDefinition( ` can be added for go to definition feature.
    ```typescript
    /**
     * This handler provides the initial list of the completion items.
    * 
    * @param completionParams Describes the location in the text document, the text document, and completion context
    */
    connection.onCompletion(
        (completionParams: CompletionParams): CompletionItem[] => {

            var completionList: CompletionItem[] = [];
            var doc = documents.get(completionParams.textDocument.uri);
            
            //Create Completion Provider
            var completionProvider = new SVCompletionItemProvider(backend);

            //pass in document uri, cursor position, and completion context (trigger kind and character)
            //list of completion items get returned
            completionList = completionList.concat(completionProvider.provideCompletionItems(doc, completionParams.position completionParams.context));

            return completionList;
        }
    );
    ```

- implement backend logic to fulfill the lsp request
    - for example, current `src\providers\DefintionProvider.ts` can be modified to implement lsp and use ANTLR generated parser instead of `vscode` and `parser.ts`

## Testing
### Documentations
- [Tutorial](https://vscode.rocks/testing/) for testing your extension using [MochaJS](https://mochajs.org/)
- Documentation on writing tests for vscode extension - [Testing Extension](https://code.visualstudio.com/api/working-with-extensions/testing-extension)
### Running Tests
- Open the terminal and run one of the following commands on root of the project:

	    npm run test
		npm run compile && node ./out/test/runTest.js

- VSCode Extension Development Host opens up and runs the tests
- Test results are displayed on terminal or you can find the generated xml test results file on root - `results.xml` .
### Code Coverage
- `src\test\coverage.ts` file is added for code coverage
  - uses `istanbul` api 
  - used custom coverage script written by Microsoft developer **Alexandru Dima**
    https://github.com/alexdima/vscode-extension-coverage-sample

- Run the following command to generate coverage report 

    	npm run coverage

- check `coverage` folder for generated coverage report: `cobertura-coverage.xml` or `index.html` file
- for continuous integration builds on Azure DevOps pipeline, check `Code Coverage` tab from the build

### Adding new tests
All test classes and test files can be found in `test` directory

    \src\test

SystemVerilog files used in testing are located in `test-files` directory

    \src\test\test-files

- add new test class to `test` folder and test files to `test-files` folder
- run `npm run coverage` command to verify test results and code coverage
- modify tests or add more tests to cover sufficient cases