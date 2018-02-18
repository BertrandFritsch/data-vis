import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import { MainFrameState } from './reducers';

// tslint:disable-next-line no-var-requires
const data = require('../../../../data/data2.json');

const MainFrame = (props: MainFrameProps) =>
  <div>{ props.data.map((n, i) => <p key={ i }>{ n.geo }</p>) }</div>;

jest.mock('./MainFrame', () => ({ default: MainFrame }));

import { Props as MainFrameProps } from './MainFrame';
import MainFrameContainer from './MainFrameContainer';

describe('MainFrameContainer', () => {

  const initialState = {
    data
  };

  const store: Store<MainFrameState> = createStore(() => ({ mainFrame: initialState }));

  it('should render correctly', () => {
    const wrapper = mount(
      <Provider store={ store }>
        <MainFrameContainer />
      </Provider>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
