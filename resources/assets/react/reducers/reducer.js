import { combineReducers } from 'redux';

import waveformReducer from './waveformReducer';
import colorPalletReducer from './colorPalletReducer';
import mediaFilesListReducer from './mediaFilesListReducer';
import mediaFileDataReducer from './mediaFileDataReducer';
import uploadMediaFileReducer from './uploadMediaFileReducer';
import cropMediaFileReducer from './cropMediaFileReducer';
import priceListsReducer from './priceListsReducer';

const reducer = combineReducers({
  waveformData: waveformReducer,
  mediaFileData: mediaFileDataReducer,
  mediaFilesList: mediaFilesListReducer,
  uploadMediaFileRequest: uploadMediaFileReducer,
  cropMediaFileRequest: cropMediaFileReducer,
  colorPallets: colorPalletReducer,
  priceList: priceListsReducer
});

export default reducer;
