import React from 'react';
import ReactPlayer from 'react-player'

class MediaPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestingMediaFileData: true,
            isPlaying: false,
            buffered: 0,
            played: 0,
            error: null,
            passwordRequired: false,
            qrCodePassword: '',
            passwordError: '',
            passwordSent: false
        }
        this.onProgress = this.onProgress.bind(this);
        this.onBuffer = this.onBuffer.bind(this);
        this.onDuration = this.onDuration.bind(this);
        this.handlePlayPauseClick = this.handlePlayPauseClick.bind(this);
        this.onEnded = this.onEnded.bind(this);
        this.passwordTextHandler = this.passwordTextHandler.bind(this);
        this.getMediaFileData = this.getMediaFileData.bind(this);
        this.getMediaFileWithDataWithPasswod = this.getMediaFileWithDataWithPasswod.bind(this);
    }

    handlePlayPauseClick(e) {
        e.preventDefault();
        this.setState((prevState) => {
            if(prevState.endTime <= prevState.currentTime) {
                return {
                    isPlaying: false
                };
            }
            return {
                isPlaying: !prevState.isPlaying
            };
        });
   }

   passwordTextHandler(event) {
        this.setState({
            qrCodePassword: event.target.value
        });
    }

   onEnded(state) {
       this.setState({
           isPlaying: false
       })
   }

   onProgress(state) {
        this.setState({
            played: state.played * 100,
            buffered: state.loaded * 100
        });
    }

    onBuffer(state) {
        console.log('buffer', state);
    }
    onDuration(state) {
        console.log('duration', state);
    }

    componentDidMount() {
        this.setState({
            requestingMediaFileData: true
        });
        this.getMediaFileData();
    }

    getMediaFileWithDataWithPasswod() {
        this.setState({
            passwordSent: true
        });
        this.getMediaFileData();
    }
    getMediaFileData() {
        const {match} = this.props;
        return axios.post(`/media-file-data/${match.params.waveformId}`, {
            password: this.state.qrCodePassword
        }).then((response) => {
            if(response.data.statusCode === 4003 && this.state.passwordSent === false) {
                this.setState({
                    requestingMediaFileData: false,
                    passwordRequired: true
                });
            } else if (response.data.statusCode === 4003) {
                this.setState({
                    requestingMediaFileData: false,
                    passwordRequired: true,
                    passwordError: 'Invalid Password'
                });
            } else {
                this.setState({
                    requestingMediaFileData: false,
                    mediaFileData: response.data,
                    passwordRequired: false
                });
            }
        }).catch((error) => {
            this.setState({
                error: 'Page Not Found'
            });
        });
    }

    render() {
        if(this.state.mediaFileData && !this.state.error && this.state.passwordRequired === false) {
            return (
                <div className="row media-player-page">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="mediaPlayerContainer">
                            <div className="media-player-waveform-container">
                                <img
                                    className="media-player-waveform"
                                    src={`/generated-images/${this.state.mediaFileData.order_line_item.generated_image_url}`}
                                />
                            </div>
                            <ReactPlayer
                                url={`${this.state.mediaFileData.baseUrl}/${this.state.mediaFileData.waveform.media_file.displayed_media_file_url}`}
                                onProgress={this.onProgress}
                                onBuffer={this.onBuffer}
                                width='100%'
                                height='100%'
                                progressInterval={1}
                                ref={this.ref}
                                playing={this.state.isPlaying}
                                onDuration={this.onDuration}
                                onEnded={this.onEnded}
                            />
                            <div className="mediaPlayerControlsContainer">
                                <div
                                    className="bar playerBar"
                                />
                                <div
                                    className="bar bufferBar"
                                    style={{
                                        width: `${this.state.buffered}%`
                                    }}
                                />
                                <div
                                    className="bar progressBar"
                                    style={{
                                        width: `${this.state.played}%`
                                    }}
                                />
                                <div className="media-controls">
                                    <div
                                        className="play-pause-button"
                                        onClick={this.handlePlayPauseClick}
                                        style={this.state.isPlaying ? {
                                            backgroundPositionX: "-45px"
                                        }: {}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.error) {
            return <div> {this.state.error} </div>;
        } else if (this.state.passwordRequired === true) {
            return (
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="mediaPlayerContainer">
                            <div className="colorPalletNameInputContainer form-group">
                                <label>Enter the password</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter Password"
                                    value={this.state.qrCodePassword}
                                    onChange={this.passwordTextHandler}
                                />
                                <div style={{color: "red"}}>
                                {
                                    this.state.passwordError
                                }
                                </div>
                                <input
                                    className="btn btn-primary mediaPlayerSubmitPasswordButton"
                                    type="submit"
                                    value="Submit"
                                    onClick={this.getMediaFileWithDataWithPasswod}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return <div>
            <div className="waveform-loader col-lg-12 col-md-12 col-sm-12">
                <div className="loader-image-container" >
                    <img className="loader-image" src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Spin-1s-200px.svg" /><br />
                    Fetching Waveform...
                </div>
            </div>
        </div>
    }
}

export default MediaPlayer;
