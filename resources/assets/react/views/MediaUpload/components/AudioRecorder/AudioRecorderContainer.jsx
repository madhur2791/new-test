import { connect } from 'react-redux';
import { uploadMediaFile } from '../../../../actions/uploadedMediaActions';
import AudioRecorder from './AudioRecorder';

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => (
  {
    uploadMediaFile: (data) => (
      dispatch(uploadMediaFile(data))
    )
  }
);

const AudioRecorderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioRecorder);

export default AudioRecorderContainer;
