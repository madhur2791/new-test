import { connect } from 'react-redux';
import { fetchPricingLists } from '../../actions/cartActions';
import { fetchWaveformDataIfNeeded } from '../../actions/waveformAction';
import { fetchMediaFileIfNeeded } from '../../actions/uploadedMediaActions';
// import { addToCart } from '../../actions/cartActions';
import WaveformPrintOption from './WaveformPrintOption.jsx';

const mapStateToProps = (state) => {
  const { priceList, waveformData, mediaFileData } = state;
  return {
    priceList,
    waveformData,
    mediaFileData
  };
};

const mapDispatchToProps = dispatch => (
  {
    fetchPricingLists: () => (
      dispatch(fetchPricingLists())
    ),
    fetchWaveformDataIfNeeded: (mediaId) => (
      dispatch(fetchWaveformDataIfNeeded(mediaId))
    ),
    fetchMediaFileIfNeeded: (mediaId) => (
      dispatch(fetchMediaFileIfNeeded(mediaId))
    ),
    // addToCart: (mediaId, sizeOption, generatedImage) => (
    //   dispatch(addToCart(mediaId, sizeOption, generatedImage))
    // )
  }
);

const WaveformPrintOptionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WaveformPrintOption);

export default WaveformPrintOptionContainer;
