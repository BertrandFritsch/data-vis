import { connect } from 'react-redux';
import MainFrame from './MainFrame';
import { MainFrameState } from './reducers';
import ActionTypes, { Dispatch } from './actionTypes';

const mapStateToProps = (state: MainFrameState) => ({
  data: state.mainFrame.data
});

const mapDispatchToProps = (dispatch: Dispatch<MainFrameState>) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainFrame);
