import { connect } from 'react-redux';
import { uploadMediaFile } from '../../actions/uploadedMediaActions';
import FileUploader from './FileUploader.jsx';

const mapStateToProps = (state, ownProps) => {
  const { uploadedMediaFilesList } = state;
  return {
    uploadedMediaFilesList
  };
};

const mapDispatchToProps = dispatch => (
  {
    uploadMediaFile: (data, progressListener) => (
      dispatch(uploadMediaFile(data, progressListener))
    )
  }
);

const FileUploadContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FileUploader);

export default FileUploadContainer;
