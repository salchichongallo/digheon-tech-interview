import 'antd/dist/antd.css';

import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

const renderApp = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app'),
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('./App', renderApp);
}
