import React from 'react';
import Sidebar from '../../components/SideBar/SideBar.jsx';
import WaveformRenderer from '../../components/WaveformRenderer/WaveformRenderer.jsx';
import Slider from 'rc-slider';
import Select from 'react-select';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'

class WaveformText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showWaveformLoader: false,
            showSidebarLoader: false,
            textValue: '',
            fontFamilyValue: 'Arial'
        };

        this.waveformTextHandler = this.waveformTextHandler.bind(this);
        this.waveformTextFontHandler = this.waveformTextFontHandler.bind(this);
        this.waveformTextFontSizeHandler = this.waveformTextFontSizeHandler.bind(this);
        this.waveformTextColorHandler = this.waveformTextColorHandler.bind(this);
        this.waveformTextHorizantalAlignment = this.waveformTextHorizantalAlignment.bind(this);
        this.waveformTextVerticalAlignment = this.waveformTextVerticalAlignment.bind(this);

        const { mediaFileData, match } = this.props;
        const selectedMediaFileData = mediaFileData[match.params.mediaId];
        let textDetails = {};
        if (selectedMediaFileData && selectedMediaFileData.data) {
            textDetails =  selectedMediaFileData.data.current_waveform_style.waveform_text || {};
            if(textDetails) {
                this.state = {
                    textValue: textDetails.text,
                    fontFamilyValue: textDetails.font_family
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
            this.setState({
                showWaveformLoader: false
            });
        }

        const selectedMediaFileData = mediaFileData[match.params.mediaId];
        let textDetails = {};
        if (selectedMediaFileData && selectedMediaFileData.data) {
            textDetails =  selectedMediaFileData.data.current_waveform_style.waveform_text || {};
            if(textDetails) {
                this.setState({
                    textValue: textDetails.text,
                    fontFamilyValue: textDetails.font_family
                });
            }
        }
    }

    waveformTextHandler(event) {
        const { changeWaveformText, match } = this.props;
        this.setState({
            textValue: event.target.value
        })
        changeWaveformText(match.params.mediaId, {
            text: event.target.value
        }, true);
    }

    waveformTextFontHandler(event) {
        const { changeWaveformText, match } = this.props;
        changeWaveformText(match.params.mediaId, {
            font_family: event.value
        }, true);
    }

    waveformTextFontSizeHandler(fontSize, updateDatabase) {
        const { changeWaveformText, match } = this.props;
        changeWaveformText(match.params.mediaId, {
            font_size: fontSize
        }, updateDatabase);
    }

    waveformTextColorHandler(fontColor, updateDatabase) {
        const { changeWaveformText, match } = this.props;
        changeWaveformText(match.params.mediaId, {
            font_color: fontColor
        }, updateDatabase);
    }

    waveformTextHorizantalAlignment(horizantalAlignment, updateDatabase) {
        const { changeWaveformText, match } = this.props;
        changeWaveformText(match.params.mediaId, {
            horizantal_alignment: horizantalAlignment
        }, updateDatabase);
    }

    waveformTextVerticalAlignment(verticalAlignment, updateDatabase) {
        const { changeWaveformText, match } = this.props;
        changeWaveformText(match.params.mediaId, {
            vertical_alignment: verticalAlignment
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
            <Link to={`/${match.params.mediaId}/qr-code`} className="btn btn-primary upload-button">
                Next
            </Link>
        );
        let BackButton = (
            <Link to={`/${match.params.mediaId}/style`} className="btn btn-primary upload-button">
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



        let textFormatters = '';
        if(typeof textDetails.text !== 'undefined' &&  textDetails.text !== null && textDetails.text.trim() !== '') {
            const colorPallet = [];
            wavefromColor.colors.forEach((color, index) => {
                colorPallet.push(
                    <div
                        key={index}
                        className={`textColorBlockContainer  ${color === textDetails.font_color ? 'active' : ''}`}
                    >
                        <div
                            className="colorPalletColorBlock textColorBlock"
                            style={{backgroundColor: `#${color}`}}
                            onClick={() => this.waveformTextColorHandler(color, true)}
                        />
                    </div>
                );
            });
            colorPallet.push(
                <div
                    key={wavefromColor.colors.length}
                    className={`textColorBlockContainer  ${'000' === textDetails.font_color ? 'active' : ''}`}
                >
                    <div
                        className="colorPalletColorBlock textColorBlock"
                        style={{backgroundColor: `#000`}}
                        onClick={() => this.waveformTextColorHandler('000', true)}
                    />
                </div>
            )

            textFormatters = (
                <div>
                    <div className="sidebarToolBoxContainer">
                        <label className="sidebarToolHeadingSmall">Select Font family</label>
                        <div className="sidebarToolContainer">
                            <Select
                                className="basic-single"
                                defaultValue={{
                                    value: this.state.fontFamilyValue,
                                    label: this.state.fontFamilyValue
                                }}
                                options={[
                                    {
                                        value: 'Arial',
                                        label: 'Arial'
                                    },
                                    {
                                        value: 'Helvetica',
                                        label: 'Helvetica'
                                    },
                                    {
                                        value: 'Times New Roman',
                                        label: 'Times New Roman'
                                    },
                                    {
                                        value: 'Courier New',
                                        label: 'Courier New'
                                    },
                                    {
                                        value: 'Comic Sans MS',
                                        label: 'Comic Sans MS'
                                    },
                                    {
                                        value: 'Impact',
                                        label: 'Impact'
                                    }
                                ]}
                                onChange={this.waveformTextFontHandler}
                            />

                        </div>
                    </div>

                    <div className="sidebarToolBoxContainer">
                        <label className="sidebarToolHeadingSmall">Select Font size</label>
                        <Slider
                            min={20}
                            max={500}
                            step={1}
                            defaultValue={parseInt(textDetails.font_size)}
                            className="sidebar-slider sidebarToolContainer"
                            onChange={(fontSize) => {this.waveformTextFontSizeHandler(fontSize)}}
                            onAfterChange={(fontSize) => {this.waveformTextFontSizeHandler(fontSize, true)}}
                        />
                    </div>
                    <div className="sidebarToolBoxContainer">
                        <label className="sidebarToolHeadingSmall">Select Color</label>
                        <div className="colorPallet sidebarToolContainer">
                            {colorPallet}
                        </div>
                    </div>

                    <div className="sidebarToolBoxContainer">
                        <label className="sidebarToolHeadingSmall">Horizantal Alignment</label>
                        <div className="sidebarToolContainer">
                            <div
                                onClick={() => {this.waveformTextHorizantalAlignment('left', true)}}
                                className={`alignmentTabs ${textDetails.horizantal_alignment === 'left' ? 'active' : ''}`}
                            >
                                Left
                            </div>
                            <div
                                onClick={() => {this.waveformTextHorizantalAlignment('center', true)}}
                                className={`alignmentTabs ${textDetails.horizantal_alignment === 'center' ? 'active' : ''}`}
                            >
                                Center
                            </div>
                            <div
                                onClick={() => {this.waveformTextHorizantalAlignment('right', true)}}
                                className={`alignmentTabs ${textDetails.horizantal_alignment === 'right' ? 'active' : ''}`}
                            >
                                Right
                            </div>
                        </div>
                    </div>
                    <div className="sidebarToolBoxContainer">
                        <label className="sidebarToolHeadingSmall">Vertical Alignment</label>
                        <div className="sidebarToolContainer">
                            <div
                                onClick={() => {this.waveformTextVerticalAlignment('top', true)}}
                                className={`alignmentTabs ${textDetails.vertical_alignment === 'top' ? 'active' : ''}`}
                            >
                                Top
                            </div>
                            <div
                                onClick={() => {this.waveformTextVerticalAlignment('middle', true)}}
                                className={`alignmentTabs ${textDetails.vertical_alignment === 'middle' ? 'active' : ''}`}
                            >
                                Middle
                            </div>
                            <div
                                onClick={() => {this.waveformTextVerticalAlignment('bottom', true)}}
                                className={`alignmentTabs ${textDetails.vertical_alignment === 'bottom' ? 'active' : ''}`}
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
                        <Sidebar pageName="text" match={this.props.match}>
                            <div className="row">
                                <div className="col-md-12 sidebar-tool-options-container">
                                    <div className="row media-list-conatiner">
                                        <label className="sidebarToolHeadingBig">Text</label>
                                        <div className="sidebarToolBoxContainer">
                                            <input
                                                type="text"
                                                value={this.state.textValue}
                                                onChange={this.waveformTextHandler}
                                                className="textInput"
                                            />
                                        </div>
                                        {textFormatters}
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
                            wavefromColor={wavefromColor}
                            wavefromStyle={wavefromStyle}
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

export default WaveformText;
