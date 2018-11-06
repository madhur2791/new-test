import React from 'react';
import Sidebar from '../../components/SideBar/SideBar.jsx';
import SVGWaveformRenderer from '../../components/SVGWaveformRenderer/SVGWaveformRenderer.jsx';
import Slider from 'rc-slider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'

class WaveformStyle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showWaveformLoader: false,
            showSidebarLoader: false
        };

        this.waveformLineWidthHandler = this.waveformLineWidthHandler.bind(this);
        this.waveformLineSpacingHandler = this.waveformLineSpacingHandler.bind(this);
        this.waveformTypeHandler = this.waveformTypeHandler.bind(this);
        this.waveformLineDashWidthHandler = this.waveformLineDashWidthHandler.bind(this);
        this.waveformStartAngleHandler = this.waveformStartAngleHandler.bind(this);
        this.waveformInnerRadiusHandler = this.waveformInnerRadiusHandler.bind(this);
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
    }
    waveformLineWidthHandler(lineWidth, updateDatabase) {
        const { changeWaveformStyle, match } = this.props;
        changeWaveformStyle(match.params.mediaId, {
            line_width: lineWidth
        }, updateDatabase);
    }

    waveformLineSpacingHandler(lineSpacing, updateDatabase) {
        const { changeWaveformStyle, match } = this.props;
        changeWaveformStyle(match.params.mediaId, {
            line_spacing: lineSpacing
        }, updateDatabase);
    }

    waveformLineDashWidthHandler(lineDashWidth, updateDatabase) {
        const { changeWaveformStyle, match } = this.props;
        changeWaveformStyle(match.params.mediaId, {
            line_dash_width: lineDashWidth
        }, updateDatabase);
    }

    waveformTypeHandler(waveformType, updateDatabase) {
        const { changeWaveformStyle, match } = this.props;
        changeWaveformStyle(match.params.mediaId, {
            waveform_type: waveformType
        }, updateDatabase);
    }

    waveformInnerRadiusHandler(innerRadius, updateDatabase) {
        const { changeWaveformStyle, match } = this.props;
        changeWaveformStyle(match.params.mediaId, {
            inner_radius: innerRadius
        }, updateDatabase);
    }

    waveformStartAngleHandler(startAngle, updateDatabase) {
        const { changeWaveformStyle, match } = this.props;
        changeWaveformStyle(match.params.mediaId, {
            start_angle: startAngle
        }, updateDatabase);
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
            <Link to={`/${match.params.mediaId}/text`} className="btn btn-primary upload-button">
                Next
            </Link>
        );
        let BackButton = (
            <Link to={`/${match.params.mediaId}/color`} className="btn btn-primary upload-button">
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

        let lineWidthSlider = '';
        if(typeof  wavefromStyle.line_width !== 'undefined') {
            lineWidthSlider = (
                <div className="sidebarToolBoxContainer">
                    <span className="sidebarToolHeadingSmall">Adjust line width</span>
                    <Slider
                        min={0}
                        max={100}
                        step={0.1}
                        defaultValue={parseFloat(wavefromStyle.line_width)}
                        className="sidebar-slider sidebarToolContainer"
                        onChange={(lineWidth) => {this.waveformLineWidthHandler(lineWidth)}}
                        onAfterChange={(lineWidth) => {this.waveformLineWidthHandler(lineWidth, true)}}
                    />
                </div>
            );
        }

        let lineSpaceSlider = '';
        if(typeof wavefromStyle.line_spacing !== 'undefined') {
            lineSpaceSlider = (
                <div className="sidebarToolBoxContainer">
                    <span className="sidebarToolHeadingSmall">Adjust line spacing</span>
                    <Slider
                        min={0}
                        max={100}
                        step={0.1}
                        defaultValue={parseFloat(wavefromStyle.line_spacing)}
                        className="sidebar-slider sidebarToolContainer"
                        onChange={(lineSpacing) => {this.waveformLineSpacingHandler(lineSpacing)}}
                        onAfterChange={(lineSpacing) => {this.waveformLineSpacingHandler(lineSpacing, true)}}
                    />
                </div>
            );
        }

        let lineDashWidthSlider = '';
        if(typeof wavefromStyle.line_dash_width !== 'undefined') {
            lineDashWidthSlider = (
                <div className="sidebarToolBoxContainer">
                    <span className="sidebarToolHeadingSmall">Adjust Grid spacing</span>
                    <Slider
                        min={0}
                        max={100}
                        step={0.1}
                        defaultValue={parseFloat(wavefromStyle.line_dash_width)}
                        className="sidebar-slider sidebarToolContainer"
                        onChange={(lineDashWidth) => {this.waveformLineDashWidthHandler(lineDashWidth)}}
                        onAfterChange={(lineDashWidth) => {this.waveformLineDashWidthHandler(lineDashWidth, true)}}
                    />
                </div>
            );
        }

        let radialWaveformStartAngleSlider = '';
        if(typeof wavefromStyle.start_angle !== 'undefined' && wavefromStyle.waveform_type === 'radial') {
            radialWaveformStartAngleSlider = (
                <div className="sidebarToolBoxContainer">
                    <span className="sidebarToolHeadingSmall">Adjust start angle</span>
                    <Slider
                        min={0}
                        max={100}
                        step={0.1}
                        defaultValue={parseFloat(wavefromStyle.start_angle)}
                        className="sidebar-slider sidebarToolContainer"
                        onChange={(startAngle) => {this.waveformStartAngleHandler(startAngle)}}
                        onAfterChange={(startAngle) => {this.waveformStartAngleHandler(startAngle, true)}}
                    />
                </div>
            );
        }

        let radialWaveformInnerRadiusSlider = '';
        if(typeof wavefromStyle.inner_radius !== 'undefined' && wavefromStyle.waveform_type === 'radial') {
            radialWaveformInnerRadiusSlider = (
                <div className="sidebarToolBoxContainer">
                    <span className="sidebarToolHeadingSmall">Adjust Inner radius</span>
                    <Slider
                        min={0}
                        max={100}
                        step={0.1}
                        defaultValue={parseFloat(wavefromStyle.inner_radius)}
                        className="sidebar-slider sidebarToolContainer"
                        onChange={(innerRadius) => {this.waveformInnerRadiusHandler(innerRadius)}}
                        onAfterChange={(innerRadius) => {this.waveformInnerRadiusHandler(innerRadius, true)}}
                    />
                </div>
            );
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-5">
                        <Sidebar pageName="style" match={this.props.match}>
                            <div className="row">
                                <div className="col-md-12 sidebar-tool-options-container">
                                    <div className="row media-list-conatiner">
                                        <label className="sidebarToolHeadingBig">Style</label>
                                        <div className="sidebarToolBoxContainer">
                                            <label className="sidebarToolHeadingSmall">Select Waveform Type</label>
                                            <div className="sidebarToolContainer">
                                                <div
                                                    className={`sidebar-tool-options ${wavefromStyle.waveform_type === 'bars' ? 'active' : ''}`}
                                                    onClick={() => {this.waveformTypeHandler('bars', true)}}
                                                >
                                                    <FontAwesomeIcon  icon="chart-bar" />
                                                </div>
                                                <div
                                                    className={`sidebar-tool-options ${wavefromStyle.waveform_type === 'linear' ? 'active' : ''}`}
                                                    onClick={() => {this.waveformTypeHandler('linear', true)}}
                                                >
                                                    <FontAwesomeIcon  icon="chart-line" />
                                                </div>
                                                <div
                                                    className={`sidebar-tool-options ${wavefromStyle.waveform_type === 'radial' ? 'active' : ''}`}
                                                    onClick={() => {this.waveformTypeHandler('radial', true)}}
                                                >
                                                    <FontAwesomeIcon  icon="sun" />
                                                </div>
                                            </div>
                                        </div>
                                        {lineWidthSlider}
                                        {lineSpaceSlider}
                                        {lineDashWidthSlider}
                                        {radialWaveformStartAngleSlider}
                                        {radialWaveformInnerRadiusSlider}
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

export default WaveformStyle;
