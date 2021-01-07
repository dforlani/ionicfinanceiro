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
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";

import { arrowBack, document, trash } from "ionicons/icons";
import { FirebaseLancamento } from "../../../services/FirebaseLancamento";
import { Lancamento } from "../../models/Lancamento";

import { saveOutline, trashOutline } from "ionicons/icons";

interface Props {
  doClose: Function;
  doc: Lancamento;
}

export default function FormRecebidos(props: Props) {
  const [lancamento, setLancamento] = useState<Lancamento>(props.doc);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const setLancamentoIdentificado = (event: CustomEvent, id: string) => {
    if (id == "isRepetir") {
      setLancamento((prevLancamento) => ({
        ...prevLancamento,
        [id]: event.detail.checked!,
      }));
    } else
      setLancamento((prevLancamento) => ({
        ...prevLancamento,
        [id]: event.detail.value!,
      }));
  };

  console.log("editar");
  console.log(props.doc.key);

  const [showAlert, setShowAlert] = useState(false);

  const inserirRecebido = () => {
    console.log("oi");
    try {
      let fb: FirebaseLancamento = new FirebaseLancamento();
      fb.salvar(lancamento);
      props.doClose();
    } catch (e) {
      setShowConfirmDialog(true);
      console.log("please use a device: ", e);
    }
  };

  const removerRecebido = () => {
    console.log("removendo");
    try {
      let fb: FirebaseLancamento = new FirebaseLancamento();
      fb.remover(lancamento);
      props.doClose();
    } catch (e) {
      setShowConfirmDialog(true);
      console.log("please use a device: ", e);
    }
  };

  const fecharRecebido = () => {
    props.doClose();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => fecharRecebido()}>
              <IonIcon color="danger" icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>
            {lancamento.key ? (
              <IonLabel>Editar Recebido</IonLabel>
            ) : (
              <IonLabel>Novo Recebido</IonLabel>
            )}
          </IonTitle>

          <IonButtons slot="end">
            {lancamento.key && (
              <IonButton onClick={() => setShowConfirmDialog(true)}>
                <IonIcon color="danger" icon={trashOutline} />
              </IonButton>
            )}
            <IonButton onClick={() => inserirRecebido()}>
              <IonIcon color="success" icon={saveOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonAlert
          isOpen={showConfirmDialog}
          onDidDismiss={() => setShowConfirmDialog(false)}
          header={"Remoção"}
          message={"Confirma a remoção do Recebimento?"}
          buttons={[
            {
              text: "Cancelar",
              role: "cancel",
              cssClass: "secondary",
              handler: (blah) => {
                console.log("Confirm Cancel: cancelou");
              },
            },
            {
              text: "Confirmar",
              handler: () => {
                removerRecebido();
              },
            },
          ]}
        />

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
            onIonChange={(e) => {
              console.log("repetir:", e.detail.checked);
              setLancamentoIdentificado(e, "isRepetir");
            }}
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
