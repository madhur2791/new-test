import React from 'react';
import Sidebar from '../../components/SideBar/SideBar.jsx';
import SVGWaveformRenderer from '../../components/SVGWaveformRenderer/SVGWaveformRenderer.jsx';
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

    colorPalletSelectionHandler(colorPallet, updateDatabase) {
        const { changeWaveformColor, match } = this.props;
        changeWaveformColor(match.params.mediaId, {
                color_pallet_id: colorPallet.id,
                color_pallet_name: colorPallet.name,
                colors: colorPallet.colors
            },
            updateDatabase
        );
    }

    colorOptionHandler(selectedColorOption, updateDatabase) {
        const { changeWaveformColor, match } = this.props;
        changeWaveformColor(match.params.mediaId, {
            color_option: selectedColorOption
         }, updateDatabase);
    }

    colorDiffusionPercentageHandler(colorDiffusionPercentage, updateDatabase) {
        const { changeWaveformColor, match } = this.props;
        changeWaveformColor(match.params.mediaId, {
            color_diffusion_percentage: colorDiffusionPercentage
         }, updateDatabase);
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
        let qrCodeDetails = {};
        let textDetails = {};
        if (selectedMediaFileData && selectedMediaFileData.data) {
            wavefromColor = selectedMediaFileData.data.current_waveform_style.waveform_color || {};
            wavefromStyle = selectedMediaFileData.data.current_waveform_style.waveform_style || {};
            qrCodeDetails = selectedMediaFileData.data.current_waveform_style.waveform_qr_code || {};
            textDetails =  selectedMediaFileData.data.current_waveform_style.waveform_text || {};
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
                            <img className="loader-image" src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/loader.gif" /><br />
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
                            <img className="loader-image" src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/loader.gif" /><br />
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
                <div className="sidebarToolBoxContainer">
                    <span className="sidebarToolHeadingSmall">Select diffusion</span>
                    <Slider
                        defaultValue={parseInt(wavefromColor.color_diffusion_percentage, 10)}
                        className="sidebar-slider sidebarToolContainer"
                        onChange={(silderPercentage) => {this.colorDiffusionPercentageHandler(silderPercentage)}}
                        onAfterChange={(silderPercentage) => {this.colorDiffusionPercentageHandler(silderPercentage, true)}}
                    />
                </div>
            );
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-5">
                        <Sidebar pageName="color" match={this.props.match}>
                            <div className="row">
                                <div className="col-md-12 sidebar-tool-options-container">
                                    <div className="row media-list-conatiner">
                                        <label className="sidebarToolHeadingBig">COLOR</label>
                                        <div className="sidebarToolBoxContainer">
                                            <label className="sidebarToolHeadingSmall">Select color type</label>
                                            <div className="sidebarToolContainer">
                                                <div
                                                    className={`sidebar-tool-options ${wavefromColor.color_option === 'mix' ? 'active' : ''}`}
                                                    onClick={() => {this.colorOptionHandler('mix', true)}}
                                                >
                                                    <FontAwesomeIcon  icon="fill-drip" />
                                                </div>
                                                <div
                                                    className={`sidebar-tool-options ${wavefromColor.color_option === 'tiered' ? 'active' : ''}`}
                                                    onClick={() => {this.colorOptionHandler('tiered', true)}}
                                                >
                                                    <FontAwesomeIcon  icon="upload" />
                                                </div>
                                            </div>
                                        </div>

                                        {colorDiffusionSlider}

                                        <div className="sidebarToolBoxContainer">
                                            <span className="sidebarToolHeadingSmall">Select a color palette for your sound wave.</span>
                                            <div className="sidebarToolContainer">
                                                <ColorListRenderer
                                                    selectedColorPallet={selectedMediaFileData && selectedMediaFileData.data && selectedMediaFileData.data.current_waveform_style.waveform_color}
                                                    colorPallets={colorPallets}
                                                    colorPalletSelectionHandler={this.colorPalletSelectionHandler}
                                                />
                                            </div>
                                        </div>
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
                        <div className="waveform-canvas-element">
                            <SVGWaveformRenderer
                                waveformData={waveformData[match.params.mediaId] || {}}
                                canvasWidth={1800}
                                canvasHeight={1200}
                                wavefromColor={wavefromColor}
                                wavefromStyle={wavefromStyle}
                                qrCodeDetails={qrCodeDetails}
                                textDetails={textDetails}
                            />
                        </div>
                    </div>
                </div>
                {loaders}
            </div>
        )
    }
}

export default WaveformColor;
