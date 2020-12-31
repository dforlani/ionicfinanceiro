import React from "react";
import {
  IonBackButton,
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

const listaLancamentos: Lancamento[] = [];

const Recebidos: React.FC = () => {
  let fb: FirebaseLancamento = new FirebaseLancamento();

  const [value, loading] = useCollection(fb.listarTodos(listaLancamentos), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const alterarLancamento = (lanc: Lancamento) => {
    console.log("alterar");
    return (
      <Route
        exact
        path="/formrecebidos"
        
        render={(props) => {
          return <FormRecebidos lancamentoEdit={lanc} {...props} />;
        }}
      />
    );
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

        <IonList id="listaLancamento">
          {value &&
            value.docs.map((doc: any) => {
              //retorna doc.data() com Lancamento
              return (
                <IonItem onClick={() => alterarLancamento(doc.data().key)}>
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
          <IonFabButton routerLink="/formrecebidos" color="success">
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Recebidos;
