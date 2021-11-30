import React, {useEffect, useState} from "react";
import { NavLink, useLocation, useParams} from "react-router-dom";
import './PaneNav.scss'
import { useSelector } from "react-redux";

const PanelNav =  (props) => 
{
    let { id, type } = useParams()

    let classNameMain = type ? "tabbed-pane-nav-item-button js-org-profile" : "tabbed-pane-nav-item-button js-org-profile active"
    const typeWP = useSelector(state => state.workSpace.type)
    return(
        <div className="tabbed-pane-nav u-clearfix">
            <ul>
                <li className="tabbed-pane-nav-item">
                    <NavLink to={`/workspace/${id}/boards`} className={classNameMain} activeClassName="active">
                        Bảng
                    </NavLink>
                </li>
                {
                    typeWP !== "GUEST" &&
                    <>
                        <li className="tabbed-pane-nav-item">
                            <NavLink to={`/workspace/${id}/highlight`} className="tabbed-pane-nav-item-button js-org-profile" activeClassName="active">
                                Điểm nổi bật
                            </NavLink>
                        </li>
                        <li className="tabbed-pane-nav-item">
                            <NavLink to={`/workspace/${id}/members`} className="tabbed-pane-nav-item-button js-org-profile" activeClassName="active">
                                Thành viên
                            </NavLink>
                        </li>
                        <li className="tabbed-pane-nav-item">
                            <NavLink to={`/workspace/${id}/setting`} className="tabbed-pane-nav-item-button js-org-profile" activeClassName="active">
                                Cài đặt
                            </NavLink>
                        </li>
                    </>
                }
            </ul>
        </div>
    )
}
export default PanelNav