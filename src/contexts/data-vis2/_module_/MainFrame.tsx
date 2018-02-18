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
}

export default class MainFrame extends React.PureComponent<Props, State> {
  state: State;

  private chartState: ChartState = { update: () => undefined };

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

  private renderChart = (elem: HTMLElement | null) => {
    if (elem !== null) {
      this.chartState = (() => {

        const clientRect = elem.getBoundingClientRect();

        const scale = d3.scaleLinear()
                        .domain([ 0, 1 ])
                        .range([ 1, 20 ]);

        const $svg = d3.select(elem)
                       .append<SVGSVGElement>('svg')
                       .attr('width', clientRect.width)
                       .attr('height', clientRect.height)
                       .attr('viewBox', '0, 0, 100, 100');

        const $tooltipDiv = d3.select(elem)
                              .append('div')
                              .attr('class', 'data-vis-tooltip');

        $tooltipDiv.append('div');

        const $overallGroup = $svg.append<SVGGElement>('g');
        const $circlesData = $overallGroup.selectAll<SVGGElement, Node>('.data-vis-circle')
                                          .data(this.state.nodes, d => d.data.geo);

        const populationFormat = d3.format(',.3r');

        const $circleGroups = $circlesData.enter()
                                          .append<SVGGElement>('g')
                                          .attr('class', 'data-vis-group-circle')
                                          .each((d, i, g) => {
                                            const $g = d3.select(g [ i ]);
                                            const $circle = $g.append('circle')
                                                              .attr('r', scale(d.data.relativePopulation))
                                                              .on('mousemove', () => {
                                                                $tooltipDiv.classed('data-vis-tooltip--hover', true)
                                                                           .style('left', d3.event.pageX + 4 + 'px')
                                                                           .style('top', d3.event.pageY + 4 + 'px')
                                                                           .select('div')
                                                                           .html(`<span>${ d.data.geo }</span><br /><span>${ populationFormat(d.data.population)}</span>`);
                                                              })
                                                              .on('mouseout', () => {
                                                                $tooltipDiv.classed('data-vis-tooltip--hover', false);
                                                              });

                                            if (d.data.relativePopulation > .4) {
                                              $g.append('text')
                                                .text(d.data.geo);
                                            }
                                            else {
                                              $circle.append('title')
                                                     .text(d.data.geo);
                                            }
                                          })
                                          .merge($circlesData);

        d3.forceSimulation(this.state.nodes)
          .force('collide', d3.forceCollide<Node>().radius(d => scale(d.data.relativePopulation * 1.05)).strength(.75))
          .force('x', d3.forceX(50))
          .force('y', d3.forceY(50))
          .on('tick', () => {
            $circleGroups.each(
              (d, i, g) => {
                d.x = Math.min(Math.max(scale(d.data.relativePopulation), d.x), 100 - scale(d.data.relativePopulation));
                d.y = Math.min(Math.max(scale(d.data.relativePopulation), d.y), 100 - scale(d.data.relativePopulation));
                d3.select(g[ i ])
                  .attr('transform', `translate(${ d.x },${ d.y })`);
              }
            );
          });
        return {
          update: () => {
            // nothing to update
          }
        };
      })();
      this.chartState.update();
    }
  };
}
