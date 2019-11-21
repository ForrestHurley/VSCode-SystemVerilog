
export class IncludeFile{

    file_name:string = "";
    included_files:Set<string> = new Set<string>();
    including_files:Set<string> = new Set<string>();

    constructor(file_name: string){
        this.file_name = file_name;
    }
}

export class IncludeTree extends Map<string,IncludeFile>{
    public AddOrModifyFile(file_name: string, included_files: Set<string>){
        let current_file = this[file_name]? this[file_name]: new IncludeFile(file_name);
        let remove_diff = new Array<string>();
        let add_diff = new Array<string>();
        if (current_file.included_files) {
            current_file.included_files.forEach((val:string) => {
                if (!included_files.has(val))
                    remove_diff.push(val);
            });
            included_files.forEach((val:string) => {
                if (!current_file.included_files.has(val))
                    add_diff.push(val);
            });
        }
        else
            add_diff = Array.from(included_files);

        current_file.included_files = included_files;
        this[file_name] = current_file;

        remove_diff.forEach((val:string) => {
            if (this[val])
                this[val].including_files.delete(val);
        });
        add_diff.forEach((val:string) => {
            if (!this[val])
                this[val] = new IncludeFile(val);

            this[val].including_files.add(val);
        });
    }

    public GetAllIncludes(file_name: string): string[]{
        return [];
    }
    
}