import React from 'react'
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap'
import ToggleWorkSpace from 'app/base/CustomToggle/ToggleWorkSpace/ToggleWorkSpace';

import './DropDownListBoard.scss'

function DropDownListBoard(props)
{
    // const { boardList } = props
    const curWP = useSelector(state => state.workSpace.curWP.boardId)
    return (
        <Dropdown className="board-bar-list-board">
                    <Dropdown.Toggle className="board-list-toggle toggle" variant="success">
                        Bảng
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <div className="board-list-padding">
                            <div className="menu-header">
                                    Các bảng trong không gian làm việc
                            </div>
                            <Dropdown.Divider />
                            <div className="menu-body">
                                {
                                    curWP.map((item,index) => (
                                        <Dropdown.Item key={`board${index}`} eventKey={`board${index}`} href={`/board/${item._id}`}>
                                            <ToggleWorkSpace
                                                key={item._id}
                                                className="board-list-item"
                                                image="/1.jpg"
                                                name={item.title}
                                                />
                                        </Dropdown.Item>
                                    ))
                                }
                            </div>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
    )
}

export default DropDownListBoard