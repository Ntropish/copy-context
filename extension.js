const vscode = require("vscode");

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "extension.copyContext",
    function () {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        let document = editor.document;
        let selection = editor.selection;

        // Get the selected text or whole file if nothing is selected
        let text = selection.isEmpty
          ? document.getText()
          : document.getText(selection);

        // Check if there is preceding or following text
        let precedingTextExists =
          selection.start.character !== 0 || selection.start.line !== 0;
        let followingTextExists =
          selection.end.character !==
            document.lineAt(selection.end.line).range.end.character ||
          selection.end.line !== document.lineCount - 1;

        // Add indicators with line numbers
        if (precedingTextExists) {
          text = `// ... line ${selection.start.line}\n` + text;
        }
        if (followingTextExists) {
          text = text + `\n// ... line ${selection.end.line + 2}`; // +2 as line numbers start from 0 and we have added a line before
        }

        // Get the file path within the project
        let fullPath = document.fileName.replace(/\\/g, "\\\\");
        let workspaceFolder = vscode.workspace
          .getWorkspaceFolder(document.uri)
          .uri.fsPath.replace(/\\/g, "\\\\");
        let projectPath = fullPath.replace(workspaceFolder, "");
        let languageId = document.languageId;
        let contextString = `**File Path:** ${projectPath}\n\n\`\`\`${languageId}\n${text}\n\`\`\``;

        // Copy context string to clipboard
        vscode.env.clipboard.writeText(contextString);
      }
    }
  );

  context.subscriptions.push(disposable);

  let disposableFile = vscode.commands.registerCommand(
    "extension.copyContextFile",
    function (fileUri) {
      // Read file content
      vscode.workspace.openTextDocument(fileUri).then((document) => {
        let text = document.getText();

        // Get the file path within the project
        let fullPath = document.fileName.replace(/\\/g, "\\\\");
        let workspaceFolder = vscode.workspace
          .getWorkspaceFolder(document.uri)
          .uri.fsPath.replace(/\\/g, "\\\\");
        let projectPath = fullPath.replace(workspaceFolder, "");

        let languageId = document.languageId;
        let contextString = `**File Path:** ${projectPath}\n\n\`\`\`${languageId}\n${text}\n\`\`\``;

        // Copy context string to clipboard
        vscode.env.clipboard.writeText(contextString);
      });
    }
  );

  context.subscriptions.push(disposableFile);
}
// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
