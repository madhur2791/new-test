import {
    REQUEST_COLOR_PALLETS,
    RECEIVE_COLOR_PALLETS,
    REQUEST_COLOR_PALLETS_ERROR,
    CREATE_COLOR_PALLET_SUCCESS,
    COLOR_PALLETS_REARRANGED
} from '../constants/actionTypes';


function requestColorPallets() {
    return {
        type: REQUEST_COLOR_PALLETS,
        payload: {}
    };
}

function receiveColorPallets(colorPallets) {
    return {
        type: RECEIVE_COLOR_PALLETS,
        payload: {
            colorPallets
        }
    };
}

function requestColorPalletsError(error) {
  return {
    type: REQUEST_COLOR_PALLETS_ERROR,
    payload: {
        error
    }
  };
}

export function fetchColorPallets() {
  return (
    (dispatch) => {
      dispatch(requestColorPallets());
      return (
        axios.get(`/web-api/color-pallets`).then((response) => {
          dispatch(receiveColorPallets(response.data));
        }).catch((error) => {
          dispatch(requestColorPalletsError(error));
        })
      );
    }
  );
}

export function fetchColorPalletsIfNeeded() {
  return (
    (dispatch, getState) => {
        const state = getState();
        if(
          !state.colorPallets ||
          (
            typeof state.colorPallets.data === "undefined" &&
            state.colorPallets.isFetching === false
          )
        ) {
        dispatch(fetchColorPallets());
      }
    }
  );
}


export function createColorPalletSuccess(createdColorPallet) {
    return {
        type: CREATE_COLOR_PALLET_SUCCESS,
        payload: {
            createdColorPallet
        }
    };
}

export function confirmPalletsRearranged() {
    return {
        type: COLOR_PALLETS_REARRANGED,
        payload: {}
    };
}
