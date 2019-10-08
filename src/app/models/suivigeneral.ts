export interface SuiviGeneral{
    titre:string ;
    message:string;
    datedebut:string;
    datefin:string;
    idecole:number;
    idenseignant:number;
    idmatiere:number;
    idannee:number;
    idclasse:number;
    datedevoir?:string;
    idtypesuivi:number;
    fileexo? :{
        filename:string,
        filetype:string,
        value:string
    };

}