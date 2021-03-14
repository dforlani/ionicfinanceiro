import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, newspaperOutline, cashOutline, cardOutline, analyticsOutline } from 'ionicons/icons';
import Saldo from './pages/saldo/Saldo';
import Recebidos from './pages/recebidos/Recebidos';
import Depesa from './pages/despesas/Despesa';
import Boletos from './pages/boletos/Boletos';

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


/////////////ADMBOB//////////////
import { Plugins } from '@capacitor/core';
import { AdOptions, AdSize, AdPosition } from 'capacitor-admob';
////////FIM ADMOB /////////////////


/* Theme variables */
import './theme/variables.css';
import FormRecebidos from './pages/recebidos/form/FormRecebidos';
import FormDespesas from './pages/despesas/form/FormDespesas';
import FormBoletos from './pages/boletos/form/FormBoletos';

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


//////////ADMOB////////////////////

const { AdMob, Toast } = Plugins;


AdMob.initialize('ca-app-pub-2885273018066682~9872065483').then(()=>{  showTabBarBanner()});
// This Banner AD have bottom margin to avoid TabBar Overlaping for TabBar 
const showTabBarBanner = () => {

  
  const options: AdOptions = {
    adId: 'ca-app-pub-3940256099942544/6300978111',
    adSize: AdSize.SMART_BANNER,
    position: AdPosition.BOTTOM_CENTER,
    hasTabBar: true,  // make it true if you have TabBar Layout.
    tabBarHeight: 56  // you can assign custom margin in pixel default is 56
  };
 
  // Show Banner Ad
  AdMob.showBanner(options)
    .then(
      async (value: any) => {
        console.log(value);  // true
    
        // await Toast.show({
        //   text: 'Showing Banner AD.'
        // })
      },
      (error: any) => {
   
        console.error(error); // show error
      }
    );

  // Subscibe Banner Event Listener
  AdMob.addListener('onAdLoaded', async (info: boolean) => {

    console.log('Showing TabBar Banner AD.');
  });
}

const hideBanner = () => {

  AdMob.hideBanner().then(
    async (value: any) => {
      await Toast.show({
        text: 'Banner AD Hidden'
      })
      console.log(value);  // true
    },
    (error: any) => {
      console.error(error); // show error
    }
  );
}

const resumeBanner = () => {

  // Resume the banner, show it after hide
  AdMob.resumeBanner().then(
    (value: any) => {
      console.log(value);  // true
    },
    (error: any) => {
      console.error(error); // show error
    }
  );
}

const removeBanner = () => {

  // Destroy the banner, remove it from screen.
  AdMob.removeBanner().then(
    (value: any) => {
      console.log(value);  // true
    },
    (error: any) => {
      console.error(error); // show error
    }
  );
}

/////////////FIM ADMOB///////////////

const App: React.FC = () => (

  <IonApp>    
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          {/* <Route path="/tab1" component={Saldo} exact={true} /> */}
          {/* <Route
              exact={true}
              path="/formDepesas"
              render={(props) => (
                <FormDespesas
                  {...{
                    ...props,
                    doc: lancamento,
                    doClose: () => closeModal(),
                  }}
                />
              )}
            /> */}
            <Route path="/formrecebimentos/:lancamento_key" component={FormRecebidos} exact={true} />
            <Route path="/formdespesas/:lancamento_key" component={FormDespesas} exact={true} />
            <Route path="/formboletos/:boleto_key" component={FormBoletos} exact={true} />
          <Route path="/tab1" render={() => <Saldo/>} exact={true} />
          <Route path="/tab2" component={Recebidos} exact={true} />          
          <Route path="/tab3" component={Depesa} />
          <Route path="/tab4" component={Boletos} />
          <Route path="/" render={() => <Redirect to="/tab1" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1" onClick={()=>console.log('tab1')} >
            <IonIcon icon={analyticsOutline}  onClick={()=>console.log('tab1')}/>
            <IonLabel>Saldo</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2" onClick={()=>console.log('tab2')}>
            <IonIcon icon={cashOutline} onClick={()=>console.log('tab2')}/>
            <IonLabel>Recebidos</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3" onClick={()=>console.log('tab3')}>
            <IonIcon icon={cardOutline} onClick={()=>console.log('tab3')}/>
            <IonLabel>Despesas</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab4" href="/tab4" onClick={()=>console.log('tab4')}>
            <IonIcon icon={newspaperOutline} onClick={()=>console.log('tab4')}/>
            <IonLabel>Boletos</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
