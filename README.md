# Tag Anything [![Build Status](https://travis-ci.org/raspi-s-dojo/tag-anything.svg?branch=master)](https://travis-ci.org/raspi-s-dojo/tag-anything)

Salesforce Tag Anything feature #LightningComponent #Salesforce #Awesome

Project under construction

# HOW TO SETUP AND USE PRETTIER

### Requirements

-   NodeJS (install LTS version from https://nodejs.org/en/download/ _chocolatey is not necessary_)
-   VS Code
-   Prettier Plugin for VS Code (specified in following steps)
-   Java >1.8

### Steps to reproduce for a New Projects / Repository

-   Follow the instructions described in: https://developer.salesforce.com/tools/vscode/en/user-guide/prettier
-   You should include in the `.gitignore` file the following entries:

    -   `node_modules`
    -   `package-lock.json`

-   You should add in the repository the following files generated through the guide
    -   `package.json`
    -   `.prettierrc`

### Steps to reproduce as Developer

1. Open a bash terminal (we recommend to setup VSCode default shell with `bash` rather than `powershell`)
2. Run the command `npm install`
    - Notice this creates a `package-lock.json` file and a `node_modules` folder
3. Install Prettier plugin for VS Code : Prettier - Code formatter
4. Open an Apex File with lines that doesn't meet the code conventions
5. Format the document with `Ctrl+Shift+P` and type: `Format Document`
    - If a message appears saying there's no APEX formatter, review you reproduced the previous steps
    - Restart VsCode and try again
    - If is still failing contact @asenjoe with your issue.

### Recommendations

-   In order to format the document when we save it, we recommend to set in your settings.json with the following entries: - `editor.formatOnSave` as `true` - `editor.formatOnSaveTimout` as `5000`
    _(you can open your settings pressing `Ctrl+Shift+P` and select the option `Preferences: Open Settings (JSON)` )_# HOW TO INSTALL AND USER PRETTIER WITH APEX
