import {
  REQUEST_UPLOADED_FILES,
  RECEIVE_UPLOADED_FILES,
  UPDATE_SELECTED_MEDIA_INDEX,
  REQUEST_CROP_MEDIA_FILE,
  CROP_MEDIA_FILE_SUCCESS,
  REQUEST_MEDIA_UPLOAD,
  MEDIA_UPLOAD_SUCCESS
} from '../constants/actionTypes';
import apiModule from '../api/index';

const { apiClient } = apiModule({
  apiPrefix: '/' //${SERVICE_URL}/${VERSION}
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

function updateSelectedMediaIndex(selectedMediaIndex) {
  return {
    type: UPDATE_SELECTED_MEDIA_INDEX,
    payload: {
      selectedMediaIndex
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

export function changeSelectedMediaIndex(selectedMediaIndex) {
    return (
    (dispatch) => {
        return dispatch(updateSelectedMediaIndex(selectedMediaIndex));
    })
}

function requestCropMediaFiles() {
  return {
    type: REQUEST_CROP_MEDIA_FILE,
    payload: {}
  };
}

function cropMediaFileSuccess() {
  return {
    type: CROP_MEDIA_FILE_SUCCESS,
    payload: {}
  };
}

export function cropMediaFile(mediaId, startTime, endTime) {
    return (
    (dispatch) => {
      dispatch(requestCropMediaFiles());
      return (
        axios.post(`/web-api/media/${mediaId}/edit`, {
            startTime,
            endTime
        }).then((response) => {
          dispatch(cropMediaFileSuccess());
          dispatch(receiveUploadedMediaFiles(response.data));
        }).catch((error) => {
          console.log(error);
        })
      );
    }
  );
}


function requestMediaUpload() {
  return {
    type: REQUEST_MEDIA_UPLOAD,
    payload: {}
  };
}

function mediaUploadSuccess() {
  return {
    type: MEDIA_UPLOAD_SUCCESS,
    payload: {}
  };
}


export function uploadMediaFile(requestBody, onProgress = () => {}) {
  return (
    (dispatch) => {
      dispatch(requestMediaUpload());
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            },
            onUploadProgress: onProgress
        }

      return (
        axios.post('/web-api/media-upload', requestBody, config)
        .then((response) => {
            dispatch(mediaUploadSuccess());
            dispatch(receiveUploadedMediaFiles(response.data));
        }).catch((error) => {
          console.log(error);
        })
      );
    }
  );
}
