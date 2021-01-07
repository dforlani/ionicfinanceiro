import React, { useState } from "react";



import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonListHeader,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";

import { document, trash } from "ionicons/icons";
import { FirebaseLancamento } from "../../../services/FirebaseLancamento";
import { Lancamento } from "../../models/Lancamento";

import {
  saveOutline,
  trashOutline,
} from "ionicons/icons";

interface Props {
  doClose:Function
}


export default function MyModal(props:Props) {
  const [lancamento, setLancamento] = useState<Lancamento>(new Lancamento());

  const setLancamentoIdentificado = (event: CustomEvent, id: string) => {
    setLancamento((prevLancamento) => ({
      ...prevLancamento,
      [id]: event.detail.value!,
    }));    
  };

  const [showAlert, setShowAlert] = useState(false);

  const inserirRecebido = () => {
    console.log("oi");
    try {
      let fb: FirebaseLancamento = new FirebaseLancamento();
      fb.salvar(lancamento);
      props.doClose();      
      
    } catch (e) {
      setShowAlert(true);
      console.log("please use a device: ", e);
    }
  };

  
  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
        <IonTitle>Novo Recebido</IonTitle>

        <IonButtons slot="end">
          <IonButton onClick={() => props.doClose()}>
            <IonIcon color="danger" icon={trashOutline} />
          </IonButton>
          <IonButton  onClick={()=> inserirRecebido()}  >
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
          onIonChange={(e) => setLancamentoIdentificado(e, "titulo")}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonLabel>Grupo</IonLabel>
        <IonSelect
          placeholder="Grupo"
          value={lancamento.grupo}
          onIonChange={(e) => setLancamentoIdentificado(e, "grupo")}
        >
          <IonSelectOption value="casa">Casa</IonSelectOption>
          <IonSelectOption value="mercado">Mercado</IonSelectOption>
          <IonSelectOption value="estudo">Estudo</IonSelectOption>
        </IonSelect>
      </IonItem>

      <IonRadioGroup
        value={lancamento.tipo}
        onIonChange={(e) => setLancamentoIdentificado(e, "tipo")}
      >
        <IonListHeader>
          <IonLabel>Tipo</IonLabel>
        </IonListHeader>

        <IonItem>
          <IonLabel>Recebido</IonLabel>
          <IonRadio slot="start" value="recebido" />
        </IonItem>

        <IonItem>
          <IonLabel>À Receber</IonLabel>
          <IonRadio slot="start" value="a_receber" />
        </IonItem>
      </IonRadioGroup>

      <IonItem>
        <IonLabel>Repetir?</IonLabel>
        <IonToggle
          checked={lancamento.isRepetir}
          onIonChange={(e) => setLancamentoIdentificado(e, "isRepetir")}
          color="primary"
        />
      </IonItem>
      {lancamento.isRepetir ? (
        <IonItem>
          <IonLabel position="floating">Quantas Vezes?</IonLabel>
          <IonInput
            type="number"
            value={lancamento.vezesRepetir}
            onIonChange={(e) => setLancamentoIdentificado(e, "vezesRepetir")}
          ></IonInput>
        </IonItem>
      ) : (
        console.log("toi")
      )}

      <IonItem>
        <IonLabel position="floating">Valor</IonLabel>
        <IonInput
          type="number"
          value={lancamento.valor}
          onIonChange={(e) => setLancamentoIdentificado(e, "valor")}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel>Data do Recebimento</IonLabel>
        <IonDatetime
          displayFormat="DD/MM/YYYY"
          value={lancamento.data}
          placeholder="Data"
          onIonChange={(e) => setLancamentoIdentificado(e, "data")}
        ></IonDatetime>
      </IonItem>

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"Mamma mia!"}
        message={
          "This will only work on a device. Please refer to the README."
        }
        buttons={["OK"]}
      />
    </IonContent>
  </IonPage>
  );
}


