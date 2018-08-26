import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone'


class FileUploader extends React.Component {
  constructor(props) {
    super(props);
    this.onDropRejected = this.onDropRejected.bind(this);
    this.onDropAccepted = this.onDropAccepted.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.state = {
        showProgressBar: false,
        progress: 0
    }
  }
  onProgress(progressEvent) {
    this.setState({
        progress: Math.round( (progressEvent.loaded * 100) / progressEvent.total )
    });
  }
  onDropRejected(rejectedFiles) {
    console.log(rejectedFiles[0].size);
  }
  onDropAccepted(acceptedFiles) {
    this.setState({
        showProgressBar: false
    })
    const formData = new FormData();
    console.log(acceptedFiles[0]);
    formData.append('uploaded-media-file', acceptedFiles[0]);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        },
        onUploadProgress: this.onProgress
    }
    axios.post('/web-api/media-upload', formData, config);
 }

  render() {
      if(!this.state.showProgressBar) {
        return (
            <div className="dropzone-contianer" >
                <Dropzone
                    name="uploaded-media-file"
                    onDropRejected={this.onDropRejected}
                    onDropAccepted={this.onDropAccepted}
                    multiple={false}
                    className="btn btn-primary upload-button"
                    accept={`${this.props.mediaType}/*`}
                    maxSize={40000000}
                >
                {this.props.children}
                </Dropzone>
            </div>
        );
      } else {
          return (
            <div className="progress-container" >
                <div className="progress">
                    <div className="progress-bar" role="progressbar" aria-valuenow="70"
                    aria-valuemin="0" aria-valuemax="100" style={{ width:`${this.state.progress}%` }}>
                        <span className="sr-only">70% Complete</span>
                    </div>
                </div>
            </div>
          )
      }

  }
}



export default FileUploader;
