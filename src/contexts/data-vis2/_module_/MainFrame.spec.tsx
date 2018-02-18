import { mount, shallow } from 'enzyme';
import * as React from 'react';
import MainFrame, { Props } from './MainFrame';
import { transformData } from './MainFrameContainer';

// tslint:disable-next-line no-var-requires
const data = require('../../../../data/data2.json');

describe('<MainFrame />', () => {
  const getInitialProps = (): Props => ({
    data: transformData(data)
  });

  let root: HTMLDivElement = document.createElement('div');

  beforeEach(() => {
    root = document.createElement('div');
    document.body.appendChild(root);
  });

  afterEach(() => {
    root.parentNode!.removeChild(root);
  });

  it('should render correctly', () => {

    const props = { ...getInitialProps() };

    const wrapper = shallow<Props>(<MainFrame { ...props } />);

    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the svg element', () => {

    const props = { ...getInitialProps() };

    mount<Props>(<MainFrame { ...props } />, { attachTo: root });

    expect(root).toMatchSnapshot();
  });

  it('should display the tooltip', () => {

    const props = { ...getInitialProps() };

    mount<Props>(<MainFrame { ...props } />, { attachTo: root });
    root.querySelector('circle')!.dispatchEvent(new MouseEvent('mousemove'));

    expect(root).toMatchSnapshot();

    root.querySelector('circle')!.dispatchEvent(new MouseEvent('mouseout'));

    expect(root).toMatchSnapshot();
  });
});
