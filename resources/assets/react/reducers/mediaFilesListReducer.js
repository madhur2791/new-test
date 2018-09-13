import {
    REQUEST_UPLOADED_FILES,
    RECEIVE_UPLOADED_FILES,
    REQUEST_UPLOADED_FILES_ERROR,
    UPDATE_SELECTED_MEDIA_INDEX,
} from '../constants/actionTypes';

const initialState = {
    selectedMediaIndex: 0,
    isFetching: false
};

function uploadedMediaReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_UPLOADED_FILES: {
      return {
        ...state,
        isFetching: true
      };
    }
    case RECEIVE_UPLOADED_FILES: {
      const { payload: { mediaFiles } } = action;
      return {
        ...state,
        isFetching: false,
        data: mediaFiles
      };
    }
    case REQUEST_UPLOADED_FILES_ERROR: {
      const { payload: { error } } = action;
      return {
        ...state,
        isFetching: false,
        error
      };
    }
    case UPDATE_SELECTED_MEDIA_INDEX: {
        const { payload: { selectedMediaIndex } } = action;
      return {
        ...state,
        selectedMediaIndex
      };
    }

    default:
      return state;
  }
}

export default uploadedMediaReducer;
