// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { CodeProcess } from './process';
 
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('========================go-spring===================================');
	console.log('Congratulations, your extension "go-spring" is now active!');

	const config = vscode.workspace.getConfiguration("px-to-rpx");

	const process = new CodeProcess();

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposableTab = vscode.commands.registerTextEditorCommand('go-spring.add-bean-tag', (textEditor,edit) => {
		const doc = textEditor.document;
        let selection: vscode.Selection | vscode.Range = textEditor.selection;
 
        //获取选中区域
        if (selection.isEmpty) {
            const start = new vscode.Position(0, 0);
            const end = new vscode.Position(doc.lineCount - 1, doc.lineAt(doc.lineCount - 1).text.length);
            selection = new vscode.Range(start, end);
        }
        
        let text = doc.getText(selection);


		let code=process.autoAddTag(text);
		if(code===''){
			vscode.window.showInformationMessage('no change');
		}else{
			textEditor.edit( (builder:any) => {
				// let insertPosition=selection.end.translate(1);
				builder.replace(selection, code);
			});
		}
	});
	const disposableSetter = vscode.commands.registerTextEditorCommand('go-spring.setter', (textEditor, edit) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		
		const doc = textEditor.document;
        let selection: vscode.Selection | vscode.Range = textEditor.selection;
 
        //获取选中区域
        if (selection.isEmpty) {
            const start = new vscode.Position(0, 0);
            const end = new vscode.Position(doc.lineCount - 1, doc.lineAt(doc.lineCount - 1).text.length);
            selection = new vscode.Range(start, end);
        }
        
        let text = doc.getText(selection);

		// vscode.window.showInformationMessage('text='+text);
		let fullText=doc.getText();

		let code=process.convertSetter(text,fullText);
		if(code===''){
			vscode.window.showInformationMessage('no change.');
		}else{
			textEditor.edit( (builder:any) => {
				let insertPosition=selection.end.translate(1);
				builder.insert(insertPosition, code);
			});
		}
		

	});
	const disposableName = vscode.commands.registerTextEditorCommand('go-spring.add-bean-name', (textEditor, edit) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		
		const doc = textEditor.document;
        let selection: vscode.Selection | vscode.Range = textEditor.selection;
 
        //获取选中区域
        if (selection.isEmpty) {
            const start = new vscode.Position(0, 0);
            const end = new vscode.Position(doc.lineCount - 1, doc.lineAt(doc.lineCount - 1).text.length);
            selection = new vscode.Range(start, end);
        }
        
        let text = doc.getText(selection);
		let fullText=doc.getText();
		let code=process.convertBeanName(text,fullText);
		if(code===''){
			vscode.window.showInformationMessage('no change');
		}else{
			textEditor.edit( (builder:any) => {
				let insertPosition=selection.end.translate(1);
				builder.insert(insertPosition, code);
			});
		}
		

	});

	context.subscriptions.push(disposableTab);
	context.subscriptions.push(disposableSetter);
	context.subscriptions.push(disposableName);
}

// This method is called when your extension is deactivated
export function deactivate() {}
