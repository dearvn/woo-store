import React from 'react';
import { PersistGate } from 'redux-persist/es/integration/react'
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './configureStore';

const { persistor, store } = configureStore();

export default () => (
  <Provider store={store}>
    <PersistGate
      persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
