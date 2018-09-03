import {
  REQUEST_UPLOADED_FILES,
  RECEIVE_UPLOADED_FILES,
  REQUEST_UPLOADED_FILES_ERROR,
  UPDATE_SELECTED_MEDIA_INDEX,
//   REQUEST_CROP_MEDIA_FILE,
//   CROP_MEDIA_FILE_SUCCESS,
  REQUEST_MEDIA_UPLOAD,
  MEDIA_UPLOAD_SUCCESS,
  MEDIA_UPLOAD_ERROR,
  MEDIA_UPLOAD_PROGRESS
} from '../constants/actionTypes';


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

function requestUploadedMediaFilesError(error) {
  return {
    type: REQUEST_UPLOADED_FILES_ERROR,
    payload: {
        error
    }
  };
}

export function fetchUploadedMediaFiles() {
  return (
    (dispatch) => {
      dispatch(requestUploadedMediaFiles());
      return (
        axios.get(`/web-api/media-files`).then((response) => {
          dispatch(receiveUploadedMediaFiles(response.data));
        }).catch((error) => {
          dispatch(requestUploadedMediaFilesError(error));
        })
      );
    }
  );
}

function updateSelectedMediaIndex(selectedMediaIndex) {
  return {
    type: UPDATE_SELECTED_MEDIA_INDEX,
    payload: {
      selectedMediaIndex
    }
  };
}

export function changeSelectedMediaIndex(selectedMediaIndex) {
    return (
    (dispatch) => {
        return dispatch(updateSelectedMediaIndex(selectedMediaIndex));
    })
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

function mediaUploadProgress(progressEvent) {
  return {
    type: MEDIA_UPLOAD_PROGRESS,
    payload: {
        progressEvent
    }
  };
}

function mediaUploadError(error) {
  return {
    type: MEDIA_UPLOAD_ERROR,
    payload: {
        error
    }
  };
}


export function uploadMediaFile(requestBody) {
  return (
    (dispatch) => {
      dispatch(requestMediaUpload());
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                dispatch(mediaUploadProgress(progressEvent))
            }
        }

      return (
        axios.post('/web-api/media-upload', requestBody, config)
        .then((response) => {
            dispatch(mediaUploadSuccess());
            dispatch(receiveUploadedMediaFiles(response.data));
        }).catch((error) => {
          dispatch(mediaUploadError(error));
        })
      );
    }
  );
}

// function requestCropMediaFiles() {
//   return {
//     type: REQUEST_CROP_MEDIA_FILE,
//     payload: {}
//   };
// }

// function cropMediaFileSuccess() {
//   return {
//     type: CROP_MEDIA_FILE_SUCCESS,
//     payload: {}
//   };
// }

// export function cropMediaFile(mediaId, startTime, endTime) {
//     return (
//     (dispatch) => {
//       dispatch(requestCropMediaFiles());
//       return (
//         axios.post(`/web-api/media/${mediaId}/edit`, {
//             startTime,
//             endTime
//         }).then((response) => {
//           dispatch(cropMediaFileSuccess());
//           dispatch(receiveUploadedMediaFiles(response.data));
//         }).catch((error) => {
//           console.log(error);
//         })
//       );
//     }
//   );
// }


