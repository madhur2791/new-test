import { connect } from 'react-redux';
import { fetchWaveformData } from '../../actions/waveformAction';
import WaveformEdit from './WaveformEdit.jsx';

const mapStateToProps = (state, ownProps) => {
  const { mediaId } = ownProps.match.params;
  const { waveformData } = state;
  return {
    waveformData
  };
};

const mapDispatchToProps = dispatch => (
  {
    getWaveformData: (mediaId) => (
      dispatch(fetchWaveformData(mediaId))
    )
  }
);

const WaveformContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WaveformEdit);

export default WaveformContainer;
