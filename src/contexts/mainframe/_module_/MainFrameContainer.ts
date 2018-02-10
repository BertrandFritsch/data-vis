import { connect } from 'react-redux';
import MainFrame from './MainFrame';
import { MainFrameState, RawRecord, TemperaturesByPlace, WorldPlace } from './reducers';
import { Dispatch } from './actionTypes';
import { createSelector } from 'reselect';

export const transformData = (data: RawRecord[]) => ({
  data: data.length > 0
    ? Object.keys(data[ 0 ])
            .filter(key => key !== 'Year')
            .map(key => ({
              place: key,
              values: data.map(r => ({
                date: new Date(r.Year, 0, 1),
                temperature: r[ key as WorldPlace ]
              }))
            })) as TemperaturesByPlace[]
    : [],
  ...data.reduce((minMax, r) => {
      const values = Object.keys(r).filter(k => k !== 'Year' && r[ k as WorldPlace ] !== null).map(k => r[ k as WorldPlace ]!);
      return ({
        minValue: Math.min(minMax.minValue, ...values),
        maxValue: Math.max(minMax.maxValue, ...values)
      });
    },
    { minValue: +Infinity, maxValue: -Infinity })
});

const getMaxMinValues = createSelector(
  (state: MainFrameState) => state.mainFrame.data,
  data => transformData(data)
);

const mapStateToProps = (state: MainFrameState) => getMaxMinValues(state);

export default connect(
  mapStateToProps
)(MainFrame);
