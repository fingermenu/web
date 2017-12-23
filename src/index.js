// @flow

import { configParseServerSdk } from '@microbusiness/parse-server-common-web';
import 'regenerator-runtime/runtime';
import 'typeface-roboto';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { reduxStore } from './framework/redux';
import Config from './framework/config';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import i18n from './i18n';
import './index.css';

class FingerMenuRoot extends Component {
  constructor(props, context) {
    super(props, context);

    configParseServerSdk(Config.parseServerUrl, Config.parseServerApplicationId, Config.parseServerJavascriptKey);
  }

  render = () => (
    <I18nextProvider i18n={i18n}>
      <Provider store={reduxStore}>
        <App />
      </Provider>
    </I18nextProvider>
  );
}

ReactDOM.render(<FingerMenuRoot />, document.getElementById('root'));
registerServiceWorker();
