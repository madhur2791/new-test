import {
    REQUEST_UPLOADED_FILES,
    RECEIVE_UPLOADED_FILES
} from '../constants/actionTypes';

const initialState = {};

function uploadedMediaFilesList(state = initialState, action) {
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
        isFetching: false,
        data: mediaFiles
      };
    }

    default:
      return state;
  }
}

export default uploadedMediaFilesList;
