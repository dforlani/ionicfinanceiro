import React, { useState } from "react";
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
  IonToggle,
  IonToolbar,
} from "@ionic/react";

import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

import "./FormRecebidos.css";
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

const FormRecebidos: React.FC = () => {
  const [dataRecebimento, setDataRecebimento] = useState<string>();

  const [valor, setValor] = useState<number>();

  const [titulo, setTitulo] = useState<string>();

  const [grupo, setGrupo] = useState<string>();

  const [tipo, setTipo] = useState<string>("recebido");

  const [vezesRepetir, setVezesRepetir] = useState<number>();
  const [isRepetir, setIsRepetir] = useState<boolean>();

  //FUNÇÕES DO BANCO DE DADOS
  const [showAlert, setShowAlert] = useState(false);

  const getDB = (): Promise<SQLiteObject> => {
    return SQLite.create({
      name: "data.db",
      location: "default",
    });
  };

  const initDb = (): void => {
    console.log("initDB fired!");
    try {
      getDB().then(async (db: SQLiteObject) => {
        try {
          const create = await db.executeSql(
            "create table if not exists recebido(" +
              "pk_recebido INTEGER NOT NULL PRIMARY KEY," +
              "titulo VARCHAR(80)," +
              "grupo VARCHAR(80)," +
              "tipo VARCHAR(80)," +
              "valor DECIMAL(2)," +
              "data_recebimento DATE" +
              ")",
            []
          );
          await console.log("Table created/exists. Msg: ", create);
        } catch (e) {
          console.log("SQL error: ", e);
        }
      });
    } catch (e) {
      setShowAlert(true);
      console.log("please use a device: ", e);
    }
  };

  const teste = (retorno :String):Boolean =>{
    console.log('oi');
    return true;
  }

  const inserirRecebido = () => {
    initDb();

    try {
      getDB().then(async (db: SQLiteObject) => {
        try {
          const insert = await db.executeSql(
            "insert into recebido ( titulo, grupo, tipo, valor, data_recebimento)" +
              "values (?, ?, ?, ?, ?)",
            [titulo, grupo, tipo, valor, dataRecebimento]
          );
          await console.log("Inserted " + titulo, insert);
        } catch (e) {
          console.log("SQL error: ", e);
        }
      });
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
            <IonButton onClick={(e) => inserirRecebido()}>
              <IonIcon color="success" icon={saveOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel position="floating">Título</IonLabel>
          <IonInput
            value={titulo}
            onIonChange={(e) => setTitulo(e.detail.value!)}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel>Grupo</IonLabel>
          <IonSelect
            value={grupo}
            placeholder="Grupo"
            onIonChange={(e) => setGrupo(e.detail.value)}
          >
            <IonSelectOption value="casa">Casa</IonSelectOption>
            <IonSelectOption value="mercado">Mercado</IonSelectOption>
            <IonSelectOption value="estudo">Estudo</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonRadioGroup
          value={tipo}
          onIonChange={(e) => setTipo(e.detail.value)}
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
            checked={isRepetir}
          //  onIonChange={(e) => isNaN(e.detail.value) && e.detail.value == 'on'? 
            // teste(e.detail.value): setIsRepetir(false)}
            onIonChange={(e) => setIsRepetir(e.detail.checked)}
            color="primary"
          />
        </IonItem>
        {isRepetir ? 
        ( <IonItem>
          <IonLabel position="floating">Quantas Vezes?</IonLabel>
          <IonInput
            type="number"
            value={vezesRepetir}
            onIonChange={(e) => setVezesRepetir(parseInt(e.detail.value!, 0))}
          ></IonInput>
        </IonItem>
          
        ) : (
          console.log('toi')
        )}

        <IonItem>
          <IonLabel position="floating">Valor</IonLabel>
          <IonInput
            type="number"
            value={valor}
            onIonChange={(e) => setValor(parseInt(e.detail.value!, 2))}
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
