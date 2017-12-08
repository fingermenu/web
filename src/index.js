// @flow

import 'regenerator-runtime/runtime';
import 'typeface-roboto';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { configParseServerSdk } from 'micro-business-parse-server-common-web';
import { reduxStore } from './framework/redux';
import Config from './framework/config';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

class TrolleySmartRoot extends Component {
  constructor(props, context) {
    super(props, context);

    configParseServerSdk(Config.parseServerUrl, Config.parseServerApplicationId, Config.parseServerJavascriptKey);
  }

  render = () => (
    <Provider store={reduxStore}>
      <App />
    </Provider>
  );
}
ReactDOM.render(<TrolleySmartRoot />, document.getElementById('root'));
registerServiceWorker();
