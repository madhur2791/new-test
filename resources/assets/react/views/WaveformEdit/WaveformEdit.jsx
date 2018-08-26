import React from 'react';
import Sidebar from '../../components/SideBar/Sidebar.jsx';
import WaveformRenderer from '../../components/WaveformRenderer/WaveformRenderer.jsx';

class WaveformEdit extends React.Component {
    componentDidMount() {
        console.log(this.props);
        const {
            getWaveformData,
            match
        } = this.props;

        getWaveformData(match.params.mediaId);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3"><Sidebar /></div>
                    <div className="col-md-9">
                        <WaveformRenderer
                            waveformData={this.props.waveformData}
                            mediaId={this.props.match.params.mediaId}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default WaveformEdit;
