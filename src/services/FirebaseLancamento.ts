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
      // setitem("");
      // clear();
    } else {
      //senão, é um item pra adicionar
      collectionRef.add(JSON.parse(JSON.stringify(lancamento)));
      //   setitem("");
      //   clear();
    }
  }

  remover(lancamento: Lancamento) {
    firebase
      .firestore()
      .collection(Lancamento.COLLECTION_NAME)
      .doc(lancamento.key)
      .delete();
  }

  listarTodos(lista:Lancamento[]) {
    console.log("listar");

    return firebase
      .firestore()
      .collection(Lancamento.COLLECTION_NAME)
      .orderBy("data", "desc");
      
  }

  // listarTodos(lista:Lancamento[]) {
  //   console.log("listar");

  //   firebase
  //     .firestore()
  //     .collection(Lancamento.COLLECTION_NAME)
  //     .orderBy("data", "desc")
  //     .get()
  //     .then(function (querySnapshot) {
  //       console.log("respondeu");
  //       lista = querySnapshot.docs.map(doc => doc.data() as Lancamento);
  //       console.log(lista);
  //       // querySnapshot.forEach(function (doc) {
  //       //   lista.push(doc);
  //       //   // doc.data() is never undefined for query doc snapshots
  //       //   console.log(doc.id, " => ", doc.data());
  //       // });
  //     })
  //     .catch(function (error) {
  //       console.log("Error getting documents: ", error);
  //     });
  // }
}
