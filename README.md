# Context Copy Extension for VS Code

This extension for Visual Studio Code allows users to easily copy context snippets out of the app. It adds a "Copy Context" option to the context menu of files and selected text.

## Features

- Adds a "Copy Context" option to the context menu of the editor.
- Adds a "Copy File Context" option to the context menu of the Explorer.
- The copied context string contains the project-level file path and a code block with the selected text or file content.
- Indicates if there is text preceding or following the selected text.
- Includes line numbers in the preceding or following text indicators.

## Installation

To install this extension locally, follow these steps:

1. Package the extension into a VSIX file using VSCE:

```bash
vsce package
```

2. Install the extension in Visual Studio Code:

   - Open Visual Studio Code.
   - Go to the Extensions view (`Ctrl+Shift+X`).
   - Click on the `...` at the top-right corner of the Extensions view.
   - Choose `Install from VSIX...`.
   - Navigate to the `.vsix` file you just created, select it, and click `Open`.

## Usage

Right-click on selected text in an active editor or on a file in the Explorer, then click on "Copy Context" or "Copy File Context" in the context menu. The context will be copied to your clipboard.
