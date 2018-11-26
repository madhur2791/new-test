import React from 'react';
import HandleOutsideClick from '../../../../components/HandleOutsideClick/HandleOutsideClick.jsx';

class AudioRecorder extends React.Component {
    constructor(props) {
        super(props);
        this.handleShowRecordingRecord = this.handleShowRecordingRecord.bind(this);
        this.handleHideRecordingRecord = this.handleHideRecordingRecord.bind(this);
        this.handleStartAudioRecording = this.handleStartAudioRecording.bind(this);
        this.handleStopAudioRecording = this.handleStopAudioRecording.bind(this);
        this.uploadRecordedMedia = this.uploadRecordedMedia.bind(this);
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.state = {
            showRecorderPopup: false
        };
    }

    handleShowRecordingRecord() {
        this.setState({
            showRecorderPopup: true
        });
    }

    handleHideRecordingRecord() {
        this.setState({
            showRecorderPopup: false
        });
    }

    handleStartAudioRecording() {
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.start();


            this.mediaRecorder.addEventListener("dataavailable", event => {
                console.log('chunk available');
                this.audioChunks.push(event.data);
            });

            this.mediaRecorder.addEventListener("stop", () => {
                console.log('recording stopped');

            });
        }).catch((error) => {
            console.log(error);
        });
    }

    handleStopAudioRecording() {
        this.mediaRecorder.stop();
    }

    uploadRecordedMedia() {
        const audioBlob = new Blob(this.audioChunks);
        const formData = new FormData();
        formData.append('uploaded-media-file', audioBlob);
        this.props.uploadMediaFile(formData);
    }

    render() {
        let recorderPopup = '';
        if(this.state.showRecorderPopup === true) {
            recorderPopup = (
                <div className="recorder-popup">
                    <span onClick={this.handleHideRecordingRecord}>x</span>
                    <button onClick={this.handleStartAudioRecording}>Start Recording</button>
                    <button onClick={this.handleStopAudioRecording}>Stop Recording</button>
                    <button onClick={this.uploadRecordedMedia}>Upload Media</button>
                </div>
            );
        }
        return (
            <div className="dropzone-contianer" >
                <button
                    className="btn btn-primary record-audio-button"
                    onClick={this.handleShowRecordingRecord}
                >
                    Record Audio
                </button>
                <HandleOutsideClick
                    handleOutsideClick={this.handleHideRecordingRecord}
                >
                {recorderPopup}
                </HandleOutsideClick>
            </div>
        );
    }
}



export default AudioRecorder;
