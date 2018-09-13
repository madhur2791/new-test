import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone'

class FileUploader extends React.Component {
    constructor(props) {
        super(props);
        this.onDropRejected = this.onDropRejected.bind(this);
        this.onDropAccepted = this.onDropAccepted.bind(this);
    }

    onDropRejected(rejectedFiles) {
        console.log('rejetced',rejectedFiles[0].size);
    }

    onDropAccepted(acceptedFiles) {
        console.log('accepted',acceptedFiles[0].size);
        this.setState({
            showProgressBar: false
        })
        const formData = new FormData();
        formData.append('uploaded-media-file', acceptedFiles[0]);
        this.props.uploadMediaFile(formData);
    }

    render() {
        return (
            <div className="dropzone-contianer" >
                <Dropzone
                    name="uploaded-media-file"
                    onDropRejected={this.onDropRejected}
                    onDropAccepted={this.onDropAccepted}
                    multiple={false}
                    className="btn btn-primary upload-button"
                    accept="audio/*, video/*"
                    maxSize={40000000}
                >
                {this.props.children}
                </Dropzone>
            </div>
        );
    }
      /*if(!this.state.showProgressBar) {

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
      }*/

//   }
}



export default FileUploader;