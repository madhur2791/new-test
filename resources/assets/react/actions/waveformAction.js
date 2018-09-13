import {
  REQUEST_WAVEFORM_DATA,
  RECEIVE_WAVEFORM_DATA,
  RECEIVE_WAVEFORM_DATA_FAILURE,
  CHANGE_WAVEFORM_COLOR,
  CHANGE_WAVEFORM_STYLE
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

export function changeWaveformColor(mediaId, colorObject) {
    return (
    (dispatch) => {
        dispatch(updateWaveformColor(mediaId, colorObject));
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

export function changeWaveformStyle(mediaId, styleObject) {
    return (
    (dispatch) => {
        dispatch(updateWaveformStyle(mediaId, styleObject));
    }
  );
}

