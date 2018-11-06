import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import MediaUploadContainer from './views/MediaUpload/MediaUploadContainer.jsx';
import WaveformColorContainer from './views/WaveformColor/WaveformColorContainer.jsx';
import WaveformStyleContainer from './views/WaveformStyle/WaveformStyleContainer.jsx';
import WaveformTextContainer from './views/WaveformText/WaveformTextContainer.jsx';
import WaveformQRCodeContainer from './views/WaveformQRCode/WaveformQRCodeContainer.jsx';
import WaveformPrintOptionContainer from './views/WaveformPrintOptions/WaveformPrintOptionContainer.jsx';
import MediaPlayer from './views/MediaPlayer/MediaPlayer.jsx';
import { Provider } from 'react-redux';
import store from './stores/store';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faFillDrip,
    faUpload,
    faVolumeUp,
    faCogs,
    faFont,
    faQrcode,
    faPrint,
    faChartBar,
    faChartLine,
    faSun
} from '@fortawesome/free-solid-svg-icons'

library.add(faFillDrip);
library.add(faUpload);
library.add(faVolumeUp);
library.add(faFont);
library.add(faCogs);
library.add(faQrcode);
library.add(faPrint);
library.add(faChartBar);
library.add(faChartLine);
library.add(faSun);

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename="/waveform">
            <Switch>
                <Route path="/play-media/:waveformId" component={MediaPlayer} exact />
                <Route path="/upload" component={MediaUploadContainer} exact />
                <Route path="/:mediaId/color" component={WaveformColorContainer} exact />
                <Route path="/:mediaId/style" component={WaveformStyleContainer} exact />
                <Route path="/:mediaId/text" component={WaveformTextContainer} exact />
                <Route path="/:mediaId/qr-code" component={WaveformQRCodeContainer} exact />
                <Route path="/:mediaId/print-option" component={WaveformPrintOptionContainer} exact />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('react-root')
);

