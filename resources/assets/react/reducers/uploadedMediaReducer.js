import {
    REQUEST_UPLOADED_FILES,
    RECEIVE_UPLOADED_FILES,
    UPDATE_SELECTED_MEDIA_INDEX,
    REQUEST_CROP_MEDIA_FILE,
    CROP_MEDIA_FILE_SUCCESS,
    REQUEST_MEDIA_UPLOAD,
    MEDIA_UPLOAD_SUCCESS
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
        media_list: []
      };
    }
    case RECEIVE_UPLOADED_FILES: {
      const { payload: { mediaFiles } } = action;
      return {
        ...state,
        selectedMediaIndex: 0,
        isFetching: false,
        media_list: mediaFiles
      };
    }
    case UPDATE_SELECTED_MEDIA_INDEX: {
        const { payload: { selectedMediaIndex } } = action;
      return {
        ...state,
        selectedMediaIndex
      };
    }
    case REQUEST_CROP_MEDIA_FILE: {
      return {
        ...state,
        isCropping: true
      };
    }
    case CROP_MEDIA_FILE_SUCCESS: {
      return {
        ...state,
        isCropping: false
      };
    }
    case REQUEST_MEDIA_UPLOAD: {
      return {
        ...state,
        isUploading: true
      };
    }

    case MEDIA_UPLOAD_SUCCESS: {
      return {
        ...state,
        isUploading: false
      };
    }

    default:
      return state;
  }
}

export default uploadedMediaReducer;
