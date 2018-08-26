import { combineReducers } from 'redux';

import waveformReducer from './waveformReducer';
import uploadedMediaFilesList from './uploadedMediaFilesListReducer';

const reducer = combineReducers({
  waveformData: waveformReducer,
  uploadedMediaFilesList: uploadedMediaFilesList
});

export default reducer;
