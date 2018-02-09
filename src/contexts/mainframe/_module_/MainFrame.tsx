import * as React from 'react';
import './MainFrame.scss';
import * as d3 from 'd3';
import { Record } from './reducers';

export interface Props {
  data: Record[];
}

export default class MainFrame extends React.PureComponent<Props> {
  private chartState: { update: () => void } = { update: () => undefined };

  render() {
    return (
      <div className='data-vis-container'>
        <div className='data-vis-header' />
        <div className='data-vis-body' tabIndex={ -1 } ref={ this.renderChart } />
      </div>
    );
  }

  private renderChart = (elem: HTMLElement | null) => {
    if (elem !== null) {
      this.chartState = (() => {

        const $svg = d3.select(elem)
                       .append<SVGSVGElement>('svg');

        const clientRect = $svg.node()!.getBoundingClientRect();

        const margin = { top: 20, right: 10, bottom: 20, left: 10 };
        const width = clientRect.width - margin.left - margin.right;
        const height = clientRect.height - margin.top - margin.bottom;

        const $gRoot = $svg.append<SVGGElement>('g')
                           .attr('transform', `translate(${ margin.left },${ margin.top })`);

        console.log(d3.extent<Record, Date>(this.props.data, d => new Date(d.Year, 0, 1)) as [ Date, Date ])

        const x = d3.scaleTime()
                    .rangeRound([ 0, width ])
                    .domain(d3.extent<Record, Date>(this.props.data, d => new Date(d.Year, 0, 1)) as [ Date, Date ]);

        const y = d3.scaleLinear()
                    .rangeRound([ height, 0 ])
                    .domain(d3.extent<Record, number>(this.props.data, d => d.Glob) as [ number, number ]);

        const line = d3.line<Record>()
                       .x(d => x(new Date(d.Year, 0, 1)))
                       .y(d => y(d.Glob));

        $gRoot.append<SVGGElement>('g')
              .attr('transform', `translate(0,${ height / 2 })`)
              .call(d3.axisBottom(x));
              // .select('.domain')
              // .remove();

        $gRoot.append<SVGGElement>('g')
              .call(d3.axisLeft(y))
              .append('text')
              .attr('fill', '#000')
              .attr('transform', 'rotate(-90)')
              .attr('y', 6)
              .attr('dy', '0.71em')
              .attr('text-anchor', 'end')
              .text('Price ($)');

        $gRoot.append('path')
              .datum(this.props.data)
              .attr('fill', 'none')
              .attr('stroke', 'steelblue')
              .attr('stroke-linejoin', 'round')
              .attr('stroke-linecap', 'round')
              .attr('stroke-width', 1.5)
              .attr('d', line);

        return {
          update: () => {

          }
        };
      })();
      this.chartState.update();
    }
  };
}
