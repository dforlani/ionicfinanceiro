import firebase from "firebase";
import { Boleto } from "../pages/models/Boleto";

export class FirebaseBoleto {
  
  salvar(boleto: Boleto) {
    
    let collectionRef = firebase
      .firestore()
      .collection(Boleto.COLLECTION_NAME);

    if (boleto.key) {
      //se tem key, é um item pra editar
      console.log('edica', boleto.key);
      
      collectionRef
        .doc(boleto.key)
        .set({...boleto, valor: Number(boleto.valor), vezesRepetir: Number(boleto.vezesRepetir)}, { merge: true })
        .catch((error) => console.log(error))
        .then((sucesso) => console.log(sucesso));
    } else {
      console.log('inserir', boleto.key);
      //senão, é um item pra adicionar
      collectionRef.add(boleto.toArray(boleto)) 
      .catch((error) => console.log(error))
      .then((sucesso) => console.log(sucesso));;
    }
  }

  /**
   *
   * @param boleto Remove um boleto utilizando o seu código de documento em Key
   */
  remover(boleto: Boleto) {
    firebase
      .firestore()
      .collection(Boleto.COLLECTION_NAME)
      .doc(boleto.key)
      .delete();
  }

  /**
   * Consulta na base de dados por um tipo específico de boleto.   
   */
  listarTodosByTipo(tipo: string): firebase.firestore.Query {
    return (
      firebase
        .firestore()
        .collection(Boleto.COLLECTION_NAME)

        //workround pra fazer funcionar a consulta
        .where("tipo", ">=", tipo)
        .where("tipo", "<=", tipo + "\uf8ff")
        .orderBy("tipo", "desc")
    );
  }

  /**
   * Consulta na base de dados por lançamentos recebidos em um período de tempo
   */
  listarRecebidosByData(
    dataInicial: Date,
    dataFinal: Date
  ): firebase.firestore.Query {
    return firebase
      .firestore()
      .collection(Boleto.COLLECTION_NAME)     
      .where("data", ">=", dataInicial)
      .where("data", "<=", dataFinal)

      .orderBy("data", "asc");
  }

  /**
   * Consulta na base de dados por lançamentos pagos em um período de tempo
   */
  listarDespesasByData(
    dataInicial: Date,
    dataFinal: Date
  ): firebase.firestore.Query {
    return firebase
      .firestore()
      .collection(Boleto.COLLECTION_NAME)  
      .where("data", ">=", dataInicial)
      .where("data", "<=", dataFinal)

      .orderBy("data", "asc");
  }

  /**
   * Busca por 1 lançamento
   * @param key
   */
  buscar(
    key: string
  ): firebase.firestore.DocumentReference<firebase.firestore.DocumentData> {
    return firebase.firestore().collection(Boleto.COLLECTION_NAME).doc(key);
  }
}
