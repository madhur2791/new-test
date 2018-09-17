import {
    REQUEST_MEDIA_FILE_DATA,
    RECEIVE_MEDIA_FILE_DATA,
    RECEIVE_MEDIA_FILE_DATA_FAILURE,
    CHANGE_WAVEFORM_COLOR,
    CHANGE_WAVEFORM_STYLE,
    CHANGE_WAVEFORM_TEXT,
    CHANGE_WAVEFORM_QR_CODE
} from '../constants/actionTypes';

const initialState = {};

function waveformData(state = initialState, action) {
  switch (action.type) {
    case REQUEST_MEDIA_FILE_DATA: {
      const { payload: { mediaId } } = action;
      return {
        ...state,
        [mediaId]: {
          isFetching: true
        }
      };
    }
    case RECEIVE_MEDIA_FILE_DATA: {
      const { payload: { mediaId, mediaFileData } } = action;
      return {
        ...state,
        [mediaId]: {
          isFetching: false,
          data: mediaFileData
        }
      };
    }
    case RECEIVE_MEDIA_FILE_DATA_FAILURE: {
      const { payload: { mediaId, error } } = action;
      return {
        ...state,
        [mediaId]: {
          isFetching: false,
          error
        }
      };
    }

    case CHANGE_WAVEFORM_COLOR: {
      const { payload: { mediaId, waveformColor } } = action;
      const newState = Object.assign({}, state);
      newState[mediaId].data.current_waveform_style.waveform_color =
        Object.assign(
            newState[mediaId].data.current_waveform_style.waveform_color,
            waveformColor
        );
      return newState;
    }

    case CHANGE_WAVEFORM_STYLE: {
      const { payload: { mediaId, waveformStyle } } = action;
      const newState = Object.assign({}, state);
      newState[mediaId].data.current_waveform_style.waveform_style =
        Object.assign(
            newState[mediaId].data.current_waveform_style.waveform_style,
            waveformStyle
        );
      return newState;
    }

    case CHANGE_WAVEFORM_TEXT: {
      const { payload: { mediaId, waveformText } } = action;
      const newState = Object.assign({}, state);
      newState[mediaId].data.current_waveform_style.waveform_text =
        Object.assign(
            newState[mediaId].data.current_waveform_style.waveform_text,
            waveformText
        );
      return newState;
    }

    case CHANGE_WAVEFORM_QR_CODE: {
      const { payload: { mediaId, qrCodeDetails } } = action;
      const newState = Object.assign({}, state);
      newState[mediaId].data.current_waveform_style.waveform_qr_code =
        Object.assign(
            newState[mediaId].data.current_waveform_style.waveform_qr_code,
            qrCodeDetails
        );
      return newState;
    }

    default:
      return state;
  }
}

export default waveformData;
