import React from 'react';
import Sidebar from '../../components/SideBar/SideBar.jsx';
import SVGWaveformRenderer from '../../components/SVGWaveformRenderer/SVGWaveformRenderer.jsx';
import { Link } from 'react-router-dom'

const printOptionDescriptions = {
    Canvas: "Canvas Wraps are printed on high-quality artist stock, then stretched and wrapped around wood fiberboard. Canvases frames are 1.25” thick and come with hooks for instant hanging.",
    Poster: "These Fine Art Prints are digitally printed on premium matted artist-grade custom developed 264 gsm paper with archival, acid-free pigment based inks, with 300dpi, giving each piece of art an elegant finish. Frame is not included.",
    Digital: "A vector PDF and PNG file that is available to download instantly and can be scaled to any size with the same resolution quality."
}
class WaveformPrintOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showWaveformLoader: false,
            showSidebarLoader: false,
            selectedPrintType: 'Canvas',
            selectedSizeOption: '',
            showAddToCartLoader: false
        };

        this.handleSizeSelect = this.handleSizeSelect.bind(this);
        this.handlePrintOptionSelect = this.handlePrintOptionSelect.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
    }

    handleSizeSelect(e) {
        this.setState({
            selectedSizeOption: e.target.value
        });
    }

    handlePrintOptionSelect(e) {
        const priceList = this.props.priceList;
        this.setState({
            selectedPrintType: e.target.value,
            selectedSizeOption: priceList.data[e.target.value][0].id
        });
    }

    handleAddToCart() {
        const { match } = this.props;
        this.setState({
            showAddToCartLoader: true
        });
        axios.post(`/web-api/carts`, {
            mediaId: match.params.mediaId,
            priceOptions: {
                print_type: this.state.selectedPrintType,
                size_option: this.state.selectedSizeOption
            },
            generatedImage: this.refs.generatedImage.generatedImage.innerHTML
        }).then(() => {
            window.location.href = "/carts";
        }).catch(() => {
            this.setState({
                showAddToCartLoader: false
            });
        });
    }
    componentDidMount() {
        const {
            fetchPricingLists,
            fetchWaveformDataIfNeeded,
            fetchMediaFileIfNeeded,
            match
        } = this.props;
        fetchMediaFileIfNeeded(match.params.mediaId);
        fetchPricingLists();
        fetchWaveformDataIfNeeded(match.params.mediaId);
    }

    componentWillReceiveProps(props) {
        const priceList =
                props.priceList ||
                null;
        if (
            priceList &&
            priceList.isFetching === true
        ) {
            this.setState({
                showSidebarLoader: true
            });
        } else {
            this.setState({
                showSidebarLoader: false
            });
        }

        if (
            priceList &&
            this.props.priceList.isFetching === true &&
            priceList.isFetching === false
        ) {
            this.setState({
                selectedSizeOption: priceList.data[this.state.selectedPrintType][0].id
            });
        }

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

    render() {
        const {
            priceList,
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

        let BackButton = (
            <Link to={`/${match.params.mediaId}/qr-code`} className="btn btn-primary upload-button">
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

        if(this.state && this.state.showAddToCartLoader) {
            loaders.push((
                <div key={3}>
                    <div className="waveform-loader col-lg-9 col-md-8 col-sm-7">
                        <div className="loader-image-container" >
                            <img className="loader-image" src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/loader.gif" /><br />
                            Adding To Cart...
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
                            Loading Sizes Pallets...
                        </div>
                    </div>
                    <div className="page-overlay" />
                </div>
            ));
        }


        let printOptionsSelect = '';
        if(priceList && priceList.data && priceList.data[this.state.selectedPrintType]) {
            if (priceList.data[this.state.selectedPrintType].length === 1) {
                printOptionsSelect = (
                    <div>{priceList.data[this.state.selectedPrintType][0].size}</div>
                )
            } else {
                printOptionsSelect = (
                    <select
                        onChange={this.handleSizeSelect}
                        value={this.state.selectedSizeOption}
                        className="selectInput"
                    >
                        {
                            priceList.data[this.state.selectedPrintType].map((priceList) => {
                                return (
                                    <option key={priceList.id} value={priceList.id}>{priceList.size}</option>
                                )
                            })
                        }
                    </select>
                );
            }
        }


        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-5">
                        <Sidebar pageName="printOption" match={this.props.match}>
                            <div className="row">
                                <div className="col-md-12 sidebar-tool-options-container">
                                    <div className="row media-list-conatiner">
                                        <label className="sidebarToolHeadingBig">PRINT OPTION</label>
                                        <div className="sidebarToolBoxContainer">
                                            <span className="sidebarToolHeadingSmall">Download your artwork, or we can print it for you.</span>
                                            <div className="sidebarToolContainer">
                                                <select
                                                    className="selectInput"
                                                    onChange={this.handlePrintOptionSelect}
                                                    value={this.state.selectedPrintType}
                                                >
                                                    <option key={1} value="Canvas">Canvas</option>
                                                    <option key={2} value="Poster">Poster</option>
                                                    <option key={3} value="Digital">Digital</option>
                                                </select>
                                            </div>
                                            <div className="sidebarToolContainer">
                                                <span className="sidebarToolDescription">{printOptionDescriptions[this.state.selectedPrintType] || ''}</span>
                                            </div>
                                            <div className="sidebarToolContainer">
                                                {printOptionsSelect}
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
                                    <button className="btn btn-primary upload-button" onClick={this.handleAddToCart}>
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </Sidebar>
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-7 waveform-canvas-container">
                        <div className="waveform-canvas-element">
                            <SVGWaveformRenderer
                                ref="generatedImage"
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

export default WaveformPrintOption;
