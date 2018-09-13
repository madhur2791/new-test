import {
    REQUEST_UPLOADED_FILES,
    RECEIVE_UPLOADED_FILES,
    REQUEST_UPLOADED_FILES_ERROR,
    UPDATE_SELECTED_MEDIA_INDEX,
    REQUEST_CROP_MEDIA_FILE,
    CROP_MEDIA_FILE_SUCCESS,
    CROP_MEDIA_FILE_ERROR,
    REQUEST_MEDIA_UPLOAD,
    MEDIA_UPLOAD_SUCCESS,
    MEDIA_UPLOAD_ERROR,
    MEDIA_UPLOAD_PROGRESS,
    REQUEST_MEDIA_FILE_DATA,
    RECEIVE_MEDIA_FILE_DATA,
    RECEIVE_MEDIA_FILE_DATA_FAILURE
} from '../constants/actionTypes';

import { fetchWaveformData } from './waveformAction';

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
            response.data.forEach((mediaFile) => {
                dispatch(requestMediaFileSuccess(mediaFile.media_id, mediaFile));
            });
            response.data.forEach((mediaFile) => {
                dispatch(requestMediaFileSuccess(mediaFile.media_id, mediaFile));
            });
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

function mediaUploadProgress(progressPercentage) {
  return {
    type: MEDIA_UPLOAD_PROGRESS,
    payload: {
        progressPercentage
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
                const progressPercentage = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
                dispatch(mediaUploadProgress(progressPercentage))
            }
        }

      return (
        axios.post('/web-api/media-files', requestBody, config)
        .then((response) => {
            dispatch(mediaUploadSuccess());
            dispatch(receiveUploadedMediaFiles(response.data));
            response.data.forEach((mediaFile) => {
                dispatch(requestMediaFileSuccess(mediaFile.media_id, mediaFile));
            });
            dispatch(updateSelectedMediaIndex(0))
        }).catch((error) => {
          dispatch(mediaUploadError(error));
        })
      );
    }
  );
}

function requestCropMediaFiles(mediaId) {
  return {
    type: REQUEST_CROP_MEDIA_FILE,
    payload: {
        mediaId
    }
  };
}

function cropMediaFileSuccess(mediaId) {
  return {
    type: CROP_MEDIA_FILE_SUCCESS,
    payload: {
        mediaId
    }
  };
}

function cropMediaFileError(mediaId, error) {
  return {
    type: CROP_MEDIA_FILE_ERROR,
    payload: {
        mediaId,
        error
    }
  };
}

export function cropMediaFile(mediaId, startTime, endTime) {
    return (
    (dispatch) => {
      dispatch(requestCropMediaFiles(mediaId));
      console.log('crop api called');
      return (
        axios.post(`/web-api/media-files/${mediaId}/crop`, {
            startTime,
            endTime
        }).then((response) => {
            console.log('1');
          dispatch(cropMediaFileSuccess(mediaId));
          console.log('2');
          dispatch(receiveUploadedMediaFiles(response.data));
          console.log('3');
          response.data.forEach((mediaFile) => {
                dispatch(requestMediaFileSuccess(mediaFile.media_id, mediaFile));
            });
            console.log('4');
          dispatch(fetchWaveformData(mediaId));
        }).catch((error) => {
          dispatch(cropMediaFileError(mediaId, error));
        })
      );
    }
  );
}


function requestMediaFile(mediaId) {
  return {
    type: REQUEST_MEDIA_FILE_DATA,
    payload: {
        mediaId
    }
  };
}

function requestMediaFileSuccess(mediaId, mediaFileData) {
  return {
    type: RECEIVE_MEDIA_FILE_DATA,
    payload: {
        mediaId,
        mediaFileData
    }
  };
}

function requestMediaFileError(mediaId, error) {
  return {
    type: RECEIVE_MEDIA_FILE_DATA_FAILURE,
    payload: {
        mediaId,
        error
    }
  };
}


export function fetchMediaFile(mediaId) {
    return (
    (dispatch) => {
      dispatch(requestMediaFile(mediaId));
      return (
        axios.get(`/web-api/media-files/${mediaId}`).then((response) => {
          dispatch(requestMediaFileSuccess(mediaId, response.data));
        }).catch((error) => {
          dispatch(requestMediaFileError(mediaId, error));
        })
      );
    }
  );
}

export function fetchMediaFileIfNeeded(mediaId) {
    return (
    (dispatch, getState) => {
        const state = getState();
        if(
          !(state.mediaFileData &&
            state.mediaFileData[mediaId])
        ) {
            dispatch(fetchMediaFile(mediaId));
        }
    }
  );
}
