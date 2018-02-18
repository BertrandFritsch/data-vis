import { mount, shallow } from 'enzyme';
import * as React from 'react';
import MainFrame, { Props } from './MainFrame';

// tslint:disable-next-line no-var-requires
const data = require('../../../../data/data2.json');

describe('<MainFrame />', () => {
  const getInitialProps = (): Props => ({
    data
  });

  let root: HTMLDivElement = document.createElement('div');

  jest.useFakeTimers();

  beforeEach(() => {
    root = document.createElement('div');
    document.body.appendChild(root);
  });

  afterEach(() => {
    jest.runAllTimers();
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
    jest.runAllTimers();

    expect(root).toMatchSnapshot();
  });

  it('should adapt when the window is resized', () => {

    const props = { ...getInitialProps() };

    const wrapper = mount<Props>(<MainFrame { ...props } />, { attachTo: root });

    root.querySelector('svg')!.getBoundingClientRect = () => ({ top: 0, right: 500, bottom: 500, left: 0, width: 500, height: 500 });
    window.dispatchEvent(new Event('resize'));
    wrapper.update();
    jest.runAllTimers();

    expect(root).toMatchSnapshot();
  });
});
