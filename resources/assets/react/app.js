import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import MediaUpload from './views/MediaUpload/MediaUpload.jsx';
import MediaEdit from './views/MediaEdit/MediaEdit.jsx';
import WaveformContainer from './views/WaveformEdit/WaveformContainer.jsx';
import { Provider } from 'react-redux';
import store from './stores/store';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFillDrip, faUpload } from '@fortawesome/free-solid-svg-icons'


library.add(faFillDrip);
library.add(faUpload);

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
        <BrowserRouter>
            <Switch>
                <Route path="/create" component={MediaUpload} exact />
                <Route path="/create/:mediaId/edit" component={MediaEdit} exact />
                <Route path="/create/:mediaId/waveform" component={WaveformContainer} exact />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('react-root')
);

