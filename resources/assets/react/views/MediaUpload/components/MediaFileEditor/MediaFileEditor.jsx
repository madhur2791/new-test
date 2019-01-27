import React from 'react';
import ReactPlayer from 'react-player'
import Slider, { Range } from 'rc-slider';
import SVGWaveformRenderer from '../../../../components/SVGWaveformRenderer/SVGWaveformRenderer.jsx';


const horizantalMarginPercentage = 7.5;
const totalWidthPercentage = 100 - (2 * horizantalMarginPercentage);
const audioSeekerWidthFactor = totalWidthPercentage / 100;
class MediaEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        startTime: 0,
        endTime: 100,
        currentTime: 0,
        isPlaying: false,
        duration: 0,
        pushable: 1,
        sliderRangeKey: 10000
    };
    this.onProgress = this.onProgress.bind(this);
    this.ref = this.ref.bind(this);
    this.onRangeChange = this.onRangeChange.bind(this);
    this.handlePlayPauseClick = this.handlePlayPauseClick.bind(this);
    this.cropMediaFile = this.cropMediaFile.bind(this);
    this.onDuration = this.onDuration.bind(this);
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

  onDuration(duration) {
    const pushableValue = 100 / duration;
    this.setState({
        duration,
        pushable: pushableValue >= 100 ? 100 : pushableValue
    });
  }

  onEnded() {
    this.setState((prevState) => {

        this.player.seekTo(prevState.startTime / 100);
        return {
            currentTime: prevState.startTime,
            isPlaying: false
        };
    });
  }

  onProgress(state) {
    this.setState((prevState) => {
        const currentState = {
            currentTime: state.played * 100
        };
        if(prevState.endTime <= prevState.currentTime) {
            this.player.seekTo(prevState.startTime / 100);
            currentState.isPlaying = false
        }
        return currentState;
    });
  }

  onRangeChange(changedRange) {
    this.setState((prevState) => {

        if(prevState.startTime != changedRange[0] || prevState.endTime != changedRange[1]) {
            this.player.seekTo(changedRange[0] / 100);
        }
        return {
            startTime: changedRange[0],
            currentTime: changedRange[0],
            endTime: changedRange[1]
        }
    });
  }

  cropMediaFile (e) {
    e.preventDefault();
    const startTime = (this.state.duration * this.state.startTime) / 100;
    const endTime = (this.state.duration * this.state.endTime) / 100;
    if((startTime !== 0 || endTime !== 0)){
        this.props.cropMediaFile(this.props.mediaFileId, startTime, endTime);
    }
  }

  componentWillReceiveProps(props) {
    if(props.showCroppingLoader === false && this.props.showCroppingLoader === true) {
        this.setState({
            startTime: 0,
            endTime: 100,
            currentTime: 0
        });
    }

    if(
        props.mediaFileId &&
        props.cropMediaFileRequest[props.mediaFileId] &&
        this.props.cropMediaFileRequest[props.mediaFileId] &&
        this.props.cropMediaFileRequest[props.mediaFileId].isRequesting === true &&
        props.cropMediaFileRequest[props.mediaFileId].isRequesting === false

    ) {
        this.state.sliderRangeKey += 1;
    }
  }

  ref(player) {
    this.player = player
  }

  render() {
    const { waveformCurrentStyles, waveformData, isCropped } = this.props;
    const startSeconds = Math.round(this.state.startTime * this.state.duration) / 100;
    const endSeconds = Math.round(this.state.endTime * this.state.duration) / 100;
    const startTime = {
        minutes: Math.floor(startSeconds / 60),
        seconds: Math.round(startSeconds - (Math.floor(startSeconds / 60)  * 60))
    }

    const endTime = {
        minutes: Math.floor(endSeconds / 60),
        seconds: Math.round(endSeconds - (Math.floor(endSeconds / 60)  * 60))
    }

    const wavefromColor = waveformCurrentStyles.waveform_color;
    const wavefromStyle = waveformCurrentStyles.waveform_style;
    return (
    <div>
        <div className="audio-editor-container">
            <div className="audio-player-container">
                <SVGWaveformRenderer
                    waveformData={waveformData}
                    canvasWidth={1800}
                    canvasHeight={1200}
                    wavefromColor={wavefromColor}
                    wavefromStyle={wavefromStyle}
                />
                <div
                    id="audio-seeker"
                    style={{
                        left: `calc(${(this.state.currentTime * audioSeekerWidthFactor) + horizantalMarginPercentage}% - 15px)`
                    }}
                />
                <div
                    className="audio-seeker-needle"
                    style={{
                        left: `calc(${(this.state.currentTime * audioSeekerWidthFactor) + horizantalMarginPercentage}% - 6px)`
                    }}
                />
                <div
                    className="crop-overlay crop-overlay-1"
                    style={{
                        width: `calc(${(this.state.startTime * audioSeekerWidthFactor)}%)`,
                        left: `calc(${horizantalMarginPercentage}% - 5px)`
                    }}
                >
                <span className="range-slider-time-display range-slider-time-display-1" >
                    { startTime.minutes }:{ startTime.seconds }
                </span>
                </div>
                <div
                    className="crop-overlay crop-overlay-2"
                    style={{
                        width: `calc(${((100 - this.state.endTime) * audioSeekerWidthFactor)}%)`,
                        right: `calc(${horizantalMarginPercentage}% + 5px)`
                    }}
                >
                    <span className="range-slider-time-display range-slider-time-display-2" >
                        { endTime.minutes }:{ endTime.seconds }
                    </span>
                </div>
                {
                    isCropped === 0 ?
                    (
                        <Range
                            key={this.state.sliderRangeKey}
                            className="range-slider-container"
                            defaultValue={[0, 100]}
                            step={0.1}
                            pushable={this.state.pushable}
                            onChange={this.onRangeChange}
                        />
                    ) : ''
                }
            </div>
        </div>
        <ReactPlayer
            url={this.props.mediaFile}
            onProgress={this.onProgress}
            width='0%'
            height='0%'
            progressInterval={1}
            ref={this.ref}
            playing={this.state.isPlaying}
            onDuration={this.onDuration}
            onEnded={this.onEnded}
        />
        <div className="media-controls">
            <div
                className="play-pause-button"
                onClick={this.handlePlayPauseClick}
                style={this.state.isPlaying ? {
                    backgroundPositionX: "-45px"
                }: {}}
            />
            {
                isCropped === 0 ?
                (
                    <div
                        onClick={this.cropMediaFile}
                        className="crop-button"
                    />
                ) : ''
            }

        </div>

    </div>
    );
  }
}



export default MediaEditor;
