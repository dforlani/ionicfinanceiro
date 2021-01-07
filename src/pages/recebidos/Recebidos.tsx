import React, { useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../../components/ExploreContainer";
import "./Recebidos.css";
import {
  addOutline,
  arrowForwardCircle,
  chevronBack,
  chevronForward,
} from "ionicons/icons";
import Item from "../Item";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "firebase";
import { FirebaseLancamento } from "../../services/FirebaseLancamento";
import { Lancamento } from "../models/Lancamento";
import { Route } from "react-router";
import FormRecebidos from "./form/FormRecebidos";
import MyModal from "./form/MyModal";



const Recebidos: React.FC = () => {
  let fb: FirebaseLancamento = new FirebaseLancamento();

  const [value, loading] = useCollection(fb.listarTodosByTipo(Lancamento.TIPO_RECEBIDO), {
    snapshotListenOptions: { includeMetadataChanges: true }, 
  });

  const [showModal, setShowModal] = useState(false);
  const [lancamento, setLancamento] = useState(new Lancamento());

  //esta tela vai salvar os lançamentos como recebidos
  lancamento.tipo = Lancamento.TIPO_RECEBIDO;

  const abrirFormRecebido = (lanc: Lancamento) => {
    console.log("alterar");
    setLancamento(lanc);
    console.log("alterarLancamento ", lanc.valor);
    setShowModal(true);
  };

  const closeModal = () => {
    console.log("fecha");
    setShowModal(false);
  };

  console.log("value");
  console.log(value);
  console.log("value2");
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Recebidos</IonTitle>
        </IonToolbar>
        <IonToolbar color="success">
          <IonItem lines="none" color="success">
            <IonIcon icon={chevronBack} slot="start" />
            <IonLabel class="ion-text-center">Setembro</IonLabel>
            <IonIcon icon={chevronForward} slot="end" />
          </IonItem>
          <h2>
            <IonGrid>
              <IonRow>
                <IonCol class="ion-text-center">Saldo do mês</IonCol>
              </IonRow>
              <IonRow>
                <IonCol class="ion-text-center"> R$ 100,00</IonCol>
              </IonRow>
            </IonGrid>
          </h2>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonModal isOpen={showModal} cssClass="my-custom-class">
          <FormRecebidos
            // ={"oi"}
            doc={lancamento}
            doClose={() => {
              console.log("recebidos doClose");
              closeModal();
            }}
      
          />
        </IonModal>

        <IonList id="listaLancamento">
          {!loading && value &&
            value.docs.map((doc:any) => {
              let auxLancamento:Lancamento;
              auxLancamento = doc.data();

              //atribui a key pra termos o código de documento, o que vai facilitar na remoção e edição
              auxLancamento.key = doc.id; 
              auxLancamento.tipo = Lancamento.TIPO_RECEBIDO;
              
              return (
                <IonItem onClick={() => abrirFormRecebido(auxLancamento)}>                  
                  <IonLabel>
                    <h5>{doc.data().titulo}</h5>
                    <p>{doc.data().grupo}</p>                   
                  </IonLabel>
                  <h5>{doc.data().valor} </h5>
                </IonItem>
              );
            })}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => abrirFormRecebido(new Lancamento())} color="success">
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Recebidos;
