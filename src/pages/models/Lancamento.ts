export class Lancamento {
  key: string;
  titulo: string;
  grupo: string;
  tipo: string;
  isRepetir: boolean;
  vezesRepetir: number |undefined;
  valor: number | undefined;
  data: Date;  
  situacao: boolean;

  static readonly COLLECTION_NAME: string = "lancamentos";
  static readonly TIPO_RECEBIDO: string = "recebido";
  static readonly TIPO_A_RECEBER: string = "a_receber";
  static readonly TIPO_PAGA: string = "pago";
  static readonly TIPO_A_PAGAR: string = "a_pagar";

  constructor() {
    this.key = "";
    this.titulo = "";
    this.grupo = "";
    this.tipo = "";
    this.isRepetir = false;
    this.vezesRepetir = undefined;
    this.valor = undefined;
    this.data = new Date();
    this.situacao = false;
  }

   toArray = (lancamento:Lancamento) => {
    
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

  isNovoLancamento = ():boolean =>{
    return this.key == '' || this.key == undefined;
  }



}
