import React from 'react';
import Sidebar from '../../components/SideBar/SideBar.jsx';
import WaveformRenderer from '../../components/WaveformRenderer/WaveformRenderer.jsx';
import Slider from 'rc-slider';


class WaveformEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sampleRate: 1
        };
    }
    componentDidMount() {
        const {
            getWaveformData,
            match
        } = this.props;

        getWaveformData(match.params.mediaId);
        this.onSliderChange = this.onSliderChange.bind(this);
    }
    onSliderChange(value) {

        this.setState({
            sampleRate: value
        })
    }
    render() {
        console.log('sr', this.state.sampleRate);
        let waveform = <div>Loading</div>
        if (
            this.props.waveformData[this.props.match.params.mediaId] &&
            this.props.waveformData[this.props.match.params.mediaId].isFetching === false
        ){
            waveform = <WaveformRenderer
                            waveformData={this.props.waveformData[this.props.match.params.mediaId]}
                            sampleRate={this.state.sampleRate}
                        />;
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar >
                            <div className="range-slider-container-samplerate">
                                <Slider
                                    onChange={this.onSliderChange}
                                    className="range-slider-container"
                                    min={1}
                                    max={100}
                                    step={1}
                                />
                            </div>
                        </ Sidebar>
                    </div>
                    <div className="col-md-9">
                        <div className='text-center'>
                            {waveform}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WaveformEdit;
