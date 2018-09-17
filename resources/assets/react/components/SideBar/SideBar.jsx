import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import Ionicon from 'react-ionicons'

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
                                <FontAwesomeIcon icon="volume-up" />
                            </Link>
                        </div>
                        <div className={`sidebar-tool-box-nav-button ${props.pageName === 'color' ? 'active' : '' }`}>
                            <Link to={`/${match.params.mediaId}/color`}>
                                <FontAwesomeIcon  icon="fill-drip" />
                            </Link>
                        </div>
                        <div className={`sidebar-tool-box-nav-button ${props.pageName === 'style' ? 'active' : '' }`}>
                            <Link to={`/${match.params.mediaId}/style`}>
                                <FontAwesomeIcon  icon="cogs" />
                            </Link>
                        </div>
                        <div className={`sidebar-tool-box-nav-button ${props.pageName === 'text' ? 'active' : '' }`}>
                            <Link to={`/${match.params.mediaId}/text`}>
                                <FontAwesomeIcon  icon="font" />
                            </Link>
                        </div>
                        <div className={`sidebar-tool-box-nav-button ${props.pageName === 'qrCode' ? 'active' : '' }`}>
                            <Link to={`/${match.params.mediaId}/qr-code`}>
                                <FontAwesomeIcon  icon="qrcode" />
                            </Link>
                        </div>
                        <div className={`sidebar-tool-box-nav-button ${props.pageName === 'printOption' ? 'active' : '' }`}>
                            <Link to={`/${match.params.mediaId}/print-option`}>
                                <FontAwesomeIcon  icon="print" />
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
