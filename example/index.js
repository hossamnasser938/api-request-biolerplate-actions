import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import axios from 'axios';
import {BASE_URL} from './src/constants';
import {config} from 'api-request-biolerplate-actions';
import {Provider} from 'react-redux';
import store from './src/store';

axios.defaults.baseURL = BASE_URL;

config(store.dispatch, BASE_URL, errorMessage =>
  alert('error: ' + errorMessage),
);

const RootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RootApp);
