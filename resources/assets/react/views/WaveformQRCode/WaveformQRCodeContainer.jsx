import { connect } from 'react-redux';
import { fetchWaveformDataIfNeeded, changeWaveformQRCode } from '../../actions/waveformAction';
import { fetchMediaFileIfNeeded } from '../../actions/uploadedMediaActions';

import WaveformQRCode from './WaveformQRCode.jsx';

const mapStateToProps = (state) => {
  const { waveformData, mediaFileData } = state;
  return {
    waveformData,
    mediaFileData
  };
};

const mapDispatchToProps = dispatch => (
  {
    fetchWaveformDataIfNeeded: (mediaId) => (
      dispatch(fetchWaveformDataIfNeeded(mediaId))
    ),
    fetchMediaFileIfNeeded: (mediaId) => (
      dispatch(fetchMediaFileIfNeeded(mediaId))
    ),
    changeWaveformQRCode: (mediaId, qrCodeObject, updateDatabase) => (
      dispatch(changeWaveformQRCode(mediaId, qrCodeObject, updateDatabase))
    )
  }
);

const WaveformQRCodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WaveformQRCode);

export default WaveformQRCodeContainer;
