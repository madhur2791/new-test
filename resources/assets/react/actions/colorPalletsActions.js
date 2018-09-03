import {
    REQUEST_COLOR_PALLETS,
    RECEIVE_COLOR_PALLETS,
    REQUEST_COLOR_PALLETS_ERROR,
    UPDATE_SELECTED_COLOR_PALLET_INDEX
} from '../constants/actionTypes';


function requestColorPallets() {
    return {
        type: REQUEST_COLOR_PALLETS,
        payload: {}
    };
}

function receiveUploadedMediaFiles(colorPallets) {
    return {
        type: RECEIVE_COLOR_PALLETS,
        payload: {
            colorPallets
        }
    };
}

function requestUploadedMediaFilesError(error) {
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
          dispatch(receiveUploadedMediaFiles(response.data));
        }).catch((error) => {
          dispatch(requestUploadedMediaFilesError(error));
        })
      );
    }
  );
}

function updateSelectedColorPalletIndex(selectedColorPalletIndex) {
  return {
    type: UPDATE_SELECTED_COLOR_PALLET_INDEX,
    payload: {
      selectedColorPalletIndex
    }
  };
}

export function changeSelectedColorPalletIndex(selectedColorPalletIndex) {
    return (
    (dispatch) => {
        return dispatch(updateSelectedColorPalletIndex(selectedColorPalletIndex));
    })
}

