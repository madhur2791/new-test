import {
  REQUEST_WAVEFORM_DATA,
  RECEIVE_WAVEFORM_DATA,
  RECEIVE_WAVEFORM_DATA_FAILURE
} from '../constants/actionTypes';
import apiModule from '../api/index';

const { apiClient } = apiModule({
  apiPrefix: 'http://127.0.0.1:8000' //${SERVICE_URL}/${VERSION}
});

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
      data: waveformData
    }
  };
}

function receiveWaveformDataFailure(mediaId, error) {
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
        apiClient.get(`/web-api/waveform-data/${mediaId}`).then((response) => {
          dispatch(receiveWaveformData(mediaId, response));
        }).catch((error) => {
          dispatch(receiveWaveformDataFailure(mediaId, error));
        })
      );
    }
  );
}
