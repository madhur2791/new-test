import React from 'react';
import Sidebar from '../../components/SideBar/SideBar.jsx';
import FileUploadContainer from '../../components/FileUploader/FileUploadContainer.jsx';
import UploadedFilesList from './components/UploadedFilesList/UploadedFilesList.jsx';
import MediaEditor from '../../components/MediaEditor/MediaEditor.jsx';
import WaveformRenderer from '../../components/WaveformRenderer/WaveformRenderer.jsx';
import { Link } from 'react-router-dom'

class MediaUpload extends React.Component {
    componentDidMount() {
        const {
            getUploadedMediaFiles
        } = this.props;

        getUploadedMediaFiles();
        this.cropMedia = this.cropMedia.bind(this);
    }

    cropMedia(selectedMediaIndex, startTime, endTime) {
         const selectedMediaFile =
                    this.props.uploadedMediaFilesList.media_list[selectedMediaIndex];
        this.props.cropMediaFile(selectedMediaFile.media_id, startTime, endTime);
    }

    componentWillReceiveProps(props) {
        console.log('aa', props.uploadedMediaFilesList.isFetching);
        if (
            props.uploadedMediaFilesList &&
            props.uploadedMediaFilesList.isFetching === false
        ) {
            if(props.uploadedMediaFilesList.media_list.length > 0) {
                const selectedMediaFile =
                    props.uploadedMediaFilesList.media_list[props.uploadedMediaFilesList.selectedMediaIndex];
                if (
                    selectedMediaFile.is_cropped === 1 &&
                    typeof props.waveformData[selectedMediaFile.media_id] === 'undefined'
                ) {
                    this.props.getWaveformData(selectedMediaFile.media_id);
                }
            }
        }
    }

    render() {
        let mediaDisplaySection = (<div>Loading</div>);
        if(this.props.uploadedMediaFilesList.isUploading === true) {
            mediaDisplaySection = (<div>Uploading Audio</div>);
        } else if (
            this.props.uploadedMediaFilesList &&
            this.props.uploadedMediaFilesList.isFetching === false
        ) {
            if(this.props.uploadedMediaFilesList.media_list.length > 0) {
                const selectedMediaFile =
                    this.props.uploadedMediaFilesList.media_list[this.props.uploadedMediaFilesList.selectedMediaIndex];
                if (selectedMediaFile.is_cropped === 0) {

                    mediaDisplaySection = (
                        <MediaEditor
                            sampleWaveformImage={`https://s3.us-east-2.amazonaws.com/soundwavepic-test-media/${JSON.parse(selectedMediaFile.images).sample_waveform_url}`}
                            mediaFile={`https://s3.us-east-2.amazonaws.com/soundwavepic-test-media/${selectedMediaFile.media_file_url}`}
                            selectedMediaIndex={this.props.uploadedMediaFilesList.selectedMediaIndex}
                            cropMedia={this.cropMedia}
                        />
                    );
                } else {
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
                }
            } else {
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
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar>
                            <div className="row">
                                <div className="col-md-12 upload-button-container">
                                    <FileUploadContainer >
                                        Upload Audio
                                    </FileUploadContainer>
                                </div>
                            </div>
                            <div className="row media-list-conatiner">
                                <UploadedFilesList
                                    uploadedMediaFilesList={this.props.uploadedMediaFilesList}
                                    updateSelectedMediaIndex={this.props.updateSelectedMediaIndex}
                                    selectedMediaIndex={this.props.uploadedMediaFilesList.selectedMediaIndex}
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-12 upload-button-container">
                                    {NextButton}
                                </div>
                            </div>

                        </Sidebar>
                    </div>
                    <div className="col-md-9">
                        {mediaDisplaySection}
                    </div>
                    <div>
                        {croppingLoader}
                    </div>
                </div>
            </div>
        )
    }
}

export default MediaUpload;
