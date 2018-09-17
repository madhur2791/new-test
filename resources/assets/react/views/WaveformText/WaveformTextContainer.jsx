import { connect } from 'react-redux';
import { fetchWaveformDataIfNeeded, changeWaveformText } from '../../actions/waveformAction';
import { fetchMediaFileIfNeeded } from '../../actions/uploadedMediaActions';

import WaveformText from './WaveformText.jsx';

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
    changeWaveformText: (mediaId, textObject, updateDatabase) => (
      dispatch(changeWaveformText(mediaId, textObject, updateDatabase))
    )
  }
);

const WaveformTextContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WaveformText);

export default WaveformTextContainer;
