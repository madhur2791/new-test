import {
    REQUEST_MEDIA_UPLOAD,
    MEDIA_UPLOAD_SUCCESS,
    MEDIA_UPLOAD_ERROR,
    MEDIA_UPLOAD_PROGRESS
} from '../constants/actionTypes';

const initialState = {
    isRequesting: false
};

function uploadMediaFileReducer(state = initialState, action) {
  switch (action.type) {

    case REQUEST_MEDIA_UPLOAD: {
      return {
        ...state,
        isRequesting: true
      };
    }

    case MEDIA_UPLOAD_SUCCESS: {
      return {
        ...state,
        isRequesting: false
      };
    }

    case MEDIA_UPLOAD_ERROR: {
      const { payload: { error } } = action;
      return {
        ...state,
        isRequesting: false,
        error
      };
    }

    case MEDIA_UPLOAD_PROGRESS: {
      const { payload: { progressEvent } } = action;
      return {
        ...state,
        isRequesting: true,
        progressEvent
      };
    }

    default:
      return state;
  }
}

export default uploadMediaFileReducer;
