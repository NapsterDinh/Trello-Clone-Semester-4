import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Button, DropdownButton } from 'react-bootstrap'
import ToggleWorkSpace from 'app/base/CustomToggle/ToggleWorkSpace/ToggleWorkSpace';
import logo from 'app/Images/features/1.jpg'
import { boardHandleActionReducer } from 'store/boardReducer'
import { showNotification, type } from 'utilities/component/notification/Notification';

import { addUserToBoard, removeUserToBoard } from 'app/core/apis/board';

import './DropDownAddToBoard.scss'

function DropDownAddToBoard(props)
{
    // const { boardList } = props
    const boardUsers = useSelector(state => state.board.listUserBoard)
    const notBoardUsers = useSelector(state => state.board.listNotUserBoard)
    const user = useSelector(state => state.user.user)
    const [ allUserBoard, setAllUserBoard ] = 
                useState(boardUsers.concat(notBoardUsers))
    const dispatch = useDispatch()

    const _id = window.location.pathname.split("/");
    const boardId = _id[2];

    const onAddUserToBoard = async (item) => {
        try {
            const res = await addUserToBoard({
                _id: boardId,
                userId: new Array(item.email)
            })
            if(res && res.data.result)
            {
                dispatch(boardHandleActionReducer(
                    {
                        type: 'ADD_USER_TO_BOARD',
                        user: item
                    }
                ))
                showNotification('Thêm thành viên vào bảng thành công', 'Thêm thành viên vào bảng thành công', type.succsess, 3000)
            
            }
            else
            {
                showNotification('Thêm thành viên vào bảng thất bại', res.data.msg , type.danger, 3000)
                console.log(res.data.msg)
            }
        } catch (error) {
            console.log(error.message)
            showNotification('Thêm thành viên vào bảng thất bại', error.message, type.succsess, 3000)
        }
    }

    const onRemoveUserFromBoard = async (item) => {
        try {
            const res = await removeUserToBoard({
                _id: boardId,
                userId: new Array(item.email)
            })
            if(res && res.data.result)
            {
                dispatch(boardHandleActionReducer(
                    {
                        type: 'REMOVE_USER_FROM_BOARD',
                        user: item
                    }
                ))
                showNotification('Gỡ thành viên vào bảng thành công', 'Gỡ thành viên vào bảng thành công', type.succsess, 3000)
            }
            else
            {
                console.log(res.data.msg)
                showNotification('Gỡ thành viên vào bảng thất bại', res.data.msg , type.danger, 3000)
            }
        } catch (error) {
            showNotification('Gỡ thành viên vào bảng thất bại', error.message, type.succsess, 3000)
            console.log(error.message)
        }
    }


    return (
        <DropdownButton title="Thêm thành viên" className="board-bar-invite">
            <Dropdown.Header>Thêm thành viên vào bảng</Dropdown.Header>
            <Dropdown.Divider/>
            <ul className="invite-board-body">
                {
                    allUserBoard.map(item => (
                        <li key={`userBoard${item._id}`} className={
                            boardUsers.findIndex(item1 => item1._id === item._id) === -1 
                            ? "item" : (item._id === user._id) ? "item admin" : "item exist" 
                        }>
                            <div className="body-left">
                                <img src={logo}></img>
                                <div className="user-item-netroi">
                                    <h5>{item.name}</h5>
                                    <h6>Chưa tham gia</h6>
                                    <h6>Đã tham gia</h6>
                                </div>
                            </div>
                            
                            <span>Quản trị viên</span>
                            <Button onClick={() => onAddUserToBoard(item)} className="btn-add">Thêm</Button>
                            <Button onClick={() => onRemoveUserFromBoard(item)} className="btn-remove">Gỡ</Button>
                        </li>
                    ))
                }      
            </ul>
            <Dropdown.Divider/>
        </DropdownButton>
    )
}

export default DropDownAddToBoard