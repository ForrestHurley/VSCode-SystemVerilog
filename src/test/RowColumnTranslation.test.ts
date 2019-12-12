import {
    TextDocument,
    createConnection,
    Diagnostic,
    DiagnosticSeverity,
    Range,
    Position,
    TextDocuments,
    DidOpenTextDocumentParams,
    DidOpenTextDocumentNotification,
    DidCloseTextDocumentParams,
    DidCloseTextDocumentNotification,
    TextDocumentSyncKind,
    ProposedFeatures,
    ConnectionStrategy
} from 'vscode-languageserver';
import * as vscode from 'vscode';
import {
    Uri, workspace
} from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as assert from 'assert';
import { ANTLRBackend } from '../compiling/ANTLRBackend';
import { getPathFromUri } from '../utils/common';
import { beforeEach } from 'mocha'
import { Select_expressionContext } from '../compiling/ANTLR/grammar/build/SystemVerilogParser';
import { TransportKind, TextDocumentIdentifier } from 'vscode-languageclient';
import { Duplex } from 'stream';
import { Preprocessor } from '../compiling/ANTLR/Preprocessor';

const testFolderLocation = '../../src/test/';

suite('Row-Column Translation Tests', () => {
    // Test row-col translation from original (row 1, col 1) to parsed (row 1, col 1) for text with no macro definitions
    test('test #1: Translation from original row and column to parsed row and column for text without macro definitions', async () => {
        let input_file_name: string = `test-files/MacroReplace.test/no_macros.sv`;
        let original_row_col: [number, number] = [1, 1];
        let expected_row_col: [number, number] = [1, 1];
        await rowColumnTranslationOriginalToParsedTest(input_file_name, original_row_col, expected_row_col);
    }).timeout(10000);

    // Test row-col translation from parsed (row 1, col 1) to original (row 1, col 1) for text with no macro definitions
    test('test #2: Translation from parsed row and column to original row and column for text without macro definitions', async () => {
        let input_file_name: string = `test-files/MacroReplace.test/no_macros.sv`;
        let parsed_row_col: [number, number] = [1, 1];
        let expected_row_col: [number, number] = [1, 1];
        await rowColumnTranslationParsedToOriginalTest(input_file_name, parsed_row_col, expected_row_col);
    }).timeout(10000);

    // Test row-col translation from original (row 2, col 14) to parsed (row 1, col 14) for text with one macro definition but no uses
    test('test #3: Translation from original row and column to parsed row and column for text with single macro definition but no macro uses', async () => {
        let input_file_name: string = `test-files/MacroReplace.test/single_macro_no_uses.sv`;
        let original_row_col: [number, number] = [2, 14];
        let expected_row_col: [number, number] = [1, 14];
        await rowColumnTranslationOriginalToParsedTest(input_file_name, original_row_col, expected_row_col);
    }).timeout(10000);

    // Test row-col translation from parsed (row 1, col 14) to original (row 2, col 14) for text with one macro definition but no uses
    test('test #4: Translation from parsed row and column to original row and column for text with single macro definition but no macro uses', async () => {
        let input_file_name: string = `test-files/MacroReplace.test/single_macro_no_uses.sv`;
        let parsed_row_col: [number, number] = [1, 14];
        let expected_row_col: [number, number] = [2, 14];
        await rowColumnTranslationParsedToOriginalTest(input_file_name, parsed_row_col, expected_row_col);
    }).timeout(10000);

    // Test row-col translation from original (row 5, col 22) to parsed (row 3, col 14) for text with multiple macro definitions with multiple uses
    test('test #5: Translation from original row and column to parsed row and column for text with multiple macro definitions with multiple macro uses', async () => {
        let input_file_name: string = `test-files/MacroReplace.test/multiple_macros_multiple_uses.sv`;
        let original_row_col: [number, number] = [5, 22];
        let expected_row_col: [number, number] = [3, 14];
        await rowColumnTranslationOriginalToParsedTest(input_file_name, original_row_col, expected_row_col);
    }).timeout(10000);

    // Test row-col translation from parsed (row 3, col 14) to original (row 5, col 22) for text with multiple macro definitions with multiple uses
    test('test #6: Translation from parsed row and column to original row and column for text with multiple macro definitions with multiple macro uses', async () => {
        let input_file_name: string = `test-files/MacroReplace.test/multiple_macros_multiple_uses.sv`;
        let parsed_row_col: [number, number] = [3, 14];
        let expected_row_col: [number, number] = [5, 22];
        await rowColumnTranslationParsedToOriginalTest(input_file_name, parsed_row_col, expected_row_col);
    }).timeout(10000);
});

