import React, { useState } from "react";
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
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Despesa.css";
import { Timestamp} from '@google-cloud/firestore';
import { addOutline, checkmarkDoneOutline, checkmarkOutline, chevronBack, chevronForward } from "ionicons/icons";
import { useCollection } from "react-firebase-hooks/firestore";
import { FirebaseLancamento } from "../../services/FirebaseLancamento";
import { Lancamento } from "../models/Lancamento";
import FormDespesas from "./form/FormDespesas";
import { Calendario } from "../models/Calendario";
import { isConstructorDeclaration } from "typescript";

const Despesas: React.FC = () => {
  let fb: FirebaseLancamento = new FirebaseLancamento();
  
  const [calendario, setCalendario] = useState<Calendario>(new Calendario());
  const [value, loading] = useCollection(
    fb.listarDespesasByData(calendario.getDatePrimeiroDiaMes(), calendario.getDateUltimoDiaMes()),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [showModal, setShowModal] = useState(false);
  const [saldoMes, setSaldoMes] = useState(Number());
  const [lancamento, setLancamento] = useState(new Lancamento());
  //esta tela vai salvar os lançamentos como despesas
  if(lancamento.key == '' || lancamento.key == undefined)  
    lancamento.tipo = Lancamento.TIPO_PAGA;

  const abrirFormDespesa = (lanc: Lancamento) => {
    setLancamento(lanc);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const calculaSomaMes = () => {
    let soma = 0;
    fb.listarDespesasByData(calendario.getDatePrimeiroDiaMes(), calendario.getDateUltimoDiaMes())
      .get()
      .then(function (querySnapshot) {
        
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          
          if (!isNaN(doc.data().valor)) {
            soma += doc.data().valor;
          }
        });
        setSaldoMes(soma);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };

  calculaSomaMes();

  const estilo_despesa = {
    color: 'green',
    marginRight:'10px',
 } as React.CSSProperties;

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
            <IonIcon icon={chevronBack} slot="start" onClick={() => {setCalendario({...calendario.getAnteriorCalendario()})}} />
            <IonLabel class="ion-text-center">
              {calendario.mesSelecionado + "/" + calendario.anoSelecionado}
            </IonLabel>
            <IonIcon
              icon={chevronForward}
              slot="end"
              onClick={() => {setCalendario({...calendario.getProximoCalendario()})}}
            />
          </IonItem>
          <h2>
            <IonGrid>
              <IonRow>
                <IonCol class="ion-text-center">Despesas do mês</IonCol>
              </IonRow>
              <IonRow>
                <IonCol class="ion-text-center"> R$ {saldoMes}</IonCol>
              </IonRow>
            </IonGrid>
          </h2>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonModal isOpen={showModal} cssClass="my-custom-class">
          <FormDespesas            
            doc={lancamento}
            doClose={() => {
              closeModal();
            }}
          />
        </IonModal>

        <IonList id="listaLancamento">
          {!loading &&
            value &&
            value.docs.map((doc: any) => {
              let auxLancamento: Lancamento;
              auxLancamento = doc.data();
              //workaround pra converter do formato Timestamp que vem do Firestore
              if( doc.data().data != undefined){                
                auxLancamento.data =  new Date(doc.data().data.seconds*1000);         
              }

              //atribui a key pra termos o código de documento, o que vai facilitar na remoção e edição
              auxLancamento.key = doc.id;

              return (
                <IonItem onClick={() => abrirFormDespesa(auxLancamento)}>
                  <IonLabel>
                    <h5><span style={estilo_despesa}>{auxLancamento.data.getDate()}</span><span>{auxLancamento.titulo}</span></h5>
                    <p>{auxLancamento.grupo}</p>                    
                  </IonLabel>

                  <h5>{doc.data().valor} </h5>
                  <IonIcon icon={auxLancamento.tipo == Lancamento.TIPO_PAGA? checkmarkDoneOutline: checkmarkOutline} />
                </IonItem>
              );
            })}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton
            onClick={() => abrirFormDespesa(new Lancamento())}
            color="danger"
          >
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Despesas;
