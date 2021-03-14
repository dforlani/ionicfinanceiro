import React, { useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRouterOutlet,
  IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Boletos.css";
import { Timestamp } from "@google-cloud/firestore";
import {
  camera,
  addOutline,
  checkmarkDoneOutline,
  checkmarkOutline,
  chevronBack,
  chevronForward,
  triangle,
} from "ionicons/icons";
import { useCollection } from "react-firebase-hooks/firestore";
import { FirebaseBoleto } from "../../services/FirebaseBoleto";
import { Boleto } from "../models/Boleto";
import FormRecebidos from "./form/FormBoletos";
import { Calendario } from "../models/Calendario";
import { isConstructorDeclaration } from "typescript";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";

const Boletos: React.FC = () => {
  let fb: FirebaseBoleto = new FirebaseBoleto();

  const [calendario, setCalendario] = useState<Calendario>(new Calendario());
  const [value, loading] = useCollection(
    fb.listarRecebidosByData(
      calendario.getDatePrimeiroDiaMes(),
      calendario.getDateUltimoDiaMes()
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [currency, setCurrency] = useState<string>("BRL");

  const [showModal, setShowModal] = useState(false);
  const [saldoMes, setSaldoMes] = useState(Number());
  const [boleto, setBoleto] = useState(new Boleto());

  const abrirFormBoletos = (lanc: Boleto) => {
    setBoleto(lanc);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const calculaSomaMes = () => {
    let soma = 0;
    fb.listarRecebidosByData(
      calendario.getDatePrimeiroDiaMes(),
      calendario.getDateUltimoDiaMes()
    )
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          soma = soma + 1;
        });
        setSaldoMes(soma);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };

  calculaSomaMes();

  const estilo_boleto = {
    color: "green",
    marginRight: "10px",
  } as React.CSSProperties;

  const fotoClass = {
    height: "50px",
  } as React.CSSProperties;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Boletos</IonTitle>
        </IonToolbar>
        <IonToolbar color="warning">
          <IonItem lines="none" color="warning">
            <IonIcon
              icon={chevronBack}
              slot="start"
              onClick={() => {
                setCalendario({ ...calendario.getAnteriorCalendario() });
              }}
            />
            <IonLabel class="ion-text-center">
              {calendario.mesSelecionado + "/" + calendario.anoSelecionado}
            </IonLabel>
            <IonIcon
              icon={chevronForward}
              slot="end"
              onClick={() => {
                setCalendario({ ...calendario.getProximoCalendario() });
              }}
            />
          </IonItem>
          <h2>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonRow>
                    <IonCol class="ion-text-center">Quantidade</IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol class="ion-text-center">
                      {saldoMes}
                      {/* {new Intl.NumberFormat("br", {
                        style: "currency",
                        currency: currency,
                      }).format(saldoMes)} */}
                    </IonCol>
                  </IonRow>
                </IonCol>
                <IonCol>
                  <IonFab
                    vertical="center"
                    horizontal="start"
                    slot="fixed"
                    edge
                  >
                    <IonFabButton
                      routerLink={`/formboletos/novo`}
                      color="success"
                    >
                      <IonIcon icon={addOutline} />
                    </IonFabButton>
                  </IonFab>
                  <IonFab vertical="center" horizontal="end">
                    <IonFabButton
                      routerLink={`/formboletos/novo`}
                      color="light"
                    >
                      <IonIcon icon={addOutline} />
                    </IonFabButton>
                  </IonFab>
                </IonCol>
              </IonRow>
            </IonGrid>
          </h2>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Boleto</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList id="listaLancamento">
          {!loading &&
            value &&
            value.docs.map((doc: any) => {
              let auxBoleto: Boleto;
              auxBoleto = doc.data();
              //workaround pra converter do formato Timestamp que vem do Firestore
              if (doc.data().data != undefined) {
                auxBoleto.data = new Date(doc.data().data.seconds * 1000);
              }

              //atribui a key pra termos o código de documento, o que vai facilitar na remoção e edição
              auxBoleto.key = doc.id;

              return (
                <IonItem
                  routerLink={`/formboletos/${auxBoleto.key}`}
                  onClick={(lanc) => {
                    setBoleto(auxBoleto);
                  }}
                >
                  <IonRow>
                    <IonCol>
                      <IonLabel>
                        <h5>
                          <span style={estilo_boleto}>
                            {auxBoleto.data.getDate()}
                          </span>
                          <span>{auxBoleto.titulo}</span>
                        </h5>
                        <p>{auxBoleto.grupo}</p>
                      </IonLabel>

                      <h5>
                        {new Intl.NumberFormat("br", {
                          style: "currency",
                          currency: currency,
                        }).format(doc.data().valor)}{" "}
                      </h5>
                    </IonCol>
                    <IonCol>
                      <IonImg style={fotoClass} src={auxBoleto.foto} />
                    </IonCol>
                  </IonRow>
                </IonItem>
              );
            })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Boletos;
