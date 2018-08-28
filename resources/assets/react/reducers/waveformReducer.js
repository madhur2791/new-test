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
          isFetching: true,
          data: []
        }
      };
    }
    case RECEIVE_WAVEFORM_DATA: {
      const { payload: { mediaId, data } } = action;
      return {
        ...state,
        [mediaId]: {
          isFetching: false,
          data
        }
      };
    }


    default:
      return state;
  }
}

export default waveformData;
