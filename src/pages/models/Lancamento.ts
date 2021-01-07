import { stringify } from "querystring";
import firebase from "firebase";

export class Lancamento {
  key: string;
  titulo: string;
  grupo: string;
  tipo: string;
  isRepetir: boolean;
  vezesRepetir: number |undefined;
  valor: number | undefined;
  data: string;
  situacao: boolean;

  static readonly COLLECTION_NAME: string = "lancamentos";
  static readonly TIPO_RECEBIDO: string = "recebido";
  static readonly TIPO_DESPESA: string = "despesa";

  constructor() {
    this.key = "";
    this.titulo = "";
    this.grupo = "";
    this.tipo = "";
    this.isRepetir = false;
    this.vezesRepetir = undefined;
    this.valor = undefined;
    this.data = (new Date()).toDateString();
    this.situacao = false;
  }

   toArray = (lancamento:Lancamento) => {
    console.log(typeof (lancamento.valor))
    let retorno =  {
      key: lancamento.key,
      titulo: lancamento.titulo,
      grupo: lancamento.grupo,
      tipo: lancamento.tipo,
      isRepetir: lancamento.isRepetir,
      vezesRepetir: Number( lancamento.vezesRepetir),
      valor: Number(lancamento.valor),
      data: lancamento.data,
      situacao: lancamento.situacao,
    };
    
    
    return retorno;
  }



}
