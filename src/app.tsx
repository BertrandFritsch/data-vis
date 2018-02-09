import * as React from 'react';
import { Provider } from 'react-redux';

import mainframe from './contexts/mainframe';

import { Store } from './createStore';

interface Props {
  store: Store;
}

// The UI structure
const App = (props: Props) => {
  return (
    <Provider store={ props.store }>
      <mainframe.components.MainFrame />
    </Provider>
  );
};

export default App;
