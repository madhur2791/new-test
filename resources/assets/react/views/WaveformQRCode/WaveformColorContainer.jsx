import { connect } from 'react-redux';
import { fetchWaveformDataIfNeeded } from '../../actions/waveformAction';
import { fetchColorPalletsIfNeeded } from '../../actions/colorPalletsActions';
import { fetchMediaFileIfNeeded } from '../../actions/uploadedMediaActions';

import WaveformColor from './WaveformColor.jsx';

const mapStateToProps = (state) => {
  const { waveformData, mediaFileData } = state;
  return {
    waveformData,
    mediaFileData
  };
};

const mapDispatchToProps = dispatch => (
  {
    fetchColorPalletsIfNeeded:() => (
      dispatch(fetchColorPalletsIfNeeded())
    ),
    fetchWaveformDataIfNeeded: (mediaId) => (
      dispatch(fetchWaveformDataIfNeeded(mediaId))
    ),
    fetchMediaFileIfNeeded: (mediaId) => (
      dispatch(fetchMediaFileIfNeeded(mediaId))
    )
  }
);

const WaveformColorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WaveformColor);

export default WaveformColorContainer;
