import React from 'react';
import ReactPlayer from 'react-player'
import Slider, { Range } from 'rc-slider';

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
    this.handleClick = this.handleClick.bind(this);
    this.cropMedia = this.cropMedia.bind(this);
    this.onDuration = this.onDuration.bind(this);
  }

  handleClick(e) {
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
      console.log(duration);
    const pushableValue = 100 / duration;
    this.setState({
        duration,
        pushable: pushableValue >= 100 ? 100 : pushableValue
    })
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
        if(prevState.startTime != changedRange[0]) {
            this.player.seekTo(changedRange[0] / 100);
        }
        return {
            startTime: changedRange[0],
            currentTime: changedRange[0],
            endTime: changedRange[1]
        }
    });
  }

  cropMedia (e) {
    e.preventDefault();
    const startTime = (this.state.duration * this.state.startTime) / 100;
    const endTime = (this.state.duration * this.state.endTime) / 100;
    console.log(this.props.mediaFileId, startTime, endTime);
    this.props.cropMedia(this.props.selectedMediaIndex, startTime, endTime);
  }


  ref(player) {
    this.player = player
  }

  render() {
        return (
        <div>
            <div className="audio-editor-container">
                <div className="audio-player-container">
                    <img src={this.props.sampleWaveformImage}/>
                    <div
                        id="audio-seeker"
                        style={{
                            left: `calc(${this.state.currentTime}% - 10px)`
                        }}
                    />
                    <Range
                        className="range-slider-container"
                        defaultValue={[0, 100]}
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
                <button onClick={this.handleClick}>
                    {this.state.isPlaying ? 'Pause' : 'Play'}
                </button>
                <button onClick={this.cropMedia}>
                    Crop
                </button>
            </div>

        </div>
        )
  }
}



export default MediaEditor;
