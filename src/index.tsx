import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import store, { Store } from './createStore';

import './theme/theme.scss';

import App from './app';

// import { setUpFocusWatcher } from './utils';
// setUpFocusWatcher();

interface Props {
  store: Store;
}

/**
 * Entry point of the Application
 */
const render = (Component: React.StatelessComponent<Props>) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={ store }/>
    </AppContainer>, document.getElementById('root'),
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept();
}
