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


import "./FormRecebidos.css";
import {
  saveOutline,
  trashOutline,
} from "ionicons/icons";
import { FirebaseLancamento } from "../../../services/FirebaseLancamento";
import { Lancamento } from "../../models/Lancamento";

const FormRecebidos: React.FC<{ lancamentoEdit: Lancamento }> = ({lancamentoEdit}) => {
  let auxLanc;
  if(lancamentoEdit == undefined){
    auxLanc = new Lancamento();
  }else{
    auxLanc = lancamentoEdit;
  }

  const [lancamento, setLancamento] = useState<Lancamento>(auxLanc);

  const setLancamentoIdentificado = (event: CustomEvent, id: string) => {
    setLancamento((prevLancamento) => ({
      ...prevLancamento,
      [id]: event.detail.value!,
    }));    
  };

  const [dataRecebimento, setDataRecebimento] = useState<string>();

  // const [valor, setValor] = useState<string>();

  // const [titulo, setTitulo] = useState<string>();

  // const [grupo, setGrupo] = useState<string>();

  // const [tipo, setTipo] = useState<string>("recebido");

  // const [vezesRepetir, setVezesRepetir] = useState<number>();

  // const [isRepetir, setIsRepetir] = useState<boolean>();

  //FUNÇÕES DO BANCO DE DADOS
  const [showAlert, setShowAlert] = useState(false);

  const salvarRecebido = () => {
    console.log("oi");
    try {
      let fb: FirebaseLancamento = new FirebaseLancamento();
      fb.salvar(lancamento);
      window.history.back();
    } catch (e) {
      setShowAlert(true);
      console.log("please use a device: ", e);
    }
  };

  
  // FIM DAS FUNÇÕES DO BANCO DE DADOS

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Novo Recebido</IonTitle>

          <IonButtons slot="end">
            <IonButton>
              <IonIcon color="danger" icon={trashOutline} />
            </IonButton>
            <IonButton onClick={() => salvarRecebido()}>
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
            value={dataRecebimento}
            placeholder="Data"
            onIonChange={(e) => setDataRecebimento(e.detail.value!)}
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
};

export default FormRecebidos;
