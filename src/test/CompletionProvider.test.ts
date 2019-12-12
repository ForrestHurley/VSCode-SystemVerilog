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
import { TransportKind, TextDocumentIdentifier, CompletionItemKind } from 'vscode-languageclient';
import { Duplex } from 'stream';
import { SVCompletionItemProvider } from '../providers/CompletionProvider';

const testFolderLocation = '../../src/test/';


suite('CompletionProvider Tests', () => {

    test('test #1: empty dot completion at file begin', async () => {
        let filePath = path.join(__dirname, testFolderLocation, `test-files/ANTLRCompiler.test/single_error.sv`);
        let uriDoc = Uri.file(filePath);

        let documentWorkspace = await workspace.openTextDocument(uriDoc);
        let document: TextDocument = castTextDocument(documentWorkspace);

        let position = document.positionAt(0);
        position.line = 2;
        position.character = 1;
        let completion_context = {'triggerCharacter':'.','triggerKind':undefined};

        let documentCompiler = new ANTLRBackend();
        await documentCompiler.parseDocument(document);

        let completion_provider = new SVCompletionItemProvider(documentCompiler);
        let completion_items = completion_provider.provideCompletionItems(document,position,completion_context);

        if (completion_items.length != 0)
            assert.fail();

    }).timeout(10000);

    test('test #2: empty space completion at file begin', async () => {
        let filePath = path.join(__dirname, testFolderLocation, `test-files/ANTLRCompiler.test/single_error.sv`);
        let uriDoc = Uri.file(filePath);

        let documentWorkspace = await workspace.openTextDocument(uriDoc);
        let document: TextDocument = castTextDocument(documentWorkspace);

        let position = document.positionAt(0);
        position.line = 2;
        position.character = 1;
        let completion_context = {'triggerCharacter':' ','triggerKind':undefined};

        let documentCompiler = new ANTLRBackend();
        await documentCompiler.parseDocument(document);

        let completion_provider = new SVCompletionItemProvider(documentCompiler);
        let completion_items = completion_provider.provideCompletionItems(document,position,completion_context);

        if (completion_items.length != 0)
            assert.fail();

    }).timeout(10000);

    test('test #3: empty [ completion at file begin', async () => {
        let filePath = path.join(__dirname, testFolderLocation, `test-files/ANTLRCompiler.test/single_error.sv`);
        let uriDoc = Uri.file(filePath);

        let documentWorkspace = await workspace.openTextDocument(uriDoc);
        let document: TextDocument = castTextDocument(documentWorkspace);

        let position = document.positionAt(0);
        position.line = 2;
        position.character = 1;
        let completion_context = {'triggerCharacter':'[','triggerKind':undefined};

        let documentCompiler = new ANTLRBackend();
        await documentCompiler.parseDocument(document);

        let completion_provider = new SVCompletionItemProvider(documentCompiler);
        let completion_items = completion_provider.provideCompletionItems(document,position,completion_context);

        if (completion_items.length != 0)
            assert.fail();

    }).timeout(10000);

    test('test #4: $ completion at file begin', async () => {
        let filePath = path.join(__dirname, testFolderLocation, `test-files/ANTLRCompiler.test/single_error.sv`);
        let uriDoc = Uri.file(filePath);

        let documentWorkspace = await workspace.openTextDocument(uriDoc);
        let document: TextDocument = castTextDocument(documentWorkspace);

        let position = document.positionAt(0);
        position.line = 2;
        position.character = 1;
        let completion_context = {'triggerCharacter':'$','triggerKind':undefined};

        let documentCompiler = new ANTLRBackend();
        await documentCompiler.parseDocument(document);

        let completion_provider = new SVCompletionItemProvider(documentCompiler);
        let completion_items = completion_provider.provideCompletionItems(document,position,completion_context);

        if (completion_items.length == 0)
            assert.fail();

    }).timeout(10000);

    test('test #5: this. completion in class', async () => {
        let filePath = path.join(__dirname, testFolderLocation, `test-files/environment_test.sv`);
        let uriDoc = Uri.file(filePath);

        let documentWorkspace = await workspace.openTextDocument(uriDoc);
        let document: TextDocument = castTextDocument(documentWorkspace);

        let position = document.positionAt(0);
        position.line = 24;
        position.character = 10;
        let completion_context = {'triggerCharacter':'.','triggerKind':undefined};

        let documentCompiler = new ANTLRBackend();
        await documentCompiler.parseDocument(document);

        let completion_provider = new SVCompletionItemProvider(documentCompiler);
        let completion_items = completion_provider.provideCompletionItems(document,position,completion_context);

        //new should in the future not be a completion item. At the moment it is (and that is intended)
        //so there are 6 completion items
        if (completion_items.length != 5 && completion_items.length != 6)
            assert.fail();

        let check_items = [{'label':'gen','kind': CompletionItemKind.Property},
                            {'label':'driv','kind': CompletionItemKind.Property},
                            {'label':'gen2driv','kind': CompletionItemKind.Property},
                            {'label':'vif','kind': CompletionItemKind.Property},
                            {'label':'b','kind': CompletionItemKind.Property}];

        check_items.forEach((val) => {
            let has_item = false;
            completion_items.forEach((item) => {
                if (item.label == val.label && item.kind == val.kind)
                    has_item = true;
            });
            if (!has_item)
                assert.fail();
        });


    }).timeout(10000);

});

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