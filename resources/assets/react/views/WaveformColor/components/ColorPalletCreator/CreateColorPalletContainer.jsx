import { connect } from 'react-redux';

import { createColorPalletSuccess } from '../../../../actions/colorPalletsActions';

import CreateColorRenderer from './CreateColorRenderer.jsx';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = dispatch => (
  {
    createColorPalletSuccess: (createdColorPallet) => (
      dispatch(createColorPalletSuccess(createdColorPallet))
    )
  }
);

const CreateColorPalletContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateColorRenderer);

export default CreateColorPalletContainer;
