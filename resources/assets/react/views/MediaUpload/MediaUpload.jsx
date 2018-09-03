import React from 'react';
import Sidebar from '../../components/SideBar/SideBar.jsx';
import FileUploadContainer from './components/FileUploader/FileUploadContainer.jsx';
import UploadedFilesListContainer from './components/UploadedFilesList/UploadedFilesListContainer.jsx';
// import MediaEditor from '../../components/MediaEditor/MediaEditor.jsx';
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

    // cropMedia(selectedMediaIndex, startTime, endTime) {
    //      const selectedMediaFile =
    //                 this.props.uploadedMediaFilesList.media_list[selectedMediaIndex];
    //     this.props.cropMediaFile(selectedMediaFile.media_id, startTime, endTime);
    // }

    componentWillReceiveProps(props) {
        if (
            props.mediaFilesList &&
            props.mediaFilesList.isFetching === false &&
            props.mediaFilesList.data.length > 0
        ) {
            const selectedMediaFile =
                props.mediaFilesList.data[props.mediaFilesList.selectedMediaIndex];
            if (
                typeof props.waveformData[selectedMediaFile.media_id] === 'undefined'
            ) {
                this.props.getWaveformData(selectedMediaFile.media_id);
            }
        }

        if(props.uploadMediaFileRequest.isRequesting === true) {
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
        // let mediaDisplaySection = (<div>Loading</div>);
        // if(this.props.uploadedMediaFilesList.isUploading === true) {
        //     mediaDisplaySection = (<div>Uploading Audio</div>);
        // } else if (
        //     this.props.uploadedMediaFilesList &&
        //     this.props.uploadedMediaFilesList.isFetching === false
        // ) {
        //     if(this.props.uploadedMediaFilesList.media_list.length > 0) {
        //         const selectedMediaFile =
        //             this.props.uploadedMediaFilesList.media_list[this.props.uploadedMediaFilesList.selectedMediaIndex];
                // if (selectedMediaFile.is_cropped === 0) {

                    /*mediaDisplaySection = (
                        <MediaEditor
                            sampleWaveformImage={`https://s3.us-east-2.amazonaws.com/soundwavepic-test-media/${JSON.parse(selectedMediaFile.images).sample_waveform_url}`}
                            mediaFile={`https://s3.us-east-2.amazonaws.com/soundwavepic-test-media/${selectedMediaFile.media_file_url}`}
                            selectedMediaIndex={this.props.uploadedMediaFilesList.selectedMediaIndex}
                            cropMedia={this.cropMedia}
                        />
                    );*/
                /*} else {
                    const selectedMediaFile =
                        this.props.uploadedMediaFilesList.media_list[this.props.uploadedMediaFilesList.selectedMediaIndex];

                    if (
                        this.props.waveformData[selectedMediaFile.media_id] &&
                        this.props.waveformData[selectedMediaFile.media_id].isFetching === false
                    ) {
                        mediaDisplaySection = (
                            <div className='text-center'>
                                <WaveformRenderer
                                    waveformData={this.props.waveformData[selectedMediaFile.media_id]}
                                    sampleRate={9}
                                />
                            </div>
                        );
                    } else {
                        mediaDisplaySection = (<div>Loading Waveform</div>);
                    }
                }*/
            /*} else {
                mediaDisplaySection = (<div>Please upload a file</div>);
            }

        }
        let croppingLoader = '';
        if(this.props.uploadedMediaFilesList.isCropping === true) {
            croppingLoader = 'Cropping File';
        }
        let NextButton = '';
        // console.log('$$$$$$$$$$', this.props.uploadedMediaFilesList.media_list, this.props.uploadedMediaFilesList.media_list[this.props.uploadedMediaFilesList.selectedMediaIndex]);
        if(
            this.props.uploadedMediaFilesList.media_list &&
            this.props.uploadedMediaFilesList.media_list[this.props.uploadedMediaFilesList.selectedMediaIndex]
        ) {
            NextButton = (<Link to={`/create/${this.props.uploadedMediaFilesList.media_list[this.props.uploadedMediaFilesList.selectedMediaIndex].media_id}/waveform`} className="btn btn-primary upload-button">
                            Next
                        </Link>);
        }*/

        let mediaDisplaySection = (
            <div> Loading </div>
        );

        if (
            this.props.mediaFilesList &&
            this.props.mediaFilesList.isFetching === false &&
            this.props.mediaFilesList.data.length > 0
        ) {

            const selectedMediaFile =
                this.props.mediaFilesList.data[this.props.mediaFilesList.selectedMediaIndex];
            if (
                typeof this.props.waveformData[selectedMediaFile.media_id] !== 'undefined' &&
                this.props.waveformData[selectedMediaFile.media_id].isFetching === false
            ) {
                mediaDisplaySection = (
                    <WaveformRenderer
                        waveformData={this.props.waveformData[selectedMediaFile.media_id]}
                        width={900}
                        height={600}
                        colorOption='mix'
                        colorPallet={{
                            name: 'Color Pallet',
                            colors: ['16B5FF', 'FF1668', '4FC4FF']
                        }}
                        lineWidth={3}
                        lineSpacing={5}
                        lineDashWidth={2}
                        colorDiffusionPercentage={2}
                        waveformType='linear'
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
                                <div className="col-md-12 upload-button-container">
                                    <FileUploadContainer >
                                        Upload Audio
                                    </FileUploadContainer>
                                </div>
                            </div>
                            <div className="row media-list-conatiner">
                                <UploadedFilesListContainer />
                            </div>
                            {/*<div className="row">
                                <div className="col-md-12 upload-button-container">
                                    {NextButton}
                                </div>
                            </div>*/}

                        </Sidebar>
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-7">
                        {mediaDisplaySection}
                    </div>
                </div>
            </div>
        )
    }
}

export default MediaUpload;
