import React from 'react';
import Sidebar from '../../components/SideBar/SideBar.jsx';
import FileUploadContainer from './components/FileUploader/FileUploadContainer.jsx';
import AudioRecorderContainer from './components/AudioRecorder/AudioRecorderContainer.jsx';
import UploadedFilesListContainer from './components/UploadedFilesList/UploadedFilesListContainer.jsx';
import MediaEditorContainer from './components/MediaFileEditor/MediaFileEditContainer.jsx';
import SVGWaveformRenderer from '../../components/SVGWaveformRenderer/SVGWaveformRenderer.jsx';
import { Link } from 'react-router-dom'

class MediaUpload extends React.Component {
    componentDidMount() {
        const {
            getUploadedMediaFiles,
            fetchColorPalletsIfNeeded
        } = this.props;
        this.state = {
            showSidebarLoader: false,
            showWaveformLoader: false,
            showCroppingLoader: false
        };
        getUploadedMediaFiles();
        fetchColorPalletsIfNeeded();
    }

    componentWillReceiveProps(props) {
        const selectedMediaFile =
                props.mediaFilesList.data &&
                props.mediaFilesList.data[props.mediaFilesList.selectedMediaIndex] ||
                null;
        if (
            props.mediaFilesList.data &&
            props.mediaFilesList.isFetching === false &&
            props.mediaFilesList.data.length > 0
        ) {
            if (
                typeof props.waveformData[selectedMediaFile.media_id] === 'undefined'
            ) {
                this.props.getWaveformData(selectedMediaFile.media_id);
            }
        }

        if (
            props.uploadMediaFileRequest.isRequesting === true ||
            props.mediaFilesList.isFetching === true
        ) {
            this.setState({
                showSidebarLoader: true,
            });
        } else {
            this.setState({
                showSidebarLoader: false
            });
        }

        if (
            selectedMediaFile &&
            props.cropMediaFileRequest[selectedMediaFile.media_id] &&
            props.cropMediaFileRequest[selectedMediaFile.media_id].isRequesting === true
        ) {
            this.setState({
                showCroppingLoader: true
            });
        } else {
            this.setState({
                showCroppingLoader: false
            });
        }

        if (
            selectedMediaFile &&
            props.waveformData[selectedMediaFile.media_id] &&
            props.waveformData[selectedMediaFile.media_id].isFetching === true
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
        let loaders = [];
        const {
            mediaFileData,
            waveformData,
            mediaFilesList
        } = this.props;
        if(this.state && this.state.showSidebarLoader) {
            // if(true) {
            loaders.push((
                <div key={1}>
                    <div className="sidebar-loader col-lg-3 col-md-4 col-sm-5">
                        <div className="loader-image-container" >
                            <img className="loader-image" src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Spin-1s-200px.svg" /><br />
                            Uploading...
                        </div>
                    </div>
                    <div className="page-overlay" />
                </div>
            ));
        }

        if(this.state && this.state.showCroppingLoader) {
            // if(true) {
            loaders.push((
                <div key={2}>
                    <div className="waveform-loader col-lg-9 col-md-8 col-sm-7">
                        <div className="loader-image-container" >
                            <img className="loader-image" src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Spin-1s-200px.svg" /><br />
                            Cropping...
                        </div>
                    </div>
                    <div className="page-overlay" />
                </div>
            ));
        }

        if(this.state && this.state.showWaveformLoader) {
            // if(true) {
            loaders.push((
                <div key={3}>
                    <div className="waveform-loader col-lg-9 col-md-8 col-sm-7">
                        <div className="loader-image-container" >
                            <img className="loader-image" src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Spin-1s-200px.svg" /><br />
                            Generating Waveform...
                        </div>
                    </div>
                </div>
            ));
        }

        let NextButton = '';
        let BackButton = '';
        let mediaDisplaySection = '';
        let selectedMediaFile = null;
        if (
            mediaFilesList &&
            mediaFilesList.isFetching === false &&
            mediaFilesList.data &&
            mediaFilesList.data.length > 0
        ) {
            selectedMediaFile =
                mediaFilesList.data[mediaFilesList.selectedMediaIndex];

            NextButton = (<Link to={`/${selectedMediaFile.media_id}/color`} className="btn btn-primary upload-button">
                        Next
                    </Link>);



            let selectedWaveformData = [];

            if (
                typeof waveformData[selectedMediaFile.media_id] !== 'undefined' &&
                waveformData[selectedMediaFile.media_id].isFetching === false
            ) {
                selectedWaveformData = waveformData[selectedMediaFile.media_id];
            }

            mediaDisplaySection = (
                <MediaEditorContainer
                    waveformData={selectedWaveformData}
                    mediaFile={`https://s3.us-east-2.amazonaws.com/soundwavepic-test-media/${selectedMediaFile.media_file_url}`}
                    mediaFileId={selectedMediaFile.media_id}
                    waveformCurrentStyles={selectedMediaFile.current_waveform_style}
                    isCropped={selectedMediaFile.is_cropped}
                    showCroppingLoader={this.state && this.state.showCroppingLoader || false}
                />
            );
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-5">
                        <Sidebar pageName="mediaUpload" match={{
                            params: {
                                mediaId: selectedMediaFile && selectedMediaFile.media_id || null
                            }
                        }}>
                            <div className="row">
                                <div className="col-md-12 sidebar-tool-options-container">
                                    <div className="row">
                                        <div className="col-md-12 upload-button-container">
                                            <FileUploadContainer >
                                                Upload Audio
                                            </FileUploadContainer>
                                            <AudioRecorderContainer />
                                        </div>
                                    </div>
                                    <div className="row media-list-conatiner">
                                        <UploadedFilesListContainer />
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
                        {mediaDisplaySection}
                    </div>
                </div>
                {loaders}
            </div>
        )
    }
}

export default MediaUpload;
