import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Sidebar(props) {
    return (
        <div className="row sidebar-container">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12 sidebar-header">
                        <img className="sidebar-logo" src="/images/logo.png" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 sidebar-tool-box-nav-bar">
                        <div className={`sidebar-tool-box-nav-button ${props.pageName === 'mediaUpload' ? 'active' : '' }`}>
                            <FontAwesomeIcon icon="upload" />
                        </div>
                        <div className={`sidebar-tool-box-nav-button ${props.pageName === 'color' ? 'active' : '' }`}>
                            <FontAwesomeIcon  icon="fill-drip" />
                        </div>
                        <div className={`sidebar-tool-box-nav-button ${props.pageName === 'style' ? 'active' : '' }`}>
                            <FontAwesomeIcon  icon="upload" />
                        </div>
                        <div className={`sidebar-tool-box-nav-button ${props.pageName === 'text' ? 'active' : '' }`}>
                            <FontAwesomeIcon  icon="upload" />
                        </div>
                        <div className={`sidebar-tool-box-nav-button ${props.pageName === 'qrCode' ? 'active' : '' }`}>
                            <FontAwesomeIcon  icon="upload" />
                        </div>
                        <div className={`sidebar-tool-box-nav-button ${props.pageName === 'printOption' ? 'active' : '' }`}>
                            <FontAwesomeIcon  icon="upload" />
                        </div>
                    </div>
                    <div className="col-md-12 sidebar-tool-options-container">
                        {props.children}
                    </div>
                </div>
             </div>
        </div>
    )
}

export default Sidebar;
