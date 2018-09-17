import { connect } from 'react-redux';
import { fetchWaveformDataIfNeeded, changeWaveformStyle } from '../../actions/waveformAction';
import { fetchMediaFileIfNeeded } from '../../actions/uploadedMediaActions';

import WaveformStyle from './WaveformStyle.jsx';

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
    changeWaveformStyle: (mediaId, styleObject, updateDatabase) => (
      dispatch(changeWaveformStyle(mediaId, styleObject, updateDatabase))
    ),
    fetchColorPalletsIfNeeded:() => (
      dispatch(fetchColorPalletsIfNeeded())
    )
  }
);

const WaveformStyleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WaveformStyle);

export default WaveformStyleContainer;
