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
        this.clearRecording = this.clearRecording.bind(this);
        this.mediaRecorder = null;
        this.intervalObject = null;
        this.minimumAudioLength = 1;
        this.maximumAudioLength = 300;
        this.audioChunks = [];
        this.state = {
            showRecorderPopup: false,
            audioRecordInProgress: false,
            audioChunksSize: 0,
            timeLimitReached: false,
            recordedTime: 0
        };
    }

    handleShowRecordingRecord() {
        this.setState({
            showRecorderPopup: true
        });
    }

    handleHideRecordingRecord() {
        if(this.state.showRecorderPopup === true) {
            this.clearRecording();
        }
        this.setState({
            showRecorderPopup: false
        });
    }

    handleStartAudioRecording() {
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.start();
            this.setState({
                audioRecordInProgress: true
            });
            this.dataAvailableEventListener = (event) => {
                this.audioChunks.push(event.data);
                this.setState({
                    audioChunksSize: this.audioChunks.length
                });
            }
            this.mediaRecorder.addEventListener("dataavailable", this.dataAvailableEventListener);

            setTimeout(() => {
                this.setState({
                    timeLimitReached: true
                });
            }, this.maximumAudioLength * 1000);

            this.intervalObject = setInterval(() => {
                this.setState((prevState) => {
                    return {
                        recordedTime: prevState.recordedTime + 0.1
                    }
                });
            }, 100);
        }).catch((error) => {
            console.log(error);
        });
    }

    handleStopAudioRecording() {
        if(this.state.recordedTime > this.minimumAudioLength) {
            this.mediaRecorder.stop();
            if(this.intervalObject) {
                clearInterval(this.intervalObject);
            }
            this.setState({
                audioRecordInProgress: false
            });
        }
    }

    uploadRecordedMedia() {
        const audioBlob = new Blob(this.audioChunks);
        const formData = new FormData();
        formData.append('uploaded-media-file', audioBlob);
        this.props.uploadMediaFile(formData);
        this.clearRecording();
    }

    clearRecording() {
        this.audioChunks = [];
        if(this.mediaRecorder) {
            this.mediaRecorder.removeEventListener("dataavailable", this.dataAvailableEventListener);
        }
        if(this.intervalObject) {
            clearInterval(this.intervalObject);
        }
        this.setState({
            audioRecordInProgress: false,
            audioChunksSize: 0,
            showRecorderPopup: false,
            timeLimitReached: false,
            recordedTime: 0
        });
    }

    render() {
        let recorderPopup = '';
        let recorgindButtons = '';
        if(this.state.audioRecordInProgress === true && this.state.timeLimitReached === false) {
            recorgindButtons = (
                <button
                    onClick={this.handleStopAudioRecording}
                    className="btn btn-primary recorder-stop-record-button"
                >
                    Stop Recording
                </button>
            );
        } else if (this.state.audioRecordInProgress === false && this.state.audioChunksSize === 0 && this.state.timeLimitReached === false) {
            recorgindButtons = (
                <button
                    onClick={this.handleStartAudioRecording}
                    className="btn btn-primary recorder-start-record-button"
                >
                    Start Recording
                </button>
            );
        } else {
            recorgindButtons = (
                <button
                        onClick={this.uploadRecordedMedia}
                        className="btn btn-primary recorder-upload-audio-button"
                    >
                        Upload Media
                    </button>
            );
        }

        if(this.state.showRecorderPopup === true) {
            recorderPopup = (
                <div className="audio-recorder-overlay">
                    <div className="recorder-popup">
                        <h4>Click on the below button to start recording</h4>
                        <span>We need permission to use your microphone. Click on the below button and approve the permission to start recording.</span>
                        <div>(min 1 sec, max 5 min)</div>
                        <div>
                            <span
                                onClick={this.handleHideRecordingRecord}
                                className="recorder-close-button"
                            >
                            x
                            </span>
                        </div>
                        <h2>{parseInt(this.state.recordedTime / 60, 10)} : {(Math.round(this.state.recordedTime * 100) / 100 % 60).toFixed(1)}</h2>
                        {recorgindButtons}
                        <div className="audio-recorder-cancel-button-container">
                            <span
                                className="audio-recorder-cancel-button"
                                onClick={this.handleHideRecordingRecord}
                            >
                                cancel
                            </span>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="dropzone-contianer" >
                <button
                    className="btn btn-primary record-audio-button"
                    onClick={this.handleShowRecordingRecord}
                    style={{
                        borderRadius: "0px",
                        padding: "5px 30px"
                    }}
                >
                    <span style={{
                        display: "block"
                    }}>Record</span>
                    <label style={{
                        display: "block",
                        fontSize: "10px",
                        textTransform: "none"
                    }}>(Any Sound)</label>
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
