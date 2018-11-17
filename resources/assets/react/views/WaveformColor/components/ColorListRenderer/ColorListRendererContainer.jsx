import { connect } from 'react-redux';

import { confirmPalletsRearranged } from '../../../../actions/colorPalletsActions';

import ColorListRenderer from './ColorListRenderer.jsx';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = dispatch => (
  {
    confirmPalletsRearranged: () => (
      dispatch(confirmPalletsRearranged())
    )
  }
);

const ColorListRendererContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorListRenderer);

export default ColorListRendererContainer;
