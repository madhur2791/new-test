import { connect } from 'react-redux';
import { fetchUploadedMediaFiles } from '../../../../actions/uploadedFilesListAction';
import UploadedFilesList from './UploadedFilesList.jsx';

const mapStateToProps = (state, ownProps) => {
  const { uploadedMediaFilesList } = state;
  return {
    uploadedMediaFilesList
  };
};

const mapDispatchToProps = dispatch => (
  {
    getUploadedMediaFiles: () => (
      dispatch(fetchUploadedMediaFiles())
    )
  }
);

const UploadedFilesListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadedFilesList);

export default UploadedFilesListContainer;
