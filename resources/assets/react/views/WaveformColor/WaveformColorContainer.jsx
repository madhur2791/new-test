import { connect } from 'react-redux';
import { fetchWaveformDataIfNeeded, changeWaveformColor } from '../../actions/waveformAction';
import { fetchMediaFileIfNeeded } from '../../actions/uploadedMediaActions';
import { fetchColorPalletsIfNeeded, confirmPalletsRearranged } from '../../actions/colorPalletsActions';

import WaveformColor from './WaveformColor.jsx';

const mapStateToProps = (state) => {
  const { waveformData, mediaFileData, colorPallets } = state;
  return {
    waveformData,
    mediaFileData,
    colorPallets
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
    changeWaveformColor: (mediaId, colorObject, updateDatabase) => (
      dispatch(changeWaveformColor(mediaId, colorObject, updateDatabase))
    ),
    fetchColorPalletsIfNeeded:() => (
      dispatch(fetchColorPalletsIfNeeded())
    ),
    confirmPalletsRearranged: () => (
      dispatch(confirmPalletsRearranged())
    )
  }
);

const WaveformColorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WaveformColor);

export default WaveformColorContainer;
