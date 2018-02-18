import { connect } from 'react-redux';
import MainFrame from './MainFrame';
import { MainFrameState, RawRecord } from './reducers';
import { createSelector } from 'reselect';

export function transformData(data: RawRecord[]) {
  const min = Math.min(...data.map(d => d.population));
  const max = Math.max(...data.map(d => d.population));

  return data.map(d => ({
    ...d,
    relativePopulation: (d.population - min) / (max - min)
  }));
}

const getData = createSelector(
  (state: MainFrameState) => state.mainFrame.data,
  data => transformData(data)
);

export default connect(
  (state: MainFrameState) => ({
    data: getData(state)
  })
)(MainFrame);
