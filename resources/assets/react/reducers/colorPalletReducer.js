import {
    REQUEST_COLOR_PALLETS,
    RECEIVE_COLOR_PALLETS,
    REQUEST_COLOR_PALLETS_ERROR,
    UPDATE_SELECTED_COLOR_PALLET_INDEX
} from '../constants/actionTypes';

const initialState = {
    selectedColorPalletIndex: 0
};

function colorPalletsReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_COLOR_PALLETS: {
      return {
        ...state,
        isFetching: true,
        data: []
      };
    }
    case RECEIVE_COLOR_PALLETS: {
      const { payload: { colorPallets } } = action;
      return {
        ...state,
        isFetching: false,
        data: colorPallets
      };
    }
    case REQUEST_COLOR_PALLETS_ERROR: {
      const { payload: { error } } = action;
      return {
        ...state,
        isFetching: false,
        error
      };
    }
    case UPDATE_SELECTED_COLOR_PALLET_INDEX: {
        const { payload: { selectedColorPalletIndex } } = action;
      return {
        ...state,
        selectedColorPalletIndex
      };
    }

    default:
      return state;
  }
}

export default colorPalletsReducer;
