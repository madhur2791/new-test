import {
  REQUEST_WAVEFORM_DATA,
  RECEIVE_WAVEFORM_DATA,
  RECEIVE_WAVEFORM_DATA_FAILURE
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
