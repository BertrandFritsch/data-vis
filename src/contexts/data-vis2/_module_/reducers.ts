import { MainFrameAction } from './actionTypes';

// tslint:disable-next-line no-var-requires
const data: RawRecord[] = require('../../../../data/data2.json');

export interface RawRecord {
  geo: string;
  population: number;
}

export interface State {
  data: RawRecord[];
}

const initialState: State = {
  data
};

export interface MainFrameState {
  mainFrame: State;
}

const reducer = (state: State = initialState, action: MainFrameAction): State => {
  switch (action.type) {

    default:
      return state;
  }
};

export default { mainFrame: reducer };
