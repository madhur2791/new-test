import React from 'react';

class UploadedFilesList extends React.Component {
    render() {
        if (this.props.mediaFilesList && this.props.mediaFilesList.isFetching === false) {
            return this.props.mediaFilesList.data.map((uploadedMedia, index) => {
                return (
                    <div
                        className={`col-md-12 media-file-element ${this.props.mediaFilesList.selectedMediaIndex === index ? 'active':''}`}
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
