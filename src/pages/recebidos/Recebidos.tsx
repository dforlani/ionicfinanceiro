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
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../../components/ExploreContainer";
import "./Recebidos.css";
import { addOutline, arrowForwardCircle, chevronBack, chevronForward } from "ionicons/icons";

const Recebidos: React.FC = () => {
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
       

        <IonFab vertical="bottom"  horizontal="end" slot="fixed">
          <IonFabButton routerLink='/formrecebidos' color='success'>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Recebidos;
