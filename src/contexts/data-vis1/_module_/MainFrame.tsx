import * as React from 'react';
import './MainFrame.scss';
import * as d3 from 'd3';
import { PlaceProperties, TemperatureByDate, TemperaturesByPlace, WorldPlace } from './reducers';
import { setInArray } from '../../../helpers';

export interface Props {
  data: TemperaturesByPlace[];
  minValue: number;
  maxValue: number;
  minDate: Date;
  maxDate: Date;
  placeProperties: PlaceProperties;
}

interface State {
  selectedPlaces: WorldPlace[];
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

    this.state = { selectedPlaces: props.data.find(d => d.place === 'Glob') ? [ 'Glob' ] : [] };
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
          <p className='data-vis-header-1'>Zonal Annual Mean Land-Ocean Temperature</p>
          <p className='data-vis-header-2'>{ `${ this.props.minDate.getFullYear() } - ${ this.props.maxDate.getFullYear() }` }</p>
        </div>
        <div className='data-vis-body'>
          <div className='data-vis-chart' tabIndex={ -1 } ref={ this.renderChart } />
          <div className='data-vis-tools'>
            {
              this.props.data.map(r =>
                <div key={ r.place } style={ { color: this.props.placeProperties [ r.place ].color } }>
                  <div className='bx--form-item'>
                    <input className='bx--toggle bx--toggle--small' id={ `toggle-${ r.place }` } type='checkbox'
                           aria-label='Label Name'
                           checked={ this.state.selectedPlaces.find(d => d === r.place) !== undefined }
                           onChange={ e => this.togglePlace(r.place, e.target.checked) }
                    />
                    <label className='bx--toggle__label' htmlFor={ `toggle-${ r.place }` }>
                      <span className='bx--toggle__appearance'>
                      </span>
                      { this.props.placeProperties [ r.place ].text }
                    </label>
                  </div>
                </div>
              )
            }
          </div>
        </div>
        <div className='data-vis-footer'>
          <p className='data-vis-footer-1'>GISTEMP Team, 2018: GISS Surface Temperature Analysis (GISTEMP). NASA Goddard
            Institute for Space Studies. Dataset accessed 2018-02-10 at https://data.giss.nasa.gov/gistemp/</p>
          <p className='data-vis-footer-2'>Hansen, J., R. Ruedy, M. Sato, and K. Lo, 2010: Global surface temperature
            change, Rev. Geophys., 48, RG4004, doi:10.1029/2010RG000345</p>
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

        const startDate = this.props.data[ 0 ].values[ 0 ].date;
        const endDate = this.props.data[ 0 ].values[ this.props.data[ 0 ].values.length - 1 ].date;

        const $gRoot = $svg.append<SVGGElement>('g')
                           .attr('transform', `translate(${ margin.left },${ margin.top })`);

        const x = d3.scaleTime()
                    .domain([ startDate, endDate ]);

        const y = d3.scaleLinear()
                    .domain([ this.props.minValue, this.props.maxValue ])
                    .nice();

        const line = d3.line<TemperatureByDate>()
                       .x(d => x(d.date))
                       .y(d => y(d.temperature));

        const nbXTicks = (nbIntervals: number) => {
          // replace the last automatic tick by the real last one
          const ticks = x.ticks(nbIntervals);
          ticks[ ticks.length - 1 ] = endDate;
          return ticks;
        };

        const xAxis = d3.axisBottom(x);

        $gRoot.append<SVGGElement>('g')
              .attr('class', 'data-vis-axis-x');

        const yFormat = d3.format('.1f');

        const yAxis = d3.axisLeft<number>(y)
                        .tickFormat(d => d === 0 ? '0' : `${ yFormat(d) }°`);

        $gRoot.append<SVGGElement>('g')
              .attr('class', 'data-vis-axis-y')
              .call(yAxis);

        $gRoot.append('text')
              .attr('class', 'data-vis-info')
              .attr('dy', -3)
              .text('Annual temperature change compared to the mean of the years from 1951 to 1980');

        return {
          update: () => {

            const width = clientRect.width - margin.left - margin.right;
            const height = clientRect.height - margin.top - margin.bottom;
            const nbIntervals = Math.max(Math.trunc(width / 50), 1);

            $svg.attr('width', clientRect.width)
                .attr('height', clientRect.height);

            x.rangeRound([ 0, width ]);
            y.rangeRound([ height, 0 ]);

            xAxis.tickValues(nbXTicks(nbIntervals));
            yAxis.tickSize(-(width + 20));

            $gRoot.select<SVGGElement>('.data-vis-axis-x')
                  .transition()
                  .attr('transform', `translate(0,${ height })`)
                  .call(xAxis);

            $gRoot.select<SVGGElement>('.data-vis-axis-y')
                  .transition()
                  .call(yAxis)
                  .call($g => {
                    $g.selectAll('.tick')
                      .attr('class', d => `tick ${ d === 0 ? 'data-vis-axis-y-zero' : '' }`)
                      .call($g1 => $g1.select('line')
                                      .attr('x1', -20))
                      .call($g1 => $g1.select('text')
                                      .attr('dx', -3)
                                      .attr('dy', -3));
                  });

            const $chartLines = $gRoot.selectAll<SVGGElement, TemperaturesByPlace>('.data-vis-group-line')
                                      .data(this.props.data.filter(d => this.state.selectedPlaces.find(p => p === d.place) !== undefined), d => d.place);

            $chartLines.exit()
                       .remove();

            $chartLines.enter()
                       .append<SVGGElement>('g')
                       .attr('class', 'data-vis-group-line')
                       .call($g => $g.append<SVGPathElement>('path')
                                     .attr('class', 'data-vis-line')
                                     .style('stroke', d => this.props.placeProperties [ d.place ].color)
                       )
                       .merge($chartLines)
                       .transition()
                       .call($g => $g.select('.data-vis-line')
                                     .attr('d', d => line(d.values))
                       );
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

  private togglePlace(place: WorldPlace, checked: boolean) {
    this.setState({
      selectedPlaces: setInArray(this.state.selectedPlaces, p => p === place, checked ? place : undefined)
    });
  }
}
