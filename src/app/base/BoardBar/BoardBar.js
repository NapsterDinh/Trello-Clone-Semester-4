import React, { useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'

import { Col, Form, Button, Dropdown, DropdownButton } from 'react-bootstrap'
import DropDownListBoard from '../Dropdown/DropDownListBoard/DropDownListBoard'
import DropDownAddToBoard from '../Dropdown/DropDownAddToBoard/DropDownAddToBoard'

import './BoardBar.scss'

function BoardBar()
{
    const newBoardTitleRef = useRef(null)

    const [newBoardTitle, setNewBoardTitle] = useState('')

    const onNewBoardTitleChange = (e) => setNewBoardTitle(e.target.value)

    const curWp = useSelector(state =>  state.workSpace.curWP)

    const updateTitleBoard = async () => {

    }

    return(
        <nav className="navbar-board">
            <div className="board-bar-padding">
                <div className="board-bar-left">
                    <DropDownListBoard/>
                    <Col className="enter-new-title-board input">
                        <Form.Control size="sm"
                            maxLength="30"
                            type="text"
                            className="input-enter-new-column"
                            ref={newBoardTitleRef}
                            value={newBoardTitle}
                            onChange={onNewBoardTitleChange}
                            onClick={e => e.target.select()}
                            onKeyDown={event => (event.key === 'Enter') && updateTitleBoard()}>
                        </Form.Control>
                    </Col>
                    <DropdownButton title="Cài đặt" className="board-bar-setting">
                        <Dropdown.Header>Cài đặt</Dropdown.Header>
                        <Dropdown.Divider/>
                        <Dropdown.Item href="#/action-1">Xem thông tin chi tiết</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Thay đổi ảnh nền</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Quản lý nhãn</Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item href="#/action-3">Xóa bảng này</Dropdown.Item>
                    </DropdownButton>
                    <a href={`/workspace/${curWp._id}/boards`} className="back-to-workspace toggle btn">Hiển thị trong không gian làm việc</a>
                    <DropDownAddToBoard/>
                </div>
                <div className="board-bar-right">
                    <DropdownButton title="Lọc" className="board-bar-filter">
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton title="Hiện Menu" className="board-bar-menu">
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                </div>
                
            </div>
        </nav>
    )
}

export default BoardBar