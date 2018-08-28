import { connect } from 'react-redux';
import { fetchUploadedMediaFiles, changeSelectedMediaIndex, cropMediaFile } from '../../actions/uploadedMediaActions';
import { fetchWaveformData } from '../../actions/waveformAction';
import MediaUpload from './MediaUpload.jsx';

const mapStateToProps = (state, ownProps) => {
  const { uploadedMediaFilesList, waveformData} = state;
  return {
    uploadedMediaFilesList,
    waveformData
  };
};

const mapDispatchToProps = dispatch => (
  {
    getUploadedMediaFiles: () => (
      dispatch(fetchUploadedMediaFiles())
    ),
    updateSelectedMediaIndex: (selectedMediaIndex) => (
      dispatch(changeSelectedMediaIndex(selectedMediaIndex))
    ),
    cropMediaFile: (mediaId, startTime, endTime) => (
      dispatch(cropMediaFile(mediaId, startTime, endTime))
    ),
    getWaveformData: (mediaId) => (
        dispatch(fetchWaveformData(mediaId))
    )
  }
);

const MediaUploadContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaUpload);

export default MediaUploadContainer;
