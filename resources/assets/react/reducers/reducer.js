import { combineReducers } from 'redux';

import waveformReducer from './waveformReducer';
import colorPalletReducer from './colorPalletReducer';
import mediaFilesListReducer from './mediaFilesListReducer';
import uploadMediaFileReducer from './uploadMediaFileReducer';

const reducer = combineReducers({
  waveformData: waveformReducer,
  mediaFilesList: mediaFilesListReducer,
  uploadMediaFileRequest: uploadMediaFileReducer,
  colorPallets: colorPalletReducer
});

export default reducer;
