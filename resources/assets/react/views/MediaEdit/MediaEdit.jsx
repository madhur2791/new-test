import React from 'react';
import Sidebar from '../../components/SideBar/Sidebar.jsx';
import MediaEditor from '../../components/MediaEditor/MediaEditor.jsx';

class MediaEdit extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3"><Sidebar /></div>
                    <div className="col-md-9"><MediaEditor /></div>
                </div>
            </div>
        )
    }
}

export default MediaEdit;
