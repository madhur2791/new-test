import {
  REQUEST_UPLOADED_FILES,
  RECEIVE_UPLOADED_FILES
} from '../constants/actionTypes';
import apiModule from '../api/index';

const { apiClient } = apiModule({
  apiPrefix: 'http://127.0.0.1:8000' //${SERVICE_URL}/${VERSION}
});

function requestUploadedMediaFiles() {
  return {
    type: REQUEST_UPLOADED_FILES,
    payload: {}
  };
}

function receiveUploadedMediaFiles(mediaFiles) {
  return {
    type: RECEIVE_UPLOADED_FILES,
    payload: {
      mediaFiles
    }
  };
}

export function fetchUploadedMediaFiles() {
  return (
    (dispatch) => {
      dispatch(requestUploadedMediaFiles());
      return (
        apiClient.get(`/web-api/media-files`).then((response) => {
          dispatch(receiveUploadedMediaFiles(response));
        }).catch((error) => {
          console.log(error);
        })
      );
    }
  );
}
