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
    this.cropAudio = this.cropAudio.bind(this);
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

  cropAudio (e) {
    e.preventDefault();
    axios.post('/web-api/media/15b79ad4602f80/edit', {
        startTime: (this.state.duration * this.state.startTime) / 100,
        endTime: (this.state.duration * this.state.endTime) / 100
    });
  }

  ref(player) {
    this.player = player
  }

  render() {
        return (
        <div>
            <div className="audio-editor-container">
                <div className="audio-player-container">
                    <img src="https://s3.us-east-2.amazonaws.com/soundwavepic-test-media/resources/images/raw_waveform/15b79ad4602f80.png"/>
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
                url='https://s3.us-east-2.amazonaws.com/soundwavepic-test-media/resources/media-file/15b79ad4602f80.mp3'
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
                <button onClick={this.cropAudio}>
                    Crop
                </button>
            </div>

        </div>
        )
  }
}



export default MediaEditor;
