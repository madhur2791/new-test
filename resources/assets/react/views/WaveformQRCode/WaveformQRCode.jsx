import React from 'react';
import Sidebar from '../../components/SideBar/SideBar.jsx';
import SVGWaveformRenderer from '../../components/SVGWaveformRenderer/SVGWaveformRenderer.jsx';
import Slider from 'rc-slider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'

class WaveformQRCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showWaveformLoader: false,
            showSidebarLoader: false,
            isEnabled: false
        };

        this.waveformQRCodeSizeHandler = this.waveformQRCodeSizeHandler.bind(this);
        this.waveformQRCodeHorizantalAlignment = this.waveformQRCodeHorizantalAlignment.bind(this);
        this.waveformQRCodeVerticalAlignment = this.waveformQRCodeVerticalAlignment.bind(this);
        this.toggleQrCodeHandler = this.toggleQrCodeHandler.bind(this);

        const { mediaFileData, match } = this.props;
        const selectedMediaFileData = mediaFileData[match.params.mediaId];
        let qrCodeDetails = {};
        if (selectedMediaFileData && selectedMediaFileData.data) {
            qrCodeDetails =  selectedMediaFileData.data.current_waveform_style.waveform_qr_code || {};
            if(qrCodeDetails) {
                this.state = {
                    isEnabled: qrCodeDetails.enabled
                };
            }
        }
    }

    componentDidMount() {
        const {
            fetchWaveformDataIfNeeded,
            fetchMediaFileIfNeeded,
            match
        } = this.props;

        fetchMediaFileIfNeeded(match.params.mediaId);
        fetchWaveformDataIfNeeded(match.params.mediaId);
    }

    componentWillReceiveProps(props) {
        const { waveformData, mediaFileData, match } = props;

        const selectedWaveformData =
                props.waveformData &&
                props.waveformData[props.match.params.mediaId] ||
                null;
        if (
            selectedWaveformData &&
            selectedWaveformData.isFetching === true
        ) {
            this.setState({
                showWaveformLoader: true
            });
        } else {
            if(this.props.waveformData[props.match.params.mediaId].isFetching === true) {

            }
            this.setState({
                showWaveformLoader: false
            });
        }

        const selectedMediaFileData = mediaFileData[match.params.mediaId];
        let qrCodeDetails = {};
        if (selectedMediaFileData && selectedMediaFileData.data) {
            qrCodeDetails =  selectedMediaFileData.data.current_waveform_style.waveform_qr_code || {};
            if(qrCodeDetails) {
                this.setState({
                    isEnabled: qrCodeDetails.enabled
                });
            }
        }
    }

    waveformQRCodeSizeHandler(qrCodeSize, updateDatabase) {
        const { changeWaveformQRCode, match } = this.props;
        changeWaveformQRCode(match.params.mediaId, {
            size: qrCodeSize
        }, updateDatabase);
    }

    waveformQRCodeHorizantalAlignment(horizantalAlignment, updateDatabase) {
        const { changeWaveformQRCode, match } = this.props;
        changeWaveformQRCode(match.params.mediaId, {
            horizantal_alignment: horizantalAlignment
        }, updateDatabase);
    }

    waveformQRCodeVerticalAlignment(verticalAlignment, updateDatabase) {
        const { changeWaveformQRCode, match } = this.props;
        changeWaveformQRCode(match.params.mediaId, {
            vertical_alignment: verticalAlignment
        }, updateDatabase);
    }

    toggleQrCodeHandler(event) {
        const { changeWaveformQRCode, match } = this.props;
        const target = event.target;
        this.setState({
            'isEnabled': target.checked
        });

        changeWaveformQRCode(match.params.mediaId, {
            enabled: target.checked
        }, true);
    }

    render() {
        const {
            waveformData,
            mediaFileData,
            match
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
            <Link to={`/${match.params.mediaId}/print-option`} className="btn btn-primary upload-button">
                Next
            </Link>
        );
        let BackButton = (
            <Link to={`/${match.params.mediaId}/text`} className="btn btn-primary upload-button">
                Back
            </Link>
        );
        if(this.state && this.state.showWaveformLoader) {
            loaders.push((
                <div key={1}>
                    <div className="waveform-loader col-lg-9 col-md-8 col-sm-7">
                        <div className="loader-image-container" >
                            <img className="loader-image" src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Spin-1s-200px.svg" /><br />
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
                            <img className="loader-image" src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Spin-1s-200px.svg" /><br />
                            Loading Color Pallets...
                        </div>
                    </div>
                    <div className="page-overlay" />
                </div>
            ));
        }

        let qrCodeFormatters = '';
        let qrCodeEnabled = false;
        if(this.state.isEnabled) {
            let qrCodeEnabled = true;
            qrCodeFormatters = (
                <div>
                    <div className="sidebarToolBoxContainer">
                        <label className="sidebarToolHeadingSmall">Size</label>
                        <Slider
                            min={100}
                            max={200}
                            step={1}
                            defaultValue={parseInt(qrCodeDetails.size)}
                            className="sidebar-slider sidebarToolContainer"
                            onChange={(qrCodeSize) => {this.waveformQRCodeSizeHandler(qrCodeSize)}}
                            onAfterChange={(qrCodeSize) => {this.waveformQRCodeSizeHandler(qrCodeSize, true)}}
                        />
                    </div>

                    <div className="sidebarToolBoxContainer">
                        <label className="sidebarToolHeadingSmall">Horizantal Alignment</label>
                        <div className="sidebarToolContainer">
                            <div
                                onClick={() => {this.waveformQRCodeHorizantalAlignment('left', true)}}
                                className={`alignmentTabs ${qrCodeDetails.horizantal_alignment === 'left' ? 'active' : ''}`}
                            >
                                Left
                            </div>
                            <div
                                onClick={() => {this.waveformQRCodeHorizantalAlignment('center', true)}}
                                className={`alignmentTabs ${qrCodeDetails.horizantal_alignment === 'center' ? 'active' : ''}`}
                            >
                                Center
                            </div>
                            <div
                                onClick={() => {this.waveformQRCodeHorizantalAlignment('right', true)}}
                                className={`alignmentTabs ${qrCodeDetails.horizantal_alignment === 'right' ? 'active' : ''}`}
                            >
                                Right
                            </div>
                        </div>
                    </div>
                    <div className="sidebarToolBoxContainer">
                        <label className="sidebarToolHeadingSmall">Vertical Alignment</label>
                        <div className="sidebarToolContainer">
                            <div
                                onClick={() => {this.waveformQRCodeVerticalAlignment('top', true)}}
                                className={`alignmentTabs ${qrCodeDetails.vertical_alignment === 'top' ? 'active' : ''}`}
                            >
                                Top
                            </div>
                            <div
                                onClick={() => {this.waveformQRCodeVerticalAlignment('middle', true)}}
                                className={`alignmentTabs ${qrCodeDetails.vertical_alignment === 'middle' ? 'active' : ''}`}
                            >
                                Middle
                            </div>
                            <div
                                onClick={() => {this.waveformQRCodeVerticalAlignment('bottom', true)}}
                                className={`alignmentTabs ${qrCodeDetails.vertical_alignment === 'bottom' ? 'active' : ''}`}
                            >
                                Bottom
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-5">
                        <Sidebar pageName="qrCode" match={this.props.match}>
                            <div className="row">
                                <div className="col-md-12 sidebar-tool-options-container">
                                    <div className="row media-list-conatiner">
                                        <label className="sidebarToolHeadingBig">QR Code</label>
                                        <div className="sidebarToolBoxContainer">
                                            <label className="sidebarToolHeadingSmall">Enable QR Code</label>
                                            <div className="onoffswitch">
                                                <input
                                                    type="checkbox"
                                                    className="onoffswitch-checkbox"
                                                    id="myonoffswitch"
                                                    checked={this.state.isEnabled}
                                                    onChange={this.toggleQrCodeHandler}
                                                />
                                                <label className="onoffswitch-label" htmlFor="myonoffswitch">
                                                    <span className="onoffswitch-inner"></span>
                                                    <span className="onoffswitch-switch"></span>
                                                </label>
                                            </div>
                                         </div>
                                        {qrCodeFormatters}
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

export default WaveformQRCode;
