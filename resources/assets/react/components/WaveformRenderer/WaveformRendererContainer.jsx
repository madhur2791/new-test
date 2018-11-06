import { connect } from 'react-redux';
import { storeGeneratedWaveformImage } from '../../actions/cartActions.js';

import WaveformRenderer from './WaveformRenderer.jsx';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = dispatch => (
  {
    storeGeneratedWaveformImage: (imageData) => (
      dispatch(storeGeneratedWaveformImage(imageData))
    )
  }
);

const WaveformRendererContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WaveformRenderer);

export default WaveformRendererContainer;
