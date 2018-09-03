import {
    REQUEST_UPLOADED_FILES,
    RECEIVE_UPLOADED_FILES,
    REQUEST_UPLOADED_FILES_ERROR,
    UPDATE_SELECTED_MEDIA_INDEX,
} from '../constants/actionTypes';

const initialState = {
    selectedMediaIndex: 0
};

function uploadedMediaReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_UPLOADED_FILES: {
      return {
        ...state,
        isFetching: true,
        data: []
      };
    }
    case RECEIVE_UPLOADED_FILES: {
      const { payload: { mediaFiles } } = action;
      return {
        ...state,
        selectedMediaIndex: 0,
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
    // case REQUEST_CROP_MEDIA_FILE: {
    //   return {
    //     ...state,
    //     isCropping: true
    //   };
    // }
    // case CROP_MEDIA_FILE_SUCCESS: {
    //   return {
    //     ...state,
    //     isCropping: false
    //   };
    // }


    default:
      return state;
  }
}

export default uploadedMediaReducer;
