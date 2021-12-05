import React, { useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import { Col, Form, Button, Dropdown, DropdownButton } from 'react-bootstrap'
import DropDownListBoard from '../Dropdown/DropDownListBoard/DropDownListBoard'
import DropDownAddToBoard from '../Dropdown/DropDownAddToBoard/DropDownAddToBoard'
import { showNotification, type } from 'utilities/component/notification/Notification'
import { boardHandleActionReducer } from 'store/boardReducer'

import { deleteBoard, updateBoard } from 'app/core/apis/board'

import './BoardBar.scss'

function BoardBar()
{
    const curWp = useSelector(state =>  state.workSpace.curWP)

    const curBoard = useSelector(state =>  state.board.board)

    const history = useHistory()

    const dispatch = useDispatch()

    const onDeleteBoard = async (e) => {
        e.preventDefault()
        try {
            const res = await deleteBoard(curBoard._id)
            if(res && res.data.result)
            {
                console.log(res)
                history.push(`/workspace/${curWp._id}/boards`)
                showNotification('Xóa bảng thành công', 'Bảng của bạn đã được xóa', type.succsess, 3000)
            }
            else
            {
                showNotification('Xóa bảng thất bại', 'Bảng của bạn vẫn chưa được xóa', type.danger, 3000)
                console.log(res.data.msg)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const onBlurTitle = async (e) => {
        const temp = curBoard.title;
        dispatch(boardHandleActionReducer({
            title: e.target.value,
            type: 'SET_TITLE_BOARD'
        }))
        try {
            const res = await updateBoard({
                ...curBoard,
                title: e.target.value
            })
            console.log(res)
            if(!res || !res.data.result)
            {
                console.log(res.data.msg)
                dispatch(boardHandleActionReducer({
                    title: temp,
                    type: 'SET_TITLE_BOARD'
                }))
            }
        } catch (error) {
            console.log(error.message)
        }
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
                            defaultValue={curBoard.title}
                            onClick={e => e.target.select()}
                            onKeyDown={event => {
                                if(event.key === 'Enter') {
                                    onBlurTitle(event)
                                    event.target.blur()
                            }}}
                            onBlur={(e) => onBlurTitle(e)}
                            >
                        </Form.Control>
                    </Col>
                    <DropdownButton title="Cài đặt" className="board-bar-setting">
                        <Dropdown.Header>Cài đặt</Dropdown.Header>
                        <Dropdown.Divider/>
                        <Dropdown.Item href="#/action-1">Xem thông tin chi tiết</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Thay đổi ảnh nền</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Quản lý nhãn</Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item onClick={onDeleteBoard}>Xóa bảng này</Dropdown.Item>
                    </DropdownButton>
                    <a href={`/workspace`} className="back-to-workspace toggle btn">Hiển thị trong không gian làm việc</a>
                    <DropDownAddToBoard />
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