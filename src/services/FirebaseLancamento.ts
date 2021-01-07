import firebase from "firebase";
import { Lancamento } from "../pages/models/Lancamento";


export class FirebaseLancamento {
  salvar(lancamento: Lancamento) {
    let collectionRef = firebase
      .firestore()
      .collection(Lancamento.COLLECTION_NAME);
    console.log("entrou");
    console.log(JSON.stringify(lancamento));
    if (lancamento.key) {
      //se tem key, é um item pra editar
      console.log("entrou2");
      collectionRef
        .doc(lancamento.key)
        .set(lancamento, { merge: true })
        .catch((error) => console.log(error))
        .then((sucesso) => console.log(sucesso));
    } else {
      //senão, é um item pra adicionar
      //collectionRef.add(JSON.parse(JSON.stringify(lancamento)));
      console.log('titulo: ', lancamento.titulo);
      
      collectionRef.add(lancamento.toArray(lancamento));
    }
  }

  /**
   * 
   * @param lancamento Remove um lancamento utilizando o seu código de documento em Key
   */
  remover(lancamento: Lancamento) {
    firebase
      .firestore()
      .collection(Lancamento.COLLECTION_NAME)
      .doc(lancamento.key)
      .delete();
  }

  /**
   * Consulta na base de dados por um tipo específico de Lancamento.
   * Ver Lancamento.TIPO_RECEBIDO e Lancamento.TIPO_DESPESA
   */
  listarTodosByTipo(tipo:string):firebase.firestore.Query {
    return firebase
      .firestore()
      .collection(Lancamento.COLLECTION_NAME)

      //workround pra fazer funcionar a consulta
      .where('tipo', '>=', tipo).where('tipo', '<=', tipo+ '\uf8ff')
      .orderBy("tipo", "desc");      
  }

}
