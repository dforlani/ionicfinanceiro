import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonRow,
  IonTabButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import {
  pin,
  wifi,
  wine,
  warning,
  walk,
  chevronBack,
  chevronForwardCircleOutline,
  chevronForward,
  triangle,
} from "ionicons/icons";
import ExploreContainer from "../../components/ExploreContainer";
import "./Tab1.css";

import Recebidos from "../recebidos/Recebidos";
import Depesa from "../despesas/Despesa";
import { Route, Redirect, Router } from "react-router";
import { IonReactRouter } from "@ionic/react-router";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ItemList from "../ItemList";
import AddItem from "../AddItem";
import { Calendario } from "../models/Calendario";
import { FirebaseLancamento } from "../../services/FirebaseLancamento";
import { Lancamento } from "../models/Lancamento";

const Saldo: React.FC = () => {
  let history = useHistory();
  const chamarRecebidos = () => {
    history.push("/tab2");
  };

  const chamarDespesas = () => {
    history.push("/tab3");
  };

  let fb: FirebaseLancamento = new FirebaseLancamento();
  const [calendario, setCalendario] = useState<Calendario>(new Calendario());
  const [saldoMes, setSaldoMes] = useState(Number());
  const [recebidosMes, setRecebidosMes] = useState(Number());
  const [aReceberMes, setAReceberMes] = useState(Number());

  const [pagosMes, setPagosMes] = useState(Number());
  const [aPagarMes, setAPagarMes] = useState(Number());

  const calculaSaldos = () => {
    //RECEBIDOS
    let somaRecebido = 0;
    let somaAReceber = 0;
    let somaPago = 0;
    let somaAPagar = 0;

    fb.listarRecebidosByData(
      calendario.getDatePrimeiroDiaMes(),
      calendario.getDateUltimoDiaMes()
    )
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots

          if (!isNaN(doc.data().valor)) {
            if(doc.data().tipo == Lancamento.TIPO_RECEBIDO)
              somaRecebido += doc.data().valor;
              else
              somaAReceber += doc.data().valor;
          }
        });
        setRecebidosMes(somaRecebido);
        setAReceberMes(somaAReceber);
        //setSaldoMes(somaAReceber + somaRecebido - somaPago - somaAPagar);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

      //PAGOS
      fb.listarDespesasByData(
        calendario.getDatePrimeiroDiaMes(),
        calendario.getDateUltimoDiaMes()
      )
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
  
            if (!isNaN(doc.data().valor)) {
              if(doc.data().tipo == Lancamento.TIPO_PAGA)
                somaPago += doc.data().valor;
                else
                somaAPagar += doc.data().valor;
            }
          });
          setPagosMes(somaPago);
          setAPagarMes(somaAPagar);
          setSaldoMes(somaAReceber + somaRecebido - somaPago - somaAPagar);
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
  };

  calculaSaldos();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Financeiro</IonTitle>
        </IonToolbar>

        <IonToolbar color="primary">
          <IonItem lines="none" color="primary">
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
                <IonCol class="ion-text-center"> R$ {saldoMes}</IonCol>
              </IonRow>
            </IonGrid>
          </h2>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* CARD RECEBIDOS */}
        <IonCard
          color="success"
          onClick={(e) => {
            e.preventDefault();
            chamarRecebidos();
          }}
        >
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>Recebidos</IonCol>
                <IonCol class="ion-text-right">R$ {recebidosMes}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>À Receber</IonCol>
                <IonCol class="ion-text-right">R$ {aReceberMes}</IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* CARD PAGOS */}
        <IonCard
          color="danger"
          onClick={(e) => {
            e.preventDefault();
            chamarDespesas();
          }}
        >
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>Pagos</IonCol>
                <IonCol class="ion-text-right">R$ {pagosMes}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>À Pagar</IonCol>
                <IonCol class="ion-text-right">R$ {aPagarMes}</IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Saldo;
