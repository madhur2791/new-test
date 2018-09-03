import { connect } from 'react-redux';
import { uploadMediaFile } from '../../../../actions/uploadedMediaActions';
import FileUploader from './FileUploader.jsx';

const mapStateToProps = (state, ownProps) => {
  const { uploadMediaFileRequest } = state;
  return {
    uploadMediaFileRequest
  };
};

const mapDispatchToProps = dispatch => (
  {
    uploadMediaFile: (data) => (
      dispatch(uploadMediaFile(data))
    )
  }
);

const FileUploadContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FileUploader);

export default FileUploadContainer;
