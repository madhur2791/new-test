import { connect } from 'react-redux';
import { fetchUploadedMediaFiles } from '../../actions/uploadedMediaActions';
import { fetchWaveformData } from '../../actions/waveformAction';
import { fetchColorPalletsIfNeeded } from '../../actions/colorPalletsActions';
import MediaUpload from './MediaUpload.jsx';

const mapStateToProps = (state) => {
  const { mediaFilesList, waveformData, uploadMediaFileRequest, cropMediaFileRequest, mediaFileData } = state;
  return {
    mediaFilesList,
    waveformData,
    uploadMediaFileRequest,
    cropMediaFileRequest,
    mediaFileData
  };
};

const mapDispatchToProps = dispatch => (
  {
    getUploadedMediaFiles: () => (
      dispatch(fetchUploadedMediaFiles())
    ),
    getWaveformData: (mediaId) => (
        dispatch(fetchWaveformData(mediaId))
    ),
    fetchColorPalletsIfNeeded: () => (
        dispatch(fetchColorPalletsIfNeeded())
    ),
  }
);

const MediaUploadContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaUpload);

export default MediaUploadContainer;
