
export class IncludeFile{
    file_name:string;
    included_files:string[];
    including_files:string[];
}

export class IncludeTree extends Map<string,IncludeFile>{
    public AddOrModifyFile(file_name: string, included_files: string[]){

    }

    public GetAllIncludes(file_name: string){
        
    }
    
}