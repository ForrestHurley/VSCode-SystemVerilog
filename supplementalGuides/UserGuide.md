# User Guide



## Installing 
### From Marketplace
Getting released version from VS Code Marketplace.
- Click on extensions tab
- Search for "systemverilog"
- Click on result: **SystemVerilog - Language Support**
- Click `Install` button

	![marketplace](marketplace.png)

### From VSIX file
Have copy of `.vsix` file for the extension? 
- Open VSCode
- Click extenstions tab
- Click menu, then click `Install from VSIX`
- Browse to VSIX file, click the file
- Click `install`

	![vsix](vsix.png)

-  Reload the window by running  `Developer: Reload window`  command.

## Features
### Syntax Error Identification
- Fast real-time error identification through an integrated SystemVerilog parser and IntelliSense ( Fully accurate to IEEE Standard 1800-2017 )
### Autocomplete Code

## Settings
Change the settings listed below to customize the extension experience.

![settings](settings.png)

-  `systemverilog.antlrVerification`: _Boolean_, Use ANTLR parser to verify code in real-time
-  `systemverilog.disableIndexing`: _Boolean_, Disable indexing
-  `systemverilog.excludeIndexing`: _String_, Exclude files from indexing based on glob
-  `systemverilog.parallelProcessing`: _Integer_, Number of files to process in parallel during indexing
-  `systemverilog.launchConfiguration`: _String_, the command to run when launching verilator
	* Default: _verilator --sv --lint-only --language 1800-2012 --Wall_
	* If not in path, replace _verilator_ with the appropriate command
-  `systemverilog.compileOnSave`: _Boolean_, compile files when saved.
	* Default: *true*
-  `systemverilog.compilerType`: _String_, drop down list to select a compiler type.
	* Default: *Verilator*
-  `systemverilog.trace.server`: _String_, drop down to select verbosity of LSP message tracing

## Known Issues

- Starting up may be a little bit slow if it's a large workspace with many `.sv` files because of indexing
- If you experience the slowness, use the setting: `systemverilog.forceFastIndexing`