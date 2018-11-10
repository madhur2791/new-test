import React from 'react';
import { Link } from 'react-router-dom'

function Sidebar(props) {
    const { match } = props;
    return (
        <div className="row sidebar-container">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12 sidebar-header">
                        <img className="sidebar-logo" src="/images/logo-white.png" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 sidebar-tool-box-nav-bar">
                        <div className={`sidebar-tool-box-nav-button ${props.pageName === 'mediaUpload' ? 'active' : '' }`}>
                            <Link to={`/upload`}>
                                <img className="sidebarIcon" src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/icons8-sound-50.png" />
                            </Link>
                        </div>
                        <div className={`sidebar-tool-box-nav-button ${props.pageName === 'color' ? 'active' : '' }`}>
                            <Link to={`/${match.params.mediaId}/color`}>
                                <img className="sidebarIcon" src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/icons8-paint-palette-50.png" />
                            </Link>
                        </div>
                        <div className={`sidebar-tool-box-nav-button ${props.pageName === 'style' ? 'active' : '' }`}>
                            <Link to={`/${match.params.mediaId}/style`}>
                                <img className="sidebarIcon" src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/icons8-tune-50.png" />
                            </Link>
                        </div>
                        <div className={`sidebar-tool-box-nav-button ${props.pageName === 'text' ? 'active' : '' }`}>
                            <Link to={`/${match.params.mediaId}/text`}>
                                <img className="sidebarIcon" src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/icons8-text-color-50.png" />
                            </Link>
                        </div>
                        <div className={`sidebar-tool-box-nav-button ${props.pageName === 'qrCode' ? 'active' : '' }`}>
                            <Link to={`/${match.params.mediaId}/qr-code`}>
                                <img className="sidebarIcon" src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/icons8-qr-code-50.png" />
                            </Link>
                        </div>
                        <div className={`sidebar-tool-box-nav-button ${props.pageName === 'printOption' ? 'active' : '' }`}>
                            <Link to={`/${match.params.mediaId}/print-option`}>
                                <img className="sidebarIcon" src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/icons8-print-50.png" />
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-12">
                        {props.children}
                    </div>
                </div>
             </div>
        </div>
    )
}

export default Sidebar;
