import { stringify } from "querystring";
import firebase from "firebase";

export class Lancamento {
  key: string;
  titulo: string;
  grupo: string;
  tipo: string;
  isRepetir: boolean;
  vezesRepetir: number;
  valor: string | undefined;
  data: Date;
  situacao: boolean;

  static readonly COLLECTION_NAME: string = "lancamentos";

  constructor() {
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
