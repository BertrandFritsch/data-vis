import { connect } from 'react-redux';
import MainFrame from './MainFrame';
import { MainFrameState, PlaceProperties, RawRecord, TemperaturesByPlace, WorldPlace } from './reducers';
import { createSelector } from 'reselect';

function sortPlaces(placeProperties: PlaceProperties) {
  const keys = Object.keys(placeProperties) as WorldPlace[];
  keys.sort((a, b) => placeProperties[ a ].order - placeProperties[ b ].order);
  return keys;
}

export const transformData = (data: RawRecord[], placeProperties: PlaceProperties) => ({
  data: data.length > 0
    ? sortPlaces(placeProperties)
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
    { minValue: +Infinity, maxValue: -Infinity }),
  minDate: data.length > 0 ? new Date(data[ 0 ].Year, 0, 1) : new Date(),
  maxDate: data.length > 0 ? new Date(data[ data.length - 1 ].Year, 0, 1) : new Date()
});

const getMaxMinValues = createSelector(
  (state: MainFrameState) => state.mainFrame.data,
  (state: MainFrameState) => state.mainFrame.placeProperties,
  (data, placeProperties) => ({
    ...transformData(data, placeProperties),
    placeProperties
  })
);

const mapStateToProps = (state: MainFrameState) => getMaxMinValues(state);

export default connect(
  mapStateToProps
)(MainFrame);
