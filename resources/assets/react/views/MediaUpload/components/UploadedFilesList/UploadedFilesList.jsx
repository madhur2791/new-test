import React from 'react';
import Sidebar from '../../../../components/SideBar/Sidebar.jsx';
import FileUploader from '../../../../components/FileUploader/FileUploader.jsx';

class MediaUpload extends React.Component {
    componentDidMount() {
        const {
            getUploadedMediaFiles
        } = this.props;

        getUploadedMediaFiles();
    }
    render() {
        console.log("aaaa", this.props.uploadedMediaFilesList.uploadedMediaFilesList);
        if (this.props.uploadedMediaFilesList && this.props.uploadedMediaFilesList.isFetching === false) {
            return this.props.uploadedMediaFilesList.data.map((uploadedMedia) => {
                return (
                    <div key={uploadedMedia.id}>
                        {uploadedMedia.uploaded_file_name}
                    </div>
                )
            });
        } else {
            return (
                <div>Loading</div>
            )
        }
    }
}

export default MediaUpload;
