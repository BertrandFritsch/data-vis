import ActionTypes, { MainFrameAction } from './actionTypes';
import { data } from '../../../../data/data';

export interface Record {
  'Year': number;
  'Glob': number;
  'NHem': number;
  'SHem': number;
  '24N-90N': number;
  '24S-24N': number;
  '90S-24S': number;
  '64N-90N': number;
  '44N-64N': number;
  '24N-44N': number;
  'EQU-24N': number;
  '24S-EQU': number;
  '44S-24S': number;
  '64S-44S': number;
  '90S-64S': number;
}

export interface State {
  data: Record[];
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
