import React, { useEffect, useState } from "react";

import {
  IonAlert,
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
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonListHeader,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";

import { arrowBack, document, trash, camera } from "ionicons/icons";
import { FirebaseBoleto } from "../../../services/FirebaseBoleto";
import { Boleto } from "../../models/Boleto";

import { saveOutline, trashOutline } from "ionicons/icons";

import { RouteComponentProps } from "react-router";
import Props from "../Props";
import { usePhotoGallery } from "../../../components/usePhotoGallery";

const FormBoletos: React.FC<RouteComponentProps> = ({ match }) => {
  

  const [boleto, setBoleto] = useState<Boleto>(new Boleto());
  
  const { photo, takePhoto } = usePhotoGallery();
  let boleto_key = (match.params as Props).boleto_key;

  //Vai buscar o lancamento, caso ele venha de uma alteração
  useEffect(() => {
    if (boleto_key != "novo") {
      let fb: FirebaseBoleto = new FirebaseBoleto();
      let docRef = fb.buscar(boleto_key);
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            let aux = doc.data() as Boleto;
            aux.data = new Date(doc.data()?.data.seconds * 1000);
            aux.key = doc.id;
            setBoleto(aux);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  }, [boleto_key]); //colocar a key no array, pra ele executar sempre que a key mudar

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const setBoletoIdentificado = (event: CustomEvent, id: string) => {
    if (id == "data") {
      setBoleto((prevLancamento) => ({
        ...prevLancamento,
        [id]: new Date(event.detail.value),
      }));
    } else if (id == "isRepetir") {
      setBoleto((prevBoleto) => ({
        ...prevBoleto,
        [id]: event.detail.checked!,
      }));
    } else
      setBoleto((prevBoleto) => ({
        ...prevBoleto,
        [id]: event.detail.value!,
      }));
  };

  const [showAlert, setShowAlert] = useState(false);

  const inserirBoleto = () => {
    try {
      console.log("1");

      let repetir = 0;
      //faz um clone, pq o firebase demora pra salvar e a variável pode acaber sendo alterada
      let boleto_clone = { ...boleto };
      if (
        (boleto_clone.key == "" || boleto_clone.key == undefined) &&
        boleto_clone.vezesRepetir != undefined &&
        !isNaN(boleto_clone.vezesRepetir)
      ) {
        console.log("2");

        repetir = boleto_clone.vezesRepetir - 1;
      }
      console.log(repetir);

      for (let i = 0; i <= repetir; i++) {
        let fb: FirebaseBoleto = new FirebaseBoleto();
        fb.salvar(boleto_clone);
        console.log("3");
        //altera o lancamento pro próximo mês, pro caso de precisar repetir
        boleto_clone = { ...boleto_clone };
        boleto_clone.data = new Date(
          boleto_clone.data.getFullYear(),
          boleto_clone.data.getMonth() + 1,
          boleto_clone.data.getDate()
        );
      }

      window.history.back();
    } catch (e) {
      console.log(e);
      setShowAlert(true);
    }
  };

  const remover = () => {
    try {
      let fb: FirebaseBoleto = new FirebaseBoleto();
      fb.remover(boleto);
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
            {boleto.key ? (
              <IonLabel>Editar Boleto</IonLabel>
            ) : (
              <IonLabel>Novo Boleto</IonLabel>
            )}
          </IonTitle>

          <IonButtons slot="end">
            {boleto.key && (
              <IonButton onClick={() => setShowConfirmDialog(true)}>
                <IonIcon color="danger" icon={trashOutline} />
              </IonButton>
            )}
            <IonButton onClick={() => inserirBoleto()}>
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
          message={"Confirma a remoção do Boleto?"}
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
                remover();
              },
            },
          ]}
        />

        <IonItem>
          <IonLabel position="floating">Título</IonLabel>
          <IonInput
            value={boleto.titulo}
            onIonChange={(e) => setBoletoIdentificado(e, "titulo")}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel>Grupo</IonLabel>
          <IonSelect
            placeholder="Grupo"
            value={boleto.grupo}
            onIonChange={(e) => setBoletoIdentificado(e, "grupo")}
          >
            <IonSelectOption value="casa">Casa</IonSelectOption>
            <IonSelectOption value="mercado">Mercado</IonSelectOption>
            <IonSelectOption value="estudo">Estudo</IonSelectOption>
          </IonSelect>
        </IonItem>

        {boleto.key == "" || boleto.key == undefined ? (
          <IonItem>
            <IonLabel>Repetir?</IonLabel>
            <IonToggle
              checked={boleto.isDividido}
              onIonChange={(e) => {
                setBoletoIdentificado(e, "isRepetir");
              }}
              color="primary"
            />
          </IonItem>
        ) : (
          <></>
        )}

        {(boleto.key == "" || boleto.key == undefined) && boleto.isDividido ? (
          <IonItem>
            <IonLabel position="floating">Quantas Vezes?</IonLabel>
            <IonInput
              type="number"
              value={boleto.vezesRepetir}
              onIonChange={(e) => setBoletoIdentificado(e, "vezesRepetir")}
            ></IonInput>
          </IonItem>
        ) : (
          <></>
        )}

        <IonItem>
          <IonLabel position="floating">Valor</IonLabel>
          <IonInput
            type="number"
            value={boleto.valor}
            onIonChange={(e) => setBoletoIdentificado(e, "valor")}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Data do Vencimento</IonLabel>
          <IonDatetime
            displayFormat="DD/MM/YYYY"
            value={boleto.data.toDateString()}
            placeholder="Data"
            onIonChange={(e) => setBoletoIdentificado(e, "data")}
          ></IonDatetime>
        </IonItem>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Erro!"}
          message={"Ocorreu um erro."}
          buttons={["OK"]}
        />

        <IonButton onClick={() => takePhoto(setBoleto, boleto)} expand="full" fill="outline">
          <IonIcon slot="start" icon={camera} />
        </IonButton>
        <IonGrid>
          <IonRow>
            {boleto.foto != undefined && (
              <IonImg src={boleto.foto}/>
            )}            
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default FormBoletos;
