import React from "react";

import './PaneNav.scss'

const PanelNav =  () => 
{
    return(
        <div className="tabbed-pane-nav u-clearfix">
            <ul>
                <li className="tabbed-pane-nav-item"><a className="tabbed-pane-nav-item-button js-org-profile" data-tab="boards" href="/cnpm41">Bảng</a></li>
                <li className="tabbed-pane-nav-item"><a className="tabbed-pane-nav-item-button js-org-tables" data-tab="tables" href="/cnpm41/tables"><span className="icon-sm icon-business-class"></span>Điểm nổi bật</a></li>
                <li className="tabbed-pane-nav-item"><a className="tabbed-pane-nav-item-button js-org-members active" data-tab="members" href="/cnpm41/members">Thành viên</a></li>
                <li className="tabbed-pane-nav-item"><a className="tabbed-pane-nav-item-button js-org-account" data-tab="settings" href="/cnpm41/account">Cài đặt</a></li>
            </ul>
        </div>
    )
}
export default PanelNav