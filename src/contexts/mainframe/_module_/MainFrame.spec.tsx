import { mount, shallow } from 'enzyme';
import * as React from 'react';
import * as d3 from 'd3';
import MainFrame, { Props } from './MainFrame';
import { data } from '../../../../data/data';

describe('<MainFrame />', () => {
  const getInitialProps = (): Props => ({
    data
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
  });

  it('should render the svg element', () => {

    const props = { ...getInitialProps() };

    const wrapper = mount<Props>(<MainFrame { ...props } />, { attachTo: root });

    expect(root).toMatchSnapshot();
  });
});
