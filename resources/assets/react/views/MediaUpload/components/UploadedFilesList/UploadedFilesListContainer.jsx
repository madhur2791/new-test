import { connect } from 'react-redux';
import { changeSelectedMediaIndex } from '../../../../actions/uploadedMediaActions';
import MediaUpload from './UploadedFilesList.jsx';

const mapStateToProps = (state, ownProps) => {
  const { mediaFilesList } = state;
  return {
    mediaFilesList
  };
};

const mapDispatchToProps = dispatch => (
  {
    updateSelectedMediaIndex: (selectedMediaIndex) => (
      dispatch(changeSelectedMediaIndex(selectedMediaIndex))
    ),
  }
);

const UploadedFilesListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaUpload);

export default UploadedFilesListContainer;
