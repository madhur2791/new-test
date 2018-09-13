import {
    REQUEST_COLOR_PALLETS,
    RECEIVE_COLOR_PALLETS,
    REQUEST_COLOR_PALLETS_ERROR
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
