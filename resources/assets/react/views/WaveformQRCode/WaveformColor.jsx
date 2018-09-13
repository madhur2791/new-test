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
            fetchColorPalletsIfNeeded,
            fetchWaveformDataIfNeeded,
            fetchMediaFileIfNeeded,
            match
        } = this.props;

        fetchColorPalletsIfNeeded();
        fetchWaveformDataIfNeeded(match.params.mediaId);
        fetchMediaFileIfNeeded(match.params.mediaId);
    }

    componentWillReceiveProps() {
        const {
            fetchColorPalletsIfNeeded,
            fetchWaveformDataIfNeeded,
            fetchMediaFileIfNeeded,
            match
        } = this.props;

        fetchColorPalletsIfNeeded();
        fetchWaveformDataIfNeeded(match.params.mediaId);
        fetchMediaFileIfNeeded(match.params.mediaId);
    }

    render() {
        console.log('render coloras');
        let waveform = <div>Loading</div>
        if (
            this.props.waveformData[this.props.match.params.mediaId] &&
            this.props.waveformData[this.props.match.params.mediaId].isFetching === false
        ){
            waveform = <WaveformRenderer
                        waveformData={this.props.waveformData[this.props.match.params.mediaId]}
                        canvasWidth={900}
                        canvasHeight={600}
                        colorOption='mix'
                        colorPallet={{
                            name: 'Color Pallet',
                            colors: ['16B5FF', 'FF1668', '4FC4FF', 'ff0000', 'ffff00']
                        }}
                        lineWidth={10}
                        lineSpacing={3}
                        lineDashWidth={0}
                        colorDiffusionPercentage={0}
                        waveformType='bars'
                        startAngle={0}
                        innerRadius={100}
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
