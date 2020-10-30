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
import "./Despesa.css";
import { addOutline, chevronBack, chevronForward } from "ionicons/icons";

const Depesa: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Despesas</IonTitle>
        </IonToolbar>
        <IonToolbar color="danger">
          <IonItem lines="none" color="danger">
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
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonFab vertical="bottom"  horizontal="end" slot="fixed">
          <IonFabButton  routerLink='/formrdespesas' color='danger'>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Depesa;
