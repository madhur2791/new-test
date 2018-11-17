import {
    REQUEST_COLOR_PALLETS,
    RECEIVE_COLOR_PALLETS,
    REQUEST_COLOR_PALLETS_ERROR,
    CREATE_COLOR_PALLET_SUCCESS,
    COLOR_PALLETS_REARRANGED
} from '../constants/actionTypes';

const initialState = {
    selectedColorPalletId: 0,
    isFetching: false
};

function colorPalletsReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_COLOR_PALLETS: {
      return {
        ...state,
        isFetching: true
      };
    }
    case RECEIVE_COLOR_PALLETS: {
      const { payload: { colorPallets } } = action;
      return {
        ...state,
        isFetching: false,
        data: colorPallets,
        selectedColorPalletId: (colorPallets[0] && colorPallets[0].id) || 0
      };
    }
    case CREATE_COLOR_PALLET_SUCCESS: {
      const { payload: { createdColorPallet } } = action;
      const modifiedColorPallet = Object.assign([], state.data);
      modifiedColorPallet.unshift(createdColorPallet);
      return {
        ...state,
        data: modifiedColorPallet,
        selectedColorPalletId: createdColorPallet.id,
        palletsRearranged: false
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
    case COLOR_PALLETS_REARRANGED: {
      return {
        ...state,
        palletsRearranged: true
      };
    }

    default:
      return state;
  }
}


export default colorPalletsReducer;
