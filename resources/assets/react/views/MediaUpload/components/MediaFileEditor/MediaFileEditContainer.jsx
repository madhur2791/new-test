import { connect } from 'react-redux';
import MediaFileEditor from './MediaFileEditor.jsx';

const mapStateToProps = (state, ownProps) => {
  const { waveformData } = state;
  return {
    waveformData
  };
};

const mapDispatchToProps = dispatch => (
  {
    // updateSelectedMediaIndex: (selectedMediaIndex) => (
    //   dispatch(changeSelectedMediaIndex(selectedMediaIndex))
    // ),
  }
);

const MediaFileEditContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaFileEditor);

export default MediaFileEditContainer;
