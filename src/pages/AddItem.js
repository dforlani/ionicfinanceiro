import React, { useState, useEffect } from "react";

import { useDocument } from "react-firebase-hooks/firestore";

import firebase from "firebase";

import { IonItem, IonInput, IonButton } from "@ionic/react";

export default function AddItem({ initialValue, clear }) {
  const [item, setitem] = useState("");

  const [value, loading, error] = useDocument(
    firebase.firestore().doc("items/" + initialValue),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    !loading && initialValue && value.exists && setitem(value.data().name);
  }, [loading, initialValue, value]);
  const onSave = async () => {
    let collectionRef = firebase.firestore().collection("items");
    console.log("entrou");
    console.log(initialValue);
    if (initialValue) {
      //se tem initialValue, é um item pra editar
      console.log("entrou2");
      await collectionRef
        .doc(initialValue)
        .set({ name: item, createdOn: new Date().getTime() }, { merge: true })
        .catch((error) => console.log(error))
        .then((sucesso) => console.log(sucesso));
      setitem("");
      clear();
    } else {
      //senão, é um item pra adicionar
      await collectionRef.add({ name: item, createdOn: new Date().getTime() });
      setitem("");
      clear();
    }
  };
  return (
    <>
      {" "}
      <IonItem>
        <IonInput value={item} onInput={(e) => setitem(e.target.value)} />
      </IonItem>
      <IonButton onClick={onSave}>Save</IonButton>
      <IonButton
        onClick={() => {
          setitem("");
          clear();
        }}
      >
        Clear
      </IonButton>
      <div>
        <p>
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {loading && <span>Document: Loading...</span>}
          {value && <span>Document: {JSON.stringify(value.data())}</span>}
        </p>
      </div>
    </>
  );
}
