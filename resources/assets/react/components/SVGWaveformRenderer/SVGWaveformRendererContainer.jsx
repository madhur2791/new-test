import { connect } from 'react-redux';
import { storeGeneratedWaveformImage } from '../../actions/cartActions.js';

import SVGWaveformRenderer from './SVGWaveformRenderer.jsx';

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

const SVGWaveformRendererContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SVGWaveformRenderer);

export default SVGWaveformRendererContainer;
