import { MainFrameAction } from './actionTypes';

// tslint:disable-next-line no-var-requires
const data: RawRecord[] = require('../../../../data/data.json');

export type WorldPlace =
    'Glob'
  | 'NHem'
  | 'SHem'
  | '24N-90N'
  | '24S-24N'
  | '90S-24S'
  | '64N-90N'
  | '44N-64N'
  | '24N-44N'
  | 'EQU-24N'
  | '24S-EQU'
  | '44S-24S'
  | '64S-44S'
  | '90S-64S';

export type RawRecord = {
    [ key in WorldPlace ]: number | null;
  } & { Year: number };

export interface TemperatureByDate {
  date: Date;
  temperature: number;
}

export interface TemperaturesByPlace {
  place: WorldPlace;
  values: TemperatureByDate[];
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
