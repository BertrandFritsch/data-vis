import * as React from 'react';
import './MainFrame.scss';
import * as d3 from 'd3';
import { RawRecord } from './reducers';

export interface Props {
  data: RawRecord[];
}

interface ChartState {
  update: () => void;
  resize: () => void;
}

export default class MainFrame extends React.PureComponent<Props> {
  private chartState: ChartState = { update: () => undefined, resize: () => undefined };

  componentDidMount() {
    window.addEventListener('resize', this.windowResized);
  }

  componentDidUpdate() {
    this.chartState.update();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResized);
  }

  render() {
    return (
      <div className='data-vis-container'>
        <div className='data-vis-header'>
          <p className='data-vis-header-1'>European Union Population</p>
          <p className='data-vis-header-2'>2017</p>
        </div>
        <div className='data-vis-body'>
          <div className='data-vis-chart' tabIndex={ -1 } ref={ this.renderChart } />
        </div>
        <div className='data-vis-footer'>
          <p className='data-vis-footer-1'>Source: https://ec.europa.eu/eurostat/</p>
          <p className='data-vis-footer-2'>Copyright: https://ec.europa.eu/info/legal-notice_en</p>
        </div>
      </div>
    );
  }

  private windowResized = () => this.chartState.resize();

  private renderChart = (elem: HTMLElement | null) => {
    if (elem !== null) {
      this.chartState = (() => {

        let clientRect = elem.getBoundingClientRect();
        const margin = { top: 20, right: 40, bottom: 20, left: 40 };

        const $svg = d3.select(elem)
                       .append<SVGSVGElement>('svg')
                       .attr('width', clientRect.width)
                       .attr('height', clientRect.height);

        return {
          update: () => {

            const width = clientRect.width - margin.left - margin.right;
            const height = clientRect.height - margin.top - margin.bottom;

            $svg.attr('width', clientRect.width)
                .attr('height', clientRect.height);
          },

          resize: () => {
            clientRect = elem.getBoundingClientRect();
            this.chartState.update();
          }
        };
      })();
      this.chartState.update();
    }
  };
}
