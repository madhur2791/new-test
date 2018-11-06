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
            error: null
        }
        this.onProgress = this.onProgress.bind(this);
        this.onBuffer = this.onBuffer.bind(this);
        this.onDuration = this.onDuration.bind(this);
        this.handlePlayPauseClick = this.handlePlayPauseClick.bind(this);
        this.onEnded = this.onEnded.bind(this);
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
        const {match} = this.props;
        this.setState({
                requestingMediaFileData: true
            });
        axios.get(`/media-file-data/${match.params.waveformId}`).then((response) => {
            this.setState({
                requestingMediaFileData: false,
                mediaFileData: response.data
            });
        }).catch((error) => {
            this.setState({
                error: 'Page Not Found'
            });
        });
    }

    render() {
        if(this.state.mediaFileData && !this.state.error) {
            return (
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="mediaPlayerContainer">
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
        }
        return <div />
    }
}

export default MediaPlayer;
