import { connect } from 'react-redux';
import MediaFileEditor from './MediaFileEditor.jsx';
import { cropMediaFile } from '../../../../actions/uploadedMediaActions';

const mapStateToProps = (state, ownProps) => {
  const { cropMediaFileRequest } = state;
  return {
      cropMediaFileRequest
  };
};

const mapDispatchToProps = dispatch => (
  {
    cropMediaFile: (mediaId, startTime, endTime) => (
      dispatch(cropMediaFile(mediaId, startTime, endTime))
    ),
  }
);

const MediaFileEditContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaFileEditor);

export default MediaFileEditContainer;
