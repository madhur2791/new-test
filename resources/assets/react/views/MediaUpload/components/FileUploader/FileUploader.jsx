import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone'

class FileUploader extends React.Component {
    constructor(props) {
        super(props);
        this.onDropRejected = this.onDropRejected.bind(this);
        this.onDropAccepted = this.onDropAccepted.bind(this);
        this.closeCropAssistPopup = this.closeCropAssistPopup.bind(this);
        this.state = {
            showCropAssistPopup: false
        };
    }

    onDropRejected(rejectedFiles) {
        this.setState({
            showCropAssistPopup: true
        });
    }

    closeCropAssistPopup() {
        this.setState({
            showCropAssistPopup: false
        });
    }

    onDropAccepted(acceptedFiles) {
        console.log('accepted',acceptedFiles[0].size);
        const formData = new FormData();
        formData.append('uploaded-media-file', acceptedFiles[0]);
        this.props.uploadMediaFile(formData);
    }

    render() {
        let cropAssistPopup = null;
        if (this.state.showCropAssistPopup === true) {
            cropAssistPopup = <div className="colorPalletPopupOverlay">
                                <div className="colorPalletPopup">
                                    <div
                                        className="colorPalletPopupClose"
                                        onClick={this.closeCropAssistPopup}
                                    >x</div>
                                    You file size is more than 40mb, Please follow the instruction in <a href="https://audiotrimmer.com" target="_blank">https://audiotrimmer.com</a> to get your audio file cropped
                                </div>
                            </div>;
        }
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
                    style={{
                        borderRadius: "0px",
                        padding: "5px 30px"
                    }}
                >
                {this.props.children}
                </Dropzone>
                {cropAssistPopup}
            </div>
        );
    }
}



export default FileUploader;
