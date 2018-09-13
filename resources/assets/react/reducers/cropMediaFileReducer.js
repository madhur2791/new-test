import {
    REQUEST_CROP_MEDIA_FILE,
    CROP_MEDIA_FILE_SUCCESS,
    CROP_MEDIA_FILE_ERROR
} from '../constants/actionTypes';

const initialState = {};

function cropMediaFileReducer(state = initialState, action) {
  switch (action.type) {

    case REQUEST_CROP_MEDIA_FILE: {
        const { payload: { mediaId } } = action;
      return {
        ...state,
        [mediaId]: {
            isRequesting: true
        }
      };
    }

    case CROP_MEDIA_FILE_SUCCESS: {
      const { payload: { mediaId } } = action;
      return {
        ...state,
        [mediaId]: {
            isRequesting: false
        }
      };
    }

    case CROP_MEDIA_FILE_ERROR: {
      const { payload: { mediaId, error } } = action;
      return {
        ...state,
        [mediaId]: {
            isRequesting: false,
            error
        }
      };
    }

    default:
      return state;
  }
}

export default cropMediaFileReducer;
