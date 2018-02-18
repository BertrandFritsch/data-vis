import { connect } from 'react-redux';
import MainFrame from './MainFrame';
import { MainFrameState } from './reducers';

export default connect(
  (state: MainFrameState) => ({
    data: state.mainFrame.data
  })
)(MainFrame);
