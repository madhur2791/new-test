import React from 'react';
import ReactPlayer from 'react-player'
import Slider, { Range } from 'rc-slider';
import WaveformRenderer from '../../../../components/WaveformRenderer/WaveformRenderer.jsx';

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
    };
    this.onProgress = this.onProgress.bind(this);
    this.ref = this.ref.bind(this);
    this.onRangeChange = this.onRangeChange.bind(this);
    this.handlePlayPauseClick = this.handlePlayPauseClick.bind(this);
    this.cropMediaFile = this.cropMediaFile.bind(this);
    this.onDuration = this.onDuration.bind(this);
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
    console.log(this.props.mediaFileId, startTime, endTime);
    this.props.cropMediaFile(this.props.mediaFileId, startTime, endTime);
  }


  ref(player) {
    this.player = player
  }

  render() {
    const { waveformCurrentStyles, waveformData } = this.props;
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
                <WaveformRenderer
                    waveformData={waveformData}
                    canvasWidth={900}
                    canvasHeight={400}
                    colorOption={wavefromColor.color_option}
                    colorPallet={{
                        colors: wavefromColor.colors
                    }}
                    lineWidth={parseInt(wavefromStyle.line_width, 10)}
                    lineSpacing={parseInt(wavefromStyle.line_spacing, 10)}
                    lineDashWidth={parseInt(wavefromStyle.line_dash_width ,10)}
                    colorDiffusionPercentage={parseInt(wavefromColor.color_diffusion_percentage, 10)}
                    waveformType={wavefromStyle.waveform_type}
                    startAngle={parseInt(wavefromStyle.start_angle, 10)}
                    innerRadius={parseInt(wavefromStyle.inner_radius, 10)}
                />
                <div
                    id="audio-seeker"
                    style={{
                        left: `calc(${this.state.currentTime}% - 10px)`
                    }}
                />
                <div
                    className="audio-seeker-needle"
                    style={{
                        left: `calc(${this.state.currentTime}% - 1px)`
                    }}
                />
                <div
                    className="crop-overlay crop-overlay-1"
                    style={{
                        width: `calc(${this.state.startTime}%)`
                    }}
                >
                <span className="range-slider-time-display range-slider-time-display-1" >
                    { startTime.minutes }:{ startTime.seconds }
                </span>
                </div>
                <div
                    className="crop-overlay crop-overlay-2"
                    style={{
                        width: `calc(${100 - this.state.endTime}%)`
                    }}
                >
                    <span className="range-slider-time-display range-slider-time-display-2" >
                        { endTime.minutes }:{ endTime.seconds }
                    </span>
                </div>
                <Range
                    className="range-slider-container"
                    defaultValue={[0, 100]}
                    step={0.1}
                    pushable={this.state.pushable}
                    onChange={this.onRangeChange}
                />
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
        />
        <div className="media-controls">
            <div
                className="play-pause-button"
                onClick={this.handlePlayPauseClick}
                style={this.state.isPlaying ? {
                    backgroundPositionX: "-45px"
                }: {}}
            />
            <div
                onClick={this.cropMediaFile}
                className="crop-button"
            />
        </div>

    </div>
    );
  }
}



export default MediaEditor;