import React, { useEffect, useState } from "react";

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
// import FormDespesas from "./FormDespesas copy";
import Props from "../Props";
import { RouteComponentProps } from "react-router";

const FormDespesas: React.FC<RouteComponentProps> = ({ match }) => {
  console.log("key: ", (match.params as Props).lancamento_key);
  const [lancamento, setLancamento] = useState<Lancamento>(new Lancamento());
  let lancamento_key = (match.params as Props).lancamento_key;

  //Vai buscar o lancamento, caso ele venha de uma alteração
  useEffect(() => {
    if (lancamento_key != "novo") {
      let fb: FirebaseLancamento = new FirebaseLancamento();
      let docRef = fb.buscar(lancamento_key);
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            let aux = doc.data() as Lancamento;
            aux.data = new Date(doc.data()?.data.seconds * 1000);
            aux.key = doc.id;
            setLancamento(aux);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    } else {
      setLancamento({ ...new Lancamento(), tipo: Lancamento.TIPO_PAGA });
    }
  }, [lancamento_key]); //colocar a key no array, pra ele executar sempre que a key mudar

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
      console.log("1");

      let repetir = 0;
      //faz um clone, pq o firebase demora pra salvar e a variável pode acaber sendo alterada
      let lancamento_clone = { ...lancamento };
      if (
        (lancamento_clone.key == "" || lancamento_clone.key == undefined) &&
        lancamento_clone.vezesRepetir != undefined &&
        !isNaN(lancamento_clone.vezesRepetir)
      ) {
        console.log("2");

        repetir = lancamento_clone.vezesRepetir - 1;
      }
      console.log(repetir);

      for (let i = 0; i <= repetir; i++) {
        let fb: FirebaseLancamento = new FirebaseLancamento();
        fb.salvar(lancamento_clone);
        console.log("3");
        //altera o lancamento pro próximo mês, pro caso de precisar repetir
        lancamento_clone = { ...lancamento_clone };
        lancamento_clone.data = new Date(
          lancamento_clone.data.getFullYear(),
          lancamento_clone.data.getMonth() + 1,
          lancamento_clone.data.getDate()
        );
      }

      window.history.back();
    } catch (e) {
      console.log(e);
      setShowAlert(true);
    }
  };

  const removerDespesa = () => {
    try {
      let fb: FirebaseLancamento = new FirebaseLancamento();
      fb.remover(lancamento);
      window.history.back();
    } catch (e) {
      setShowConfirmDialog(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
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

        {lancamento.key == "" || lancamento.key == undefined ? (
          <IonItem>
            <IonLabel>Repetir?</IonLabel>
            <IonToggle
              checked={lancamento.isRepetir}
              onIonChange={(e) => {
                setLancamentoIdentificado(e, "isRepetir");
              }}
              color="primary"
            />
          </IonItem>
        ) : (
          <></>
        )}

        {(lancamento.key == "" || lancamento.key == undefined) &&
        lancamento.isRepetir ? (
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
          message={"Ocorreu um erro."}
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};
export default FormDespesas;
