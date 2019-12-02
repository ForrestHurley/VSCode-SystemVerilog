# Developer guide

This Developer guide is for future senior design teams or other developers who want to extend or modify the project.


# Structure

### Install and Compile

    npm ci && npm run compile


## Testing
#### Documentations
- [Tutorial](https://vscode.rocks/testing/) for testing your extension using [MochaJS](https://mochajs.org/)
- Documentation on writing tests for vscode extension - [Testing Extension](https://code.visualstudio.com/api/working-with-extensions/testing-extension)
#### Running Tests
- Open the terminal and run one of the following commands on root of the project:

	    npm run test
		npm run compile && node ./out/test/runTest.js

- VSCode Extension Development Host opens up and runs the tests
- Tests results are displayed on terminal or you can find the generated xml test results file on root - results.xml .
### Adding new tests
All test classes and test files can be found in test directory

    src\test
