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

export default function FormDespesas(props: Props) {
  const [lancamento, setLancamento] = useState<Lancamento>(props.doc);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const setLancamentoIdentificado = (event: CustomEvent, id: string) => {
    if (id == "data") {
      setLancamento((prevLancamento) => ({
        ...prevLancamento,
        [id]: new Date(event.detail.value),
      }));
    } else if (id == "isRepetir") {
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

  const [showAlert, setShowAlert] = useState(false);

  const inserirDespesa = () => {
    try {
      let repetir = 0;
      //faz um clone, pq o firebase demora pra salvar e a variável pode acaber sendo alterada
      let lancamento_clone = {...lancamento};
      if ((lancamento_clone.key == '' || lancamento_clone.key == undefined) && lancamento_clone.vezesRepetir != undefined) {
        repetir = lancamento_clone.vezesRepetir - 1;
      }
      console.log(repetir);
      for (let i = 0; i <= repetir; i++) {
        console.log('salvar');
        let fb: FirebaseLancamento = new FirebaseLancamento();
        fb.salvar(lancamento_clone);
        //altera o lancamento pro próximo mês, pro caso de precisar repetir
        lancamento_clone = {...lancamento_clone};
        lancamento_clone.data = new Date(lancamento_clone.data.getFullYear(), lancamento_clone.data.getMonth() + 1, lancamento_clone.data.getDate());
      
      }
      
      props.doClose();
    } catch (e) {
      console.log(e);
      setShowAlert(true);
    }
  };

  const removerDespesa = () => {
    try {
      let fb: FirebaseLancamento = new FirebaseLancamento();
      fb.remover(lancamento);
      props.doClose();
    } catch (e) {
      setShowConfirmDialog(true);
    }
  };

  const fecharDespesa = () => {
    props.doClose();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => fecharDespesa()}>
              <IonIcon color="danger" icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>
            {lancamento.key ? (
              <IonLabel>Editar Despesa</IonLabel>
            ) : (
              <IonLabel>Nova Despesa</IonLabel>
            )}
          </IonTitle>

          <IonButtons slot="end">
            {lancamento.key && (
              <IonButton onClick={() => setShowConfirmDialog(true)}>
                <IonIcon color="danger" icon={trashOutline} />
              </IonButton>
            )}
            <IonButton onClick={() => inserirDespesa()}>
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
          message={"Confirma a remoção da Despesa?"}
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
                removerDespesa();
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
            <IonLabel>Paga</IonLabel>
            <IonRadio slot="start" value={Lancamento.TIPO_PAGA} />
          </IonItem>

          <IonItem>
            <IonLabel>À Pagar</IonLabel>
            <IonRadio slot="start" value={Lancamento.TIPO_A_PAGAR} />
          </IonItem>
        </IonRadioGroup>

        {lancamento.key == '' || lancamento.key == undefined ? (
        <IonItem>
          <IonLabel>Repetir?</IonLabel>
          <IonToggle
            checked={lancamento.isRepetir}
            onIonChange={(e) => {
              setLancamentoIdentificado(e, "isRepetir");
            }}
            color="primary"
          />
           </IonItem>) : (<></>)}
       
        {(lancamento.key == ''  || lancamento.key == undefined) && lancamento.isRepetir ? (
          <IonItem>
            <IonLabel position="floating">Quantas Vezes?</IonLabel>
            <IonInput
              type="number"
              value={lancamento.vezesRepetir}
              onIonChange={(e) => setLancamentoIdentificado(e, "vezesRepetir")}
            ></IonInput>
          </IonItem>
        ) : (
          <></>
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
          <IonLabel>Data do Pagamento</IonLabel>
          <IonDatetime
            displayFormat="DD/MM/YYYY"
            value={lancamento.data.toDateString()}
            placeholder="Data"
            onIonChange={(e) => setLancamentoIdentificado(e, "data")}
          ></IonDatetime>
        </IonItem>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Erro!"}
          message={
            "Ocorreu um erro."
          }
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
}
