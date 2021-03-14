import { Photo } from "../../components/usePhotoGallery";

export class Boleto {
  key: string;
  titulo: string;
  grupo: string;
  isDividido: boolean;
  vezesRepetir: number |undefined;
  valor: number | undefined;
  data: Date; 
  foto:string ; 
  

  static readonly COLLECTION_NAME: string = "boletos";

  constructor() {
    this.key = "";
    this.titulo = "";
    this.grupo = "";    
    this.isDividido = false;
    this.vezesRepetir = undefined;
    this.valor = undefined;
    this.data = new Date();   
    this.foto = ""; 
  }

   toArray = (boleto:Boleto) => {
    
    let retorno =  {
      key: boleto.key,
      titulo: boleto.titulo,
      grupo: boleto.grupo,      
      isRepetir: boleto.isDividido,
      vezesRepetir: Number( boleto.vezesRepetir),
      valor: Number(boleto.valor),
      data: boleto.data,    
      foto: boleto.foto,  
    };
    
    
    return retorno;
  }

  isNovoLancamento = ():boolean =>{
    return this.key == '' || this.key == undefined;
  }



}
