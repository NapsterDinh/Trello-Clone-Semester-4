import React from 'react'
import { Dropdown } from 'react-bootstrap'
import ToggleWorkSpace from 'app/base/CustomToggle/ToggleWorkSpace/ToggleWorkSpace';

import './DropdownWorkspace.scss'
import { useSelector } from 'react-redux';

function DropDownWorkspace(props)
{
    const ownerGuestWP = useSelector(state => state.workSpace)
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
                                    <Dropdown.Item eventKey="0">
                                        <ToggleWorkSpace
                                        className="current-working-workspace-item"
                                        image="/1.jpg"
                                        name={ownerGuestWP.curWP.name}
                                        />
                                    </Dropdown.Item>
                                </div>
                                {
                                    ownerGuestWP.owerWP &&
                                    <>
                                        <Dropdown.Divider />
                                        <div className="owner-workspace workspace">
                                            <h6>Các không gian làm việc của bạn</h6>
                                            {
                                                ownerGuestWP.owerWP.map((item,index) => (
                                                    <Dropdown.Item key={`owner${index}`} eventKey={`owner${index}`} href={`/workspace/${item._id}`}>
                                                        <ToggleWorkSpace
                                                            key={item._id}
                                                            className="owner-workspace-item"
                                                            image="/1.jpg"
                                                            name={item.name}
                                                            />
                                                    </Dropdown.Item>
                                                ))
                                            }
                                        </div>
                                    </>
                                }
                                {
                                    ownerGuestWP.guestWP &&
                                    <>
                                        <Dropdown.Divider />
                                        <div className="client-workspace workspace">
                                            <h6>Các không gian làm việc khách</h6>
                                            {
                                                ownerGuestWP.guestWP.map((item,index) => (
                                                    <Dropdown.Item key={`guest${index}`} eventKey={`guest${index}`} href={`/workspace/${item._id}`}>
                                                        <ToggleWorkSpace
                                                            key={item._id}
                                                            className="client-workspace-item"
                                                            image="/1.jpg"
                                                            name={item.name}
                                                            />
                                                    </Dropdown.Item>
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