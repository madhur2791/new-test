import React from 'react';
import Sidebar from '../../components/SideBar/SideBar.jsx';
import WaveformRenderer from '../../components/WaveformRenderer/WaveformRenderer.jsx';
import Slider from 'rc-slider';
import ColorListRenderer from './components/ColorListRenderer.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'

class WaveformColor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showWaveformLoader: false,
            showSidebarLoader: false
        };

        this.colorPalletSelectionHandler = this.colorPalletSelectionHandler.bind(this);
        this.colorOptionHandler = this.colorOptionHandler.bind(this);
        this.colorDiffusionPercentageHandler = this.colorDiffusionPercentageHandler.bind(this);
    }

    colorPalletSelectionHandler(colorPallet) {
        const { changeWaveformColor, match } = this.props;
        changeWaveformColor(match.params.mediaId, {
            color_pallet_id: colorPallet.id,
            color_pallet_name: colorPallet.name,
            colors: colorPallet.colors
         });
    }

    colorOptionHandler(selectedColorOption) {
        const { changeWaveformColor, match } = this.props;
        changeWaveformColor(match.params.mediaId, {
            color_option: selectedColorOption
         });
    }

    colorDiffusionPercentageHandler(colorDiffusionPercentage) {
        const { changeWaveformColor, match } = this.props;
        changeWaveformColor(match.params.mediaId, {
            color_diffusion_percentage: colorDiffusionPercentage
         });
    }

    componentDidMount() {
        const {
            fetchColorPalletsIfNeeded,
            fetchWaveformDataIfNeeded,
            fetchMediaFileIfNeeded,
            match
        } = this.props;

        fetchMediaFileIfNeeded(match.params.mediaId);
        fetchColorPalletsIfNeeded();
        fetchWaveformDataIfNeeded(match.params.mediaId);
    }

    componentWillReceiveProps(props) {
        const waveformData =
                props.waveformData &&
                props.waveformData[props.match.params.mediaId] ||
                null;
        if (
            waveformData &&
            waveformData.isFetching === true
        ) {
            this.setState({
                showWaveformLoader: true
            });
        } else {
            this.setState({
                showWaveformLoader: false
            });
        }

        if (
            props.colorPallets.isFetching === true
        ) {
            this.setState({
                showSidebarLoader: true,
            });
        } else {
            this.setState({
                showSidebarLoader: false
            });
        }
    }

    render() {
        const {
            waveformData,
            mediaFileData,
            match,
            colorPallets
        } = this.props;

        const selctedWaveformData = waveformData[match.params.mediaId];
        const selectedMediaFileData = mediaFileData[match.params.mediaId];
        let wavefromColor = {};
        let wavefromStyle = {};
        if (selectedMediaFileData && selectedMediaFileData.data) {
            wavefromColor = selectedMediaFileData.data.current_waveform_style.waveform_color || {};
            wavefromStyle = selectedMediaFileData.data.current_waveform_style.waveform_style || {};
        }
        let loaders = [];
        let NextButton = (
            <Link to={`/${match.params.mediaId}/style`} className="btn btn-primary upload-button">
                Next
            </Link>
        );
        let BackButton = (
            <Link to={'/upload'} className="btn btn-primary upload-button">
                Back
            </Link>
        );
        if(this.state && this.state.showWaveformLoader) {
            loaders.push((
                <div key={1}>
                    <div className="waveform-loader col-lg-9 col-md-8 col-sm-7">
                        <div className="loader-image-container" >
                            <img className="loader-image" src="/images/loader.gif" /><br />
                            Generating Waveform...
                        </div>
                    </div>
                </div>
            ));
        }

        if(this.state && this.state.showSidebarLoader) {
            loaders.push((
                <div key={2}>
                    <div className="sidebar-loader col-lg-3 col-md-4 col-sm-5">
                        <div className="loader-image-container" >
                            <img className="loader-image" src="/images/loader.gif" /><br />
                            Loading Color Pallets...
                        </div>
                    </div>
                    <div className="page-overlay" />
                </div>
            ));
        }

        let colorDiffusionSlider = '';
        if(wavefromColor.color_option === 'tiered') {
            colorDiffusionSlider = (
                <div>
                    <h6>Color diffusion Percentage</h6>
                    <Slider
                        defaultValue={parseInt(wavefromColor.color_diffusion_percentage, 10)}
                        className="sidebar-slider"
                        onChange={(silderPercentage) => {this.colorDiffusionPercentageHandler(silderPercentage)}}
                    />
                </div>
            );
        }
        console.log(wavefromStyle);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-5">
                        <Sidebar pageName="color">
                            <div className="row">
                                <div className="col-md-12 sidebar-tool-options-container">
                                    <div className="row media-list-conatiner">
                                        <div>
                                            <h6>Options</h6>
                                            <div>
                                                <div
                                                    className={`sidebar-tool-box-nav-button ${wavefromColor.color_option === 'mix' ? 'active' : ''}`}
                                                    onClick={() => {this.colorOptionHandler('mix')}}
                                                >
                                                    <FontAwesomeIcon  icon="fill-drip" />
                                                </div>
                                                <div
                                                    className={`sidebar-tool-box-nav-button ${wavefromColor.color_option === 'tiered' ? 'active' : ''}`}
                                                    onClick={() => {this.colorOptionHandler('tiered')}}
                                                >
                                                    <FontAwesomeIcon  icon="upload" />
                                                </div>
                                            </div>
                                        </div>
                                        {colorDiffusionSlider}
                                        <ColorListRenderer
                                            selectedColorPallet={selectedMediaFileData && selectedMediaFileData.data && selectedMediaFileData.data.current_waveform_style.waveform_color}
                                            colorPallets={colorPallets}
                                            colorPalletSelectionHandler={this.colorPalletSelectionHandler}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row footer-buttons">
                                <div className="col-md-6 col-sm-6 col-xs-6 back-button-container">
                                    {BackButton}
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6 next-button-container">
                                    {NextButton}
                                </div>
                            </div>
                        </Sidebar>
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-7 waveform-canvas-container">
                        <WaveformRenderer
                            waveformData={waveformData[match.params.mediaId] || {}}
                            canvasWidth={1800}
                            canvasHeight={1200}
                            colorOption={wavefromColor.color_option}
                            colorPallet={{
                                colors: wavefromColor.colors
                            }}
                            lineWidth={parseInt(wavefromStyle.line_width, 10)}
                            lineSpacing={parseFloat(wavefromStyle.line_spacing)}
                            lineDashWidth={parseInt(wavefromStyle.line_dash_width ,10)}
                            colorDiffusionPercentage={parseInt(wavefromColor.color_diffusion_percentage, 10)}
                            waveformType={wavefromStyle.waveform_type}
                            startAngle={parseInt(wavefromStyle.start_angle, 10)}
                            innerRadius={parseInt(wavefromStyle.inner_radius, 10)}
                        />
                    </div>
                </div>
                {loaders}
            </div>
        )
    }
}

export default WaveformColor;
