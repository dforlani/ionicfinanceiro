import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Saldo from './pages/saldo/Tab1';
import Recebidos from './pages/recebidos/Recebidos';
import Depesa from './pages/despesas/Despesa';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import FormRecebidos from './pages/recebidos/form/FormRecebidos';
import FormDespesas from './pages/despesas/form/FormDespesas';

/* FIREBASE IMPORTS */
/*<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.0.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCMZkXH2bbSxa2xn2p2_iYqV350Dh0z8ks",
    authDomain: "financeiro-react-67dc5.firebaseapp.com",
    databaseURL: "https://financeiro-react-67dc5.firebaseio.com",
    projectId: "financeiro-react-67dc5",
    storageBucket: "financeiro-react-67dc5.appspot.com",
    messagingSenderId: "183999270764",
    appId: "1:183999270764:web:4a22cf8c957e4ec6366d49"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>*/

import firebase from 'firebase/app';

//TODO: mudar para um arquivo separado colocar no .gitinore
var firebaseConfig = {
  apiKey: "AIzaSyCMZkXH2bbSxa2xn2p2_iYqV350Dh0z8ks",
  authDomain: "financeiro-react-67dc5.firebaseapp.com",
  databaseURL: "https://financeiro-react-67dc5.firebaseio.com",
  projectId: "financeiro-react-67dc5",
  storageBucket: "financeiro-react-67dc5.appspot.com",
  messagingSenderId: "183999270764",
  appId: "1:183999270764:web:4a22cf8c957e4ec6366d49"
};

firebase.initializeApp(firebaseConfig);

const App: React.FC = () => (







  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/tab1" component={Saldo} exact={true} />
          <Route path="/tab2" component={Recebidos} exact={true} />          
          <Route path="/tab3" component={Depesa} />          
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={triangle} />
            <IonLabel>Saldo</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={ellipse} />
            <IonLabel>Recebidos</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={square} />
            <IonLabel>Despesas</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
