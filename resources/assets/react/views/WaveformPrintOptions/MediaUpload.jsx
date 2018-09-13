import React from 'react';
import Sidebar from '../../components/SideBar/SideBar.jsx';
import FileUploadContainer from './components/FileUploader/FileUploadContainer.jsx';
import UploadedFilesListContainer from './components/UploadedFilesList/UploadedFilesListContainer.jsx';
import MediaEditorContainer from './components/MediaFileEditor/MediaFileEditContainer.jsx';
import WaveformRenderer from '../../components/WaveformRenderer/WaveformRenderer.jsx';
import { Link } from 'react-router-dom'

class MediaUpload extends React.Component {
    componentDidMount() {
        const {
            getUploadedMediaFiles,
            getColorPallets
        } = this.props;
        this.state = {
            showLoader: false
        }
        getUploadedMediaFiles();
        getColorPallets();
    }

    componentWillReceiveProps(props) {
        const selectedMediaFile =
                props.mediaFilesList &&
                props.mediaFilesList.data[props.mediaFilesList.selectedMediaIndex] ||
                null;
        if (
            props.mediaFilesList &&
            props.mediaFilesList.isFetching === false &&
            props.mediaFilesList.data.length > 0
        ) {

            if (
                typeof props.waveformData[selectedMediaFile.media_id] === 'undefined'
            ) {
                this.props.getWaveformData(selectedMediaFile.media_id);
            }
        }

        if (props.uploadMediaFileRequest.isRequesting === true) {
            this.setState({
                showLoader: true
            });
        } else {
            this.setState({
                showLoader: false
            });
        }

        if (
            props.uploadMediaFileRequest.isRequesting === true ||
            (
                selectedMediaFile &&
                props.cropMediaFileRequest[selectedMediaFile.media_id] &&
                props.cropMediaFileRequest[selectedMediaFile.media_id].isRequesting === true
            ) ||
            !props.mediaFilesList ||
            props.mediaFilesList.isFetching === true ||
            !props.mediaFilesList.data ||
            !props.mediaFilesList.data[
                props.mediaFilesList.selectedMediaIndex
            ] ||
            !props.waveformData[
                props.mediaFilesList.data[
                    props.mediaFilesList.selectedMediaIndex
                ].media_id
            ] ||
            props.waveformData[
                props.mediaFilesList.data[
                    props.mediaFilesList.selectedMediaIndex
                ].media_id
            ].isFetching === true
        ) {
            this.setState({
                showLoader: true
            });
        } else {
            this.setState({
                showLoader: false
            });
        }
    }

    render() {
        let mediaUploadLoader = '';
        if(this.state && this.state.showLoader) {
            mediaUploadLoader = (
                <div className="media-upload-loader">
                    <img className="media-upload-loader-image" src="/images/loader.gif" />
                </div>
            );
        }

        let NextButton = '';
        let BackButton = '';
        let mediaDisplaySection = '';

        if (
            this.props.mediaFilesList &&
            this.props.mediaFilesList.isFetching === false &&
            this.props.mediaFilesList.data.length > 0
        ) {
            const selectedMediaFile =
                this.props.mediaFilesList.data[this.props.mediaFilesList.selectedMediaIndex];

            NextButton = (<Link to={`/${selectedMediaFile.media_id}/color`} className="btn btn-primary upload-button">
                            Next
                        </Link>);

            let waveformData = [];

            if (
                typeof this.props.waveformData[selectedMediaFile.media_id] !== 'undefined' &&
                this.props.waveformData[selectedMediaFile.media_id].isFetching === false
            ) {
                waveformData = this.props.waveformData[selectedMediaFile.media_id];
            }

            if(selectedMediaFile.is_cropped === 0) {
                mediaDisplaySection = (
                    <MediaEditorContainer
                        waveformData={waveformData}
                        mediaFile={`https://s3.us-east-2.amazonaws.com/soundwavepic-test-media/${selectedMediaFile.media_file_url}`}
                        mediaFileId={selectedMediaFile.media_id}
                    />
                );
            } else {
                mediaDisplaySection = (
                    <WaveformRenderer
                        waveformData={waveformData}
                        canvasWidth={900}
                        canvasHeight={600}
                        colorOption='mix'
                        colorPallet={{
                            name: 'Color Pallet',
                            colors: ['16B5FF', 'FF1668', '4FC4FF', 'ff0000', 'ffff00']
                        }}
                        lineWidth={1}
                        lineSpacing={0}
                        lineDashWidth={0}
                        colorDiffusionPercentage={0}
                        waveformType='bars'
                        startAngle={0}
                        innerRadius={100}
                    />
                );
            }
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-5">
                        <Sidebar pageName="mediaUpload">
                            <div className="row">
                                <div className="col-md-12 sidebar-tool-options-container">
                                    <div className="row">
                                        <div className="col-md-12 upload-button-container">
                                            <FileUploadContainer >
                                                Upload Audio
                                            </FileUploadContainer>
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
                {mediaUploadLoader}
            </div>
        )
    }
}

export default MediaUpload;
