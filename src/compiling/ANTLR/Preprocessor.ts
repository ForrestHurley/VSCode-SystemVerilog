export class Preprocessor {
    original_text = "";
    parsed_text = "";
    translation_info: [number, number, number][] = [];

    /**
     * Perform preprocessing tasks, returning the processed text
     * @param text The text to process
     * @returns The processed version of the text
     */
    public preprocess(text: string): string {
        this.translation_info = [];
        this.original_text = text.replace(/\r\n/g, '\n');
        let new_text: string = this.macroReplace(this.original_text);
        this.parsed_text = this.remove_ifdef_ifndef(new_text);
        return this.parsed_text;
    }

    /**
        Function for replacing macro uses with their appropriate text
        @param text The text to identify macro definitions and replace macro uses within
        @returns The text with macro definitions removed and their uses replaced with the text they represent
    */
    public macroReplace(text: string): string {
        this.translation_info = [];
        this.original_text = text.replace(/\r\n/g, '\n');
        let defines_with_text: [[string, string, number][], string] = this.extract_defines(this.original_text);
        let defines: [string, string, number][] = defines_with_text[0];
        let new_text: string = defines_with_text[1];

        this.parsed_text = this.replace_defines(new_text, defines);
        return this.parsed_text;
    }

    /**
     * Function for removing all ifdef and ifndef blocks from text
     * @param text The text to remove all ifdef and ifndef blocks from
     * @returns The text with all ifdef and ifndef blocks removed
     */
    private remove_ifdef_ifndef(text: string): string {
        // Identify ifdef usage
        let def_start_location: number = text.indexOf('`ifdef');
        let new_text: string;
        if (def_start_location == -1) {
            new_text = text;
        } else {
            new_text = text.slice(0, def_start_location);
        }
        while (def_start_location != -1) {
            // TODO: add recursion for nested ifdef/ifndef
            let def_end_location: number = text.indexOf('`endif', def_start_location);
            // Handle if ifdef/ifndef is not ended with a matching endif
            if (def_end_location == -1) {
                // Ignore/do not remove (will cause parsing error)
            } else {
                // Add removal of ifdef to translation_info
                this.translation_info.push([def_start_location - 1, def_end_location + '`endif'.length - def_start_location, -1]);
                // Remove ifdef block
                let next_def: number = text.indexOf('`ifdef', def_end_location + '`endif'.length)
                if (next_def == -1) {
                    new_text = new_text.concat(text.slice(def_end_location + '`endif'.length));
                    break;
                } else {
                    new_text = new_text.concat(text.slice(def_end_location + '`endif'.length, next_def));
                }
            }
            def_start_location = text.indexOf('`ifdef', def_end_location + '`endif'.length);
        }
        // Identify ifndef usage
        def_start_location = new_text.indexOf('`ifndef');
        let newer_text: string;
        if (def_start_location == -1) {
            newer_text = new_text;
        } else {
            newer_text = new_text.slice(0, def_start_location);
        }
        while (def_start_location != -1) {
            // TODO: add recursion for nested ifdef/ifndef
            let def_end_location: number = new_text.indexOf('`endif', def_start_location);
            // Handle if ifdef/ifndef is not ended with a matching endif
            if (def_end_location == -1) {
                // Ignore/do not remove (will cause parsing error)
            } else {
                // Add removal of ifdef to translation_info
                this.translation_info.push([def_start_location - 1, def_end_location + '`endif'.length - def_start_location, -1]);
                // Remove ifdef block
                let next_def: number = new_text.indexOf('`ifndef', def_end_location + '`endif'.length)
                if (next_def == -1) {
                    newer_text = newer_text.concat(new_text.slice(def_end_location + '`endif'.length));
                    break;
                } else {
                    newer_text = newer_text.concat(new_text.slice(def_end_location + '`endif'.length, next_def));
                }
            }
            def_start_location = new_text.indexOf('`ifndef', def_end_location + '`endif'.length);
        }
        return newer_text;
    }

    /**
        Function for identifying macro definitions and removing them from the text
        @param text The text to identify macro definitions and replace macro uses within
        @returns The array of macro labels and the text they represent, and the full text with the macro definitions removed
    */
    private extract_defines(text: string): [[string, string, number][], string] {
        let current_index: number = text.indexOf('`define');
        let defines: [string, string, number][] = [];
        let new_text: string;
        if (current_index == -1) {
            new_text = text;
        } else {
            new_text = text.slice(0, current_index);
        }
        while (current_index != -1) {
            let label: string = text.slice(current_index).split(" ", 2)[1];
            let temp_index: number = text.indexOf('\n', current_index);
            while (temp_index != -1 && text.charAt(temp_index - 1) == '\\') {
                temp_index = text.indexOf('\n', temp_index + 1);
            }
            let value: string = text.slice(text.indexOf(label, current_index) + label.length + 1, temp_index);
            value = value.replace('\\\n', '\n');
            let macro_active_from_index: number = new_text.length;
            defines.push([label, value, macro_active_from_index]);
            // Add removal of macro definition to translation_info
            this.translation_info.push([macro_active_from_index - 1, temp_index - current_index + 1, -1]);
            current_index = text.indexOf('`define', current_index + 1);
            if (current_index == -1) {
                new_text = new_text.concat(text.slice(temp_index + 1));
            } else {
                new_text = new_text.concat(text.slice(temp_index + 1, current_index));
            }
        }
        return [defines, new_text];
    }

    /**
        Function for replacing the appearances of defined macros with their appropriate text within the full text
        @param text The text to replace the macro uses within
        @param defines The array of macro labels and the text they represent
        @returns The full text, with macro uses replaced with the text they represent
    */
    private replace_defines(text: string, defines: [string, string, number][]): string {
        let new_text: string = text;
        let macro_index: number = new_text.lastIndexOf('`');
        while (macro_index != -1) {
            // Check if label matches an existing macro label
            for (let i: number = defines.length - 1; i >= 0; i--) {
                let define: [string, string, number] = defines[i];
                if (define[2] <= macro_index && new_text.slice(macro_index + 1, macro_index + 1 + define[0].length) == define[0]) {
                    // Add removal of macro label to translation_info
                    this.translation_info.push([macro_index - 1, define[0].length + 1, -1]);
                    // Add insertion of macro value to translation_info
                    this.translation_info.push([macro_index - 1, -1 * define[1].length, define[2] + ("`define " + define[0] + " ").length]);
                    // Replace macro
                    new_text = new_text.slice(0, macro_index) + define[1] + new_text.slice(macro_index + 1 + define[0].length);
                    break;
                }
            }
            // Break if last '`' was the first character 
            if (macro_index == 0) {
                break;
            }
            // Get next macro index
            macro_index = new_text.lastIndexOf('`', macro_index - 1);
        }
        return new_text;
    }

    /**
     * Translates a given row and column from the parsed-text index to the row and column for the same character in the original text
     * @param given_row The row to translate from the parsed-text row to the original-text row
     * @param given_col The column to translate from the parsed-text column to the original-text column
     * @returns The row and column of the character in the original text [row, col]
     */
    public translate_row_col_from_parsed_to_original(given_row: number, given_col: number): [number, number] {
        let parsed_index: number = this.translate_row_col_to_index(this.parsed_text, given_row, given_col);
        let original_index: number = this.translate_index_from_parsed_to_original(parsed_index);
        let original_row_col: [number, number] = this.translate_index_to_row_col(this.original_text, original_index);
        return original_row_col;
    }

    /**
     * Translates a given index from the parsed-text index to the index for the same character in the original text
     * @param given_index The index to translate from the parsed-text index to the original-text index
     * @returns The index of the character in the original text
     */
    private translate_index_from_parsed_to_original(given_index: number): number {
        let current_index: number = given_index;
        this.translation_info.reverse().forEach(function (translation) {
            if (translation[0] < current_index) {
                if (current_index < translation[0] - translation[1]) {
                    return translation[2] + current_index - translation[0] - 1;
                }
                current_index += translation[1];
            }
        });
        return current_index;
    } 

    /**
     * Translates a given row and column from the original-text index to the row and column for the same character in the parsed text
     * @param given_row The row to translate from the original-text row to the parsed-text row
     * @param given_col The column to translate from the original-text column to the parsed-text column
     * @returns The row and column of the character in the parsed text [row, col]
     */
    public translate_row_col_from_original_to_parsed(given_row: number, given_col: number): [number, number] {
        let original_index: number = this.translate_row_col_to_index(this.original_text, given_row, given_col);
        let parsed_index: number = this.translate_index_from_original_to_parsed(original_index);
        if (parsed_index == -1) {
            return [-1, -1];
        }
        let parsed_row_col: [number, number] = this.translate_index_to_row_col(this.parsed_text, parsed_index);
        return parsed_row_col;
    }

    /**
     * Translates a given index from the original-text index to the index for the same character in the parsed text
     * @param given_index The index to translate from the original-text index to the parsed-text index
     * @returns The index of the character in the parsed text
     */
    private translate_index_from_original_to_parsed(given_index: number): number {
        let current_index: number = given_index;
        this.translation_info.forEach(function (translation) {
            if (translation[0] < current_index) {
                // if the character was part of a deletion
                if (translation[1] > 0 && current_index < translation[0] + translation[1]) {
                    return -1;
                }
                current_index -= translation[1];
            }
        });
        return current_index;
    } 

    /**
     * Translates the given row and column to the corresponding index in the given text
     * @param text The text to use to translate the row and column to an index
     * @param row The row of the character to get the index of in the text
     * @param col The column of the character to get the index of in the text
     * @returns the index in the text of the character with the given row and column
     */
    private translate_row_col_to_index(text: string, row: number, col: number): number {
        let current_index: number = -1;
        while (row > 0) {
            current_index = text.indexOf('\n', current_index + 1);
            row--;
        }
        current_index = current_index + col;
        return current_index;
    }

    /**
     * Translates the given index to the corresponding row and column in the given text
     * @param text The text to use to translate the given index to a row and column
     * @param index The index of the character to get the row and column of in the text
     * @returns the row and column of the character with the given index in the text [row, col]
     */
    private translate_index_to_row_col(text: string, index: number): [number, number] {
        let char_row: number = 0;
        let char_col: number = 0;
        let current_index: number = text.lastIndexOf('\n', index)
        char_col = index - current_index;
        while (current_index != -1) {
            char_row++;
            if (current_index - 1 >= 0) {
                current_index = text.lastIndexOf('\n', current_index - 1);
            } else {
                break;
            }
        }
        return [char_row, char_col];
    }
};