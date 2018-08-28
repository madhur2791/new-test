import React from 'react';
import Sidebar from '../../../../components/SideBar/Sidebar.jsx';
import FileUploader from '../../../../components/FileUploader/FileUploader.jsx';

class UploadedFilesList extends React.Component {
    render() {
        if (this.props.uploadedMediaFilesList && this.props.uploadedMediaFilesList.isFetching === false) {
            return this.props.uploadedMediaFilesList.media_list.map((uploadedMedia, index) => {
                return (
                    <div
                        className={`col-md-12 media-file-element ${this.props.selectedMediaIndex === index ? 'active':''}`}
                        key={uploadedMedia.id}
                        onClick={() => (this.props.updateSelectedMediaIndex(index))}
                    >
                        {uploadedMedia.uploaded_file_name}<br />
                        {uploadedMedia.created_at}
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

export default UploadedFilesList;
