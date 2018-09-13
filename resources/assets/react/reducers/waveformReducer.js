import {
    REQUEST_WAVEFORM_DATA,
    RECEIVE_WAVEFORM_DATA,
    RECEIVE_WAVEFORM_DATA_FAILURE
} from '../constants/actionTypes';

const initialState = {};

function waveformData(state = initialState, action) {
  switch (action.type) {
    case REQUEST_WAVEFORM_DATA: {
      const { payload: { mediaId } } = action;
      return {
        ...state,
        [mediaId]: {
          isFetching: true
        }
      };
    }
    case RECEIVE_WAVEFORM_DATA: {
      const { payload: { mediaId, waveformData } } = action;
      return {
        ...state,
        [mediaId]: {
          isFetching: false,
          data: waveformData
        }
      };
    }
    case RECEIVE_WAVEFORM_DATA_FAILURE: {
      const { payload: { mediaId, error } } = action;
      return {
        ...state,
        [mediaId]: {
          isFetching: false,
          error
        }
      };
    }

    default:
      return state;
  }
}

export default waveformData;