/**
 * Tests that the output of translate_row_col_from_original_to_parsed when given the text from input_file and the input row-col matches the expected row-col for the parsed text
 * @param input_file The file to retrieve the input text from
 * @param original_row_col The row and column to translate to the parsed row and column
 * @param expected_row_col The expected row and column output from the row-col translation
 */
async function rowColumnTranslationOriginalToParsedTest(input_file: string, original_row_col: [number, number], expected_row_col: [number, number]) {
        let filePath = path.join(__dirname, testFolderLocation, input_file);
        let uriDoc = Uri.file(filePath);

        let documentWorkspace = await workspace.openTextDocument(uriDoc);
        let document: TextDocument = castTextDocument(documentWorkspace);
        let input_text: string = document.getText();

        let preprocessor: Preprocessor = new Preprocessor();
        let output_text: string = preprocessor.preprocess(input_text);
        let output_row_col: [number, number] = preprocessor.translate_row_col_from_original_to_parsed(original_row_col[0], original_row_col[1]);

        if (output_row_col[0] != expected_row_col[0] || output_row_col[1] != expected_row_col[1]) {
            assert.fail();
        } // else pass
}

/**
 * Tests that the output of translate_row_col_from_parsed_to_original when given the text from input_file and the input row-col matches the expected row-col for the original text
 * @param input_file The file to retrieve the input text from
 * @param parsed_row_col The row and column to translate to the original row and column
 * @param expected_row_col The expected row and column output from the row-col translation
 */
async function rowColumnTranslationParsedToOriginalTest(input_file: string, parsed_row_col: [number, number], expected_row_col: [number, number]) {
        let filePath = path.join(__dirname, testFolderLocation, input_file);
        let uriDoc = Uri.file(filePath);

        let documentWorkspace = await workspace.openTextDocument(uriDoc);
        let document: TextDocument = castTextDocument(documentWorkspace);
        let input_text: string = document.getText();

        let preprocessor: Preprocessor = new Preprocessor();
        let output_text: string = preprocessor.preprocess(input_text);
        let output_row_col: [number, number] = preprocessor.translate_row_col_from_parsed_to_original(parsed_row_col[0], parsed_row_col[1]);

        if (output_row_col[0] != expected_row_col[0] || output_row_col[1] != expected_row_col[1]) {
            assert.fail();
        } // else pass
}

/**
 * Converts a given `document` from vscode.TextDocument to vscode-languageserver.TextDocument
 * 
 * @param document the document to convert
 * @returns a converted document
 */
function castTextDocument(document: vscode.TextDocument): TextDocument {
    return {
        uri: document.uri.fsPath,
        languageId: document.languageId,
        version: document.version,
        getText(range?: Range): string {
            if (range)
                return document.getText(castRange(range));
            else
                return document.getText();
        },
        lineCount: document.lineCount,
        positionAt(offset: number): Position {
            let position = document.positionAt(offset);
            return {
                line: position.line,
                character: position.character
            };
        },
        offsetAt(position: Position) {
            return document.offsetAt(castPosition(position));
        }
    };
}

/**
 * Converts a given `range` from vscode-languageserver.Range to vscode.Range
 * 
 * @param document the range to convert
 * @returns a converted range
 */
function castRange(range: Range) {
    let startOld = range.start;
    let endOld = range.end;

    let start = new vscode.Position(startOld.line, startOld.character);
    let end = new vscode.Position(endOld.line, endOld.character);

    return new vscode.Range(start, end);
}
/**
 * Converts a given `position` from vscode-languageserver.Position to vscode.Position
 * 
 * @param document the position to convert
 * @returns a converted position
 */
function castPosition(position: Position) {
    return new vscode.Position(position.line, position.character);
}
