import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker';

import { store } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import LanguageProvider from './LanguageProvider'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'font-awesome/css/font-awesome.min.css'

import {translationMessages} from './LanguageProvider/i18n';

let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LanguageProvider messages={translationMessages} language={'vi'}>
          <App />
        </LanguageProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
