export class Lancamento{
    key:string ;
    titulo:string;
    grupo:string; 
    tipo:string;
    isRepetir:boolean;
    vezesRepetir:number;
    valor:string;
    data:Date ;
    situacao:boolean ;
    
    constructor(){
        this.key = "";
        this.titulo = "";
        this.grupo = "";
        this.tipo = "";
        this.isRepetir = false;
        this.vezesRepetir = 0;
        this.valor = "";
        this.data = new Date();
        this.situacao = false;
    }
}