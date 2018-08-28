import { combineReducers } from 'redux';

import waveformReducer from './waveformReducer';
import uploadedMediaReducer from './uploadedMediaReducer';

const reducer = combineReducers({
  waveformData: waveformReducer,
  uploadedMediaFilesList: uploadedMediaReducer
});

export default reducer;
