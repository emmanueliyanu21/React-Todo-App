import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; 

import { PersistGate } from 'redux-persist/integration/react'

import { Provider } from 'react-redux'
import store, {persistor} from '../module/store'


function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
    <PersistGate persistor={persistor}>
    <Component {...pageProps} />
    </PersistGate>
  </Provider>
}

export default MyApp
