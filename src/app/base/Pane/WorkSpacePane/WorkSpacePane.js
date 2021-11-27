import React, { useState, } from "react";

import PaneHeader from "./PaneHeader/PaneHeader";
import PanelNav from "./PaneNav/PaneNav";
import PaneMain from "./PaneMainBoard/PaneMainBoard";
import PaneMember from "./PaneMember/PaneMember";
import PaneSetting from "./PaneSetting/PaneSetting";

import LoadingOverlay from 'react-loading-overlay';

import './WorkSpacePane.scss'

const WorkSpacePane =  () => 
{
    const [ isActive, setIsActive ] = useState(false)
    return(
        <div className="tabbed-pane">
            <PaneHeader/>
            <PanelNav/>
            <div className="tabbed-pane-main-col u-clearfix">
                {
                    isActive &&
                    <LoadingOverlay
                    active={isActive}
                    spinner
                    text={'Đợi xíu'}
                    >
                    <p>Some content or children or something.</p>
                    </LoadingOverlay>
                }
                <div className="tabbed-pane-main-col-wrapper js-content is-full-width">
                    <div>
                        <div className="js-react-root">
                            <div className="workspace-boards-page-layout">
                                {/* <PaneMain/> */}
                                <PaneMember/>
                                {/* <PaneSetting /> */}
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default WorkSpacePane