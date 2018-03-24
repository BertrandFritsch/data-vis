import * as React from 'react';
import './MainFrame.scss';
import * as d3 from 'd3';
import { Record } from './reducers';

export interface Props {
  data: Record[];
}

interface Node {
  data: Record;
  x: number;
  y: number;
}

interface State {
  nodes: Node[];
}

interface ChartState {
  update: () => void;
  resize: () => void;
}

export default class MainFrame extends React.PureComponent<Props, State> {
  state: State;

  private chartState: ChartState = { update: () => undefined, resize: () => undefined };

  constructor(props: Props) {
    super(props);

    this.state = {
      nodes: props.data.map(d => ({
        data: d,
        x: 50,
        y: 50
      }))
    };
  }

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
          <p className='data-vis-header-1'>Focusable Timeline</p>
        </div>
        <div className='data-vis-body'>
          <div className='data-vis-chart' tabIndex={ -1 } ref={ this.renderChart } />
        </div>
        <div className='data-vis-footer'>
        </div>
      </div>
    );
  }

  private windowResized = () => this.chartState.resize();

  private renderChart = (elem: HTMLElement | null) => {
    if (elem !== null) {
      this.chartState = (() => {

        let clientRect = elem.getBoundingClientRect();

        const $svg = d3.select(elem)
                       .append<SVGSVGElement>('svg')
                       .attr('width', clientRect.width)
                       .attr('height', clientRect.height)
                       .attr('viewBox', '0, 0, 100, 100');

        return {
          update: () => {
            // nothing to update
          },

          resize: () => {
            clientRect = elem.getBoundingClientRect();

            $svg.attr('width', clientRect.width)
                .attr('height', clientRect.height);
          }
        };
      })();
      this.chartState.update();
    }
  };
}
