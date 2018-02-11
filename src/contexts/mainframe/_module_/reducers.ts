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

export type PlaceProperties = {
  [ key in WorldPlace ]: {
    order: number;
    color: string;
    text: string;
  }
};

export const placeProperties: PlaceProperties = {
  'Glob':    { order: 0, color: '#ff0000', text: 'Global' },
  'NHem':    { order: 1, color: '#0391f9', text: 'North hemisphere' },
  '24N-90N': { order: 2, color: '#5b924e', text: '24N-90N' },
  '64N-90N': { order: 3, color: '#fc9127', text: '64N-90N' },
  '44N-64N': { order: 4, color: '#ab5fab', text: '44N-64N' },
  '24N-44N': { order: 5, color: '#3bbbce', text: '24N-44N' },
  'EQU-24N': { order: 6, color: '#0712be', text: 'EQU-24N' },
  '24S-24N': { order: 7, color: '#cc4c76', text: '24S-24N' },
  '24S-EQU': { order: 8, color: '#5a5b12', text: '24S-EQU' },
  '44S-24S': { order: 9, color: '#416920', text: '44S-24S' },
  '64S-44S': { order: 10, color: '#f25d22', text: '64S-44S' },
  '90S-64S': { order: 11, color: '#3e587a', text: '90S-64S' },
  '90S-24S': { order: 12, color: '#7c213e', text: '90S-24S' },
  'SHem':    { order: 13, color: '#310035', text: 'South hemisphere' }
};

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
  placeProperties: PlaceProperties;
}

const initialState: State = {
  data,
  placeProperties
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
