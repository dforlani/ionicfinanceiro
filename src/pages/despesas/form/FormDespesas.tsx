import React, { useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./FormDespesas.css";
import {
  addOutline,
  chevronBack,
  chevronForward,
  save,
  saveOutline,
  text,
  trash,
  trashBin,
  trashOutline,
} from "ionicons/icons";
import { Lancamento } from "../../models/Lancamento";

const FormDespesas: React.FC = () => {
  const [lancamento, setLancamento] = useState<Lancamento>(new Lancamento());

  // const setLancamentoIdentificado = (event: CustomEvent, id: string) => {
  //   setLancamento((prevLancamento) => ({...prevLancamento,  [id]: event.detail.value!,   }));
  //   console.log(lancamento);
  // };

 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Nova Despesa</IonTitle>

          <IonButtons slot="end">
            <IonButton>
              <IonIcon color="danger" icon={trashOutline} />
            </IonButton>
            <IonButton>
              <IonIcon color="success" icon={saveOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel position="floating">Título</IonLabel>
          <IonInput
            value={lancamento.titulo}
            // onIonChange={(e) => setLancamentoIdentificado(e, "titulo")}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel>Grupo</IonLabel>
          <IonSelect
            value={lancamento.grupo}
            placeholder="Grupo"
            // onIonChange={(e) => setLancamentoIdentificado(e, "grupo")}
          >
            <IonSelectOption value="casa">Casa</IonSelectOption>
            <IonSelectOption value="mercado">Mercado</IonSelectOption>
            <IonSelectOption value="estudo">Estudo</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonList>
          <IonRadioGroup
            value={lancamento.tipo}
            // onIonChange={(e) => setLancamentoIdentificado(e, "tipo")}
          >
            <IonListHeader>
              <IonLabel>Tipo</IonLabel>
            </IonListHeader>

            <IonItem>
              <IonLabel>Pago</IonLabel>
              <IonRadio slot="start" value="pago" />
            </IonItem>

            <IonItem>
              <IonLabel>À pagar</IonLabel>
              <IonRadio slot="start" value="a_pagar" />
            </IonItem>
          </IonRadioGroup>
        </IonList>

        <IonItem>
          <IonLabel position="floating">Valor</IonLabel>
          <IonInput
            type="number"
            value={lancamento.valor}
            // onIonChange={(e) => setLancamentoIdentificado(e, "valor")}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Data do Pagamento</IonLabel>
          <IonDatetime
            displayFormat="DD/MM/YYYY"
            value={lancamento.data.toString()}
            placeholder="Data"
            // onIonChange={(e) => setLancamentoIdentificado(e, "data")}
          ></IonDatetime>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default FormDespesas;
