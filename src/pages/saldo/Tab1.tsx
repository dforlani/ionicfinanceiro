import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonRow,
  IonTabButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import {
  pin,
  wifi,
  wine,
  warning,
  walk,
  chevronBack,
  chevronForwardCircleOutline,
  chevronForward,
  triangle,
} from "ionicons/icons";
import ExploreContainer from "../../components/ExploreContainer";
import "./Tab1.css";

import Recebidos from "../recebidos/Recebidos";
import Depesa from "../despesas/Despesa";
import { Route, Redirect, Router } from "react-router";
import { IonReactRouter } from "@ionic/react-router";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ItemList from "../ItemList";
import AddItem from "../AddItem";

const Saldo: React.FC = () => {
  let history = useHistory();
  const chamarRecebidos = () => {
    history.push("/tab2");   
  };

  const chamarDespesas = () => {
    history.push("/tab3");   
  };

  const [current, setCurrent]= useState(null);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Financeiro</IonTitle>
        </IonToolbar>

        <IonToolbar color="primary">
          <IonItem lines="none" color="primary">
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
                <IonCol class="ion-text-center"> R$ 200,00</IonCol>
              </IonRow>
            </IonGrid>
          </h2>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard color="success" onClick={(e) => {
            e.preventDefault();
            chamarRecebidos();
          }}>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>Recebidos</IonCol>
                <IonCol class="ion-text-right">R$ 100,00</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>À Receber</IonCol>
                <IonCol class="ion-text-right">R$ 0,00</IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonCard color="danger"  onClick={(e) => {
            e.preventDefault();
            chamarDespesas();
          }}>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>Despesas</IonCol>
                <IonCol class="ion-text-right">R$ 0,00</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>À Pagar </IonCol>
                <IonCol class="ion-text-right"> R$ 0,00</IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonButton
         
        >

         Tab2
          
        </IonButton>

        <IonButton routerLink='/tab3'>tab3</IonButton>

        {}
        <IonCard>
          <IonCardHeader>
          <h3>Lista</h3>
          </IonCardHeader>
          <IonCardContent>
            <AddItem initialValue={current} clear={()=>setCurrent(null)}/>
          </IonCardContent>
          {}
          <ItemList doEdit={setCurrent}/>

        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Saldo;
