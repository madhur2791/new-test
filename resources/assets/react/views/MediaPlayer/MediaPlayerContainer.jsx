import { connect } from 'react-redux';
import { fetchWaveformDataIfNeeded } from '../../actions/waveformAction';
import MediaPlayer from './MediaPlayer.jsx';

const mapStateToProps = (state, ownProps) => {
  const { waveformData } = state;
  return {
    waveformData
  };
};

const mapDispatchToProps = dispatch => (
  {
    fetchWaveformDataIfNeeded: (mediaId) => (
      dispatch(fetchWaveformDataIfNeeded(mediaId))
    )
  }
);

const MediaPlayerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaPlayer);

export default MediaPlayerContainer;
