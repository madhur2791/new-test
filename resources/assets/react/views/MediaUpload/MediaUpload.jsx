import React from 'react';
import Sidebar from '../../components/SideBar/Sidebar.jsx';
import FileUploader from '../../components/FileUploader/FileUploader.jsx';
import UploadedFilesListContainer from './components/UploadedFilesList/UploadedFilesListContainer.jsx';

class MediaUpload extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar>
                            <div className="row">
                                <div className="col-md-6 upload-button-container">
                                    <FileUploader mediaType="audio" >
                                        Upload<br/> Audio
                                    </FileUploader>
                                </div>
                                <UploadedFilesListContainer />
                            </div>
                        </Sidebar>
                    </div>
                    <div className="col-md-9"></div>
                </div>
            </div>
        )
    }
}

export default MediaUpload;
