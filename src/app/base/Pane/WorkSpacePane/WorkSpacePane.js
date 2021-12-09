import React, { useEffect, useState, } from "react";

import PaneHeader from "./PaneHeader/PaneHeader";
import PanelNav from "./PaneNav/PaneNav";
import PaneMain from "./PaneMainBoard/PaneMainBoard";
import PaneMember from "./PaneMember/PaneMember";
import PaneSetting from "./PaneSetting/PaneSetting";
import { Switch, Route, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { mainWorkSpaceReducer } from 'store/mainWorkSpaceReducer'

import LoadingOverlay from 'react-loading-overlay';

import './WorkSpacePane.scss'

const WorkSpacePane =  (props) => 
{
    const [ isActive, setIsActive ] = useState(false)
    const dispatch = useDispatch()
    let { id } = useParams()
    const location = useLocation()
    const curWP = useSelector(state => state.workSpace.curWP)
    const { fetchWorkSpaceOwerAndGuest} = props
    useEffect(() => 
    {
        dispatch(mainWorkSpaceReducer({_id: id, type: 'fetchObject'}))
    }, [location])

    return(
        <div className="tabbed-pane">
            {
                curWP && 
                <>
                    <PaneHeader />
                    <PanelNav />
                </>
            }
            <div className="tabbed-pane-main-col u-clearfix">
                {
                    isActive &&
                    <LoadingOverlay
                    active={isActive}
                    spinner
                    text={'Đợi xíu'}
                    >
                    
                    </LoadingOverlay>
                }
                <div className="tabbed-pane-main-col-wrapper js-content is-full-width">
                    <div>
                        <div className="js-react-root">
                            <div className="workspace-boards-page-layout">
                                <Switch>
                                    <Route exact path="/workspace">

                                    </Route>
                                    <Route exact path={["/workspace/:id","/workspace/:id/boards"]}>
                                        <PaneMain fetchWorkSpaceOwerAndGuest={fetchWorkSpaceOwerAndGuest} />
                                    </Route>
                                    <Route exact path="/workspace/:id/highlight">
                                        <PaneMain />
                                    </Route>
                                    <Route exact path="/workspace/:id/members">
                                        <PaneMember/>
                                    </Route>
                                    <Route exact path="/workspace/:id/setting">
                                        <PaneSetting fetchWorkSpaceOwerAndGuest={fetchWorkSpaceOwerAndGuest} />
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default WorkSpacePane