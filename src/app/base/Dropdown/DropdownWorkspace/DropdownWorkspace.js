import React from 'react'
import { Dropdown } from 'react-bootstrap'
import ToggleWorkSpace from 'app/base/CustomToggle/ToggleWorkSpace/ToggleWorkSpace';

import './DropdownWorkspace.scss'

function DropDownWorkspace(props)
{
    let { WorkspaceData } = props;

    return (
        <Dropdown className="header-workspace">
                    <Dropdown.Toggle className="header-workspace-dropdown" variant="success">
                        Các không gian làm việc
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <div className="menu-padding">
                            <div className="menu-header">
                                Các không gian làm việc
                            </div>
                            <Dropdown.Divider />
                            <div className="menu-body">
                                <div className="current-working-workspace workspace">
                                    <h6>Không gian làm việc hiện tại</h6>
                                    <ToggleWorkSpace
                                    className="current-working-workspace-item"
                                    image="/1.jpg"
                                    name={WorkspaceData.current.description}
                                    />
                                </div>
                                {
                                    WorkspaceData.owner &&
                                    <>
                                        <Dropdown.Divider />
                                        <div className="owner-workspace workspace">
                                            <h6>Các không gian làm việc của bạn</h6>
                                            {
                                                WorkspaceData.owner.map((item,index) => (
                                                    <ToggleWorkSpace
                                                    key={item._id}
                                                    className="owner-workspace-item"
                                                    image="/1.jpg"
                                                    name={item.description}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </>
                                }
                                {
                                    WorkspaceData.client &&
                                    <>
                                        <Dropdown.Divider />
                                        <div className="client-workspace workspace">
                                            <h6>Các không gian làm việc khách</h6>
                                            {
                                                WorkspaceData.client.map((item,index) => (
                                                    <ToggleWorkSpace
                                                    key={item._id}
                                                    className="client-workspace-item"
                                                    image="/1.jpg"
                                                    name={item.description}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                        
                    </Dropdown.Menu>
                </Dropdown>
    )
}

export default DropDownWorkspace