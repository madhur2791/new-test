import {
  REQUEST_WAVEFORM_DATA,
  RECEIVE_WAVEFORM_DATA,
  RECEIVE_WAVEFORM_DATA_FAILURE,
  CHANGE_WAVEFORM_COLOR,
  CHANGE_WAVEFORM_STYLE,
  CHANGE_WAVEFORM_TEXT,
  CHANGE_WAVEFORM_QR_CODE
} from '../constants/actionTypes';

function requestWaveformData(mediaId) {
  return {
    type: REQUEST_WAVEFORM_DATA,
    payload: {
        mediaId
    }
  };
}

function receiveWaveformData(mediaId, waveformData) {
  return {
    type: RECEIVE_WAVEFORM_DATA,
    payload: {
        mediaId,
        waveformData
    }
  };
}

function receiveWaveformDataError(mediaId, error) {
  return {
    type: RECEIVE_WAVEFORM_DATA_FAILURE,
    payload: {
      mediaId,
      error
    }
  };
}


export function fetchWaveformData(mediaId) {
  return (
    (dispatch) => {
      dispatch(requestWaveformData(mediaId));
      return (
        axios.get(`/web-api/waveform-data/${mediaId}`).then((response) => {
          dispatch(receiveWaveformData(mediaId, response.data));
        }).catch((error) => {
          dispatch(receiveWaveformDataError(mediaId, error));
        })
      );
    }
  );
}

export function fetchWaveformDataIfNeeded(mediaId) {
    return (
    (dispatch, getState) => {
        const state = getState();
        if(
          !(state.waveformData &&
            state.waveformData[mediaId])
        ) {
            dispatch(fetchWaveformData(mediaId));
        }
    }
  );
}

function updateWaveformColor(mediaId, waveformColor) {
  return {
    type: CHANGE_WAVEFORM_COLOR,
    payload: {
        mediaId,
        waveformColor
    }
  };
}

export function changeWaveformColor(mediaId, colorObject, updateDatabase) {
    return (
    (dispatch) => {
        dispatch(updateWaveformColor(mediaId, colorObject));
        if(updateDatabase === true) {
            axios.post(`/web-api/${mediaId}/waveform-styles`, {
                waveform_color: colorObject
            });
        }
    }
  );
}

function updateWaveformStyle(mediaId, waveformStyle) {
  return {
    type: CHANGE_WAVEFORM_STYLE,
    payload: {
        mediaId,
        waveformStyle
    }
  };
}

export function changeWaveformStyle(mediaId, styleObject, updateDatabase) {
    return (
    (dispatch) => {
        dispatch(updateWaveformStyle(mediaId, styleObject));
        if(updateDatabase === true) {
            axios.post(`/web-api/${mediaId}/waveform-styles`, {
                waveform_style: styleObject
            });
        }
    }
  );
}


function updateWaveformText(mediaId, waveformText) {
  return {
    type: CHANGE_WAVEFORM_TEXT,
    payload: {
        mediaId,
        waveformText
    }
  };
}

export function changeWaveformText(mediaId, textObject, updateDatabase) {
    return (
    (dispatch) => {
        dispatch(updateWaveformText(mediaId, textObject));
        if(updateDatabase === true) {
            axios.post(`/web-api/${mediaId}/waveform-styles`, {
                waveform_text: textObject
            });
        }
    }
  );
}

function updateWaveformQRCode(mediaId, qrCodeDetails) {
  return {
    type: CHANGE_WAVEFORM_QR_CODE,
    payload: {
        mediaId,
        qrCodeDetails
    }
  };
}

export function changeWaveformQRCode(mediaId, qrCodeDetails, updateDatabase) {
    return (
    (dispatch) => {
        dispatch(updateWaveformQRCode(mediaId, qrCodeDetails));
        if(updateDatabase === true) {
            axios.post(`/web-api/${mediaId}/waveform-styles`, {
                waveform_qr_code: qrCodeDetails
            });
        }
    }
  );
}
