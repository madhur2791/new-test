import { connect } from 'react-redux';
import { fetchUploadedMediaFiles } from '../../actions/uploadedMediaActions';
import { fetchWaveformData } from '../../actions/waveformAction';
import { fetchColorPallets } from '../../actions/colorPalletsActions';
import MediaUpload from './MediaUpload.jsx';

const mapStateToProps = (state, ownProps) => {
  const { mediaFilesList, waveformData, uploadMediaFileRequest } = state;
  return {
    mediaFilesList,
    waveformData,
    uploadMediaFileRequest
  };
};

const mapDispatchToProps = dispatch => (
  {
    getUploadedMediaFiles: () => (
      dispatch(fetchUploadedMediaFiles())
    ),
    // cropMediaFile: (mediaId, startTime, endTime) => (
    //   dispatch(cropMediaFile(mediaId, startTime, endTime))
    // ),
    getWaveformData: (mediaId) => (
        dispatch(fetchWaveformData(mediaId))
    ),
    getColorPallets: () => (
        dispatch(fetchColorPallets())
    ),
  }
);

const MediaUploadContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaUpload);

export default MediaUploadContainer;
