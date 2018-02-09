import ActionTypes from './actionTypes';
import mainFrameReducers from './reducers';

const reducer = mainFrameReducers.mainFrame;

describe('mainFrame reducer', () => {

  it('should throw an exception for malformed actions', () => {
    expect(reducer).toThrow(TypeError);
  });

  it('should initialize the state with the initial state', () => {
    expect(reducer(undefined, { type: 'FAKE_ACTION' } as any)).toMatchSnapshot();
  });
});
