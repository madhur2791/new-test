import React from 'react';
import Sidebar from '../../components/SideBar/SideBar.jsx';
import WaveformRenderer from '../../components/WaveformRenderer/WaveformRenderer.jsx';
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
    waveformLineWidthHandler(lineWidth) {
        const { changeWaveformStyle, match } = this.props;
        changeWaveformStyle(match.params.mediaId, {
            line_width: lineWidth
        });
    }

    waveformLineSpacingHandler(lineSpacing) {
        const { changeWaveformStyle, match } = this.props;
        changeWaveformStyle(match.params.mediaId, {
            line_spacing: lineSpacing
        });
    }

    waveformLineDashWidthHandler(lineDashWidth) {
        const { changeWaveformStyle, match } = this.props;
        changeWaveformStyle(match.params.mediaId, {
            line_dash_width: lineDashWidth
        });
    }

    waveformTypeHandler(waveformType) {
        const { changeWaveformStyle, match } = this.props;
        changeWaveformStyle(match.params.mediaId, {
            waveform_type: waveformType
        });
    }

    waveformInnerRadiusHandler(innerRadius) {
        const { changeWaveformStyle, match } = this.props;
        changeWaveformStyle(match.params.mediaId, {
            inner_radius: innerRadius
        });
    }

    waveformStartAngleHandler(startAngle) {
        const { changeWaveformStyle, match } = this.props;
        changeWaveformStyle(match.params.mediaId, {
            start_angle: startAngle
        });
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

        let lineWidthSlider = '';
        if(wavefromStyle.line_width) {
            lineWidthSlider = (
                <div>
                    <h6>Line Width</h6>
                    <Slider
                        min={1}
                        max={50}
                        step={0.5}
                        defaultValue={parseFloat(wavefromStyle.line_width)}
                        className="sidebar-slider"
                        onChange={(lineWidth) => {this.waveformLineWidthHandler(lineWidth)}}

                    />
                </div>
            );
        }

        let lineSpaceSlider = '';
        if(typeof wavefromStyle.line_spacing !== 'undefined') {
            lineSpaceSlider = (
                <div>
                    <h6>Line Space</h6>
                    <Slider
                        min={0}
                        max={50}
                        step={0.5}
                        defaultValue={parseFloat(wavefromStyle.line_spacing)}
                        className="sidebar-slider"
                        onChange={(lineSpacing) => {this.waveformLineSpacingHandler(lineSpacing)}}

                    />
                </div>
            );
        }

        let lineDashWidthSlider = '';
        if(typeof wavefromStyle.line_dash_width !== 'undefined') {
            lineDashWidthSlider = (
                <div>
                    <h6>Line Dash width</h6>
                    <Slider
                        min={0}
                        max={20}
                        step={0.5}
                        defaultValue={parseFloat(wavefromStyle.line_dash_width)}
                        className="sidebar-slider"
                        onChange={(lineDashWidth) => {this.waveformLineDashWidthHandler(lineDashWidth)}}

                    />
                </div>
            );
        }

        let radialWaveformStartAngleSlider = '';
        if(typeof wavefromStyle.start_angle !== 'undefined' && wavefromStyle.waveform_type === 'radial') {
            radialWaveformStartAngleSlider = (
                <div>
                    <h6>Start Angle</h6>
                    <Slider
                        min={0}
                        max={360}
                        step={1}
                        defaultValue={parseFloat(wavefromStyle.start_angle)}
                        className="sidebar-slider"
                        onChange={(startAngle) => {this.waveformStartAngleHandler(startAngle)}}

                    />
                </div>
            );
        }

        let radialWaveformInnerRadiusSlider = '';
        if(typeof wavefromStyle.inner_radius !== 'undefined' && wavefromStyle.waveform_type === 'radial') {
            radialWaveformInnerRadiusSlider = (
                <div>
                    <h6>Inner radius</h6>
                    <Slider
                        min={0}
                        max={200}
                        step={1}
                        defaultValue={parseFloat(wavefromStyle.inner_radius)}
                        className="sidebar-slider"
                        onChange={(innerRadius) => {this.waveformInnerRadiusHandler(innerRadius)}}
                    />
                </div>
            );
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-5">
                        <Sidebar pageName="color">
                            <div className="row">
                                <div className="col-md-12 sidebar-tool-options-container">
                                    <div className="row media-list-conatiner">
                                        <div>
                                            <h6>Waveform Type</h6>
                                            <div>
                                                <div
                                                    className={`sidebar-tool-box-nav-button ${wavefromStyle.waveform_type === 'bars' ? 'active' : ''}`}
                                                    onClick={() => {this.waveformTypeHandler('bars')}}
                                                >
                                                    <FontAwesomeIcon  icon="fill-drip" />
                                                </div>
                                                <div
                                                    className={`sidebar-tool-box-nav-button ${wavefromStyle.waveform_type === 'linear' ? 'active' : ''}`}
                                                    onClick={() => {this.waveformTypeHandler('linear')}}
                                                >
                                                    <FontAwesomeIcon  icon="upload" />
                                                </div>
                                                <div
                                                    className={`sidebar-tool-box-nav-button ${wavefromStyle.waveform_type === 'radial' ? 'active' : ''}`}
                                                    onClick={() => {this.waveformTypeHandler('radial')}}
                                                >
                                                    <FontAwesomeIcon  icon="upload" />
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
                            qrCodeDetails={qrCodeDetails}
                            textDetails={textDetails}
                        />
                    </div>
                </div>
                {loaders}
            </div>
        )
    }
}

export default WaveformStyle;
