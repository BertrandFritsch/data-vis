/**
 * All redux actions are events
 */

const enum ActionTypes {
  MAINFRAME_DEFAULT_ACTION = 'MAINFRAME_DEFAULT_ACTION'
}

export default ActionTypes;

// tslint:disable-next-line interface-over-type-literal
export type MainFrameAction = { type: ActionTypes.MAINFRAME_DEFAULT_ACTION };

export type Dispatch<S> = (action: MainFrameAction) => void;
