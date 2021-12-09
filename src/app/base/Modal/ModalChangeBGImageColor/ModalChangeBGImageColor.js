import React, { useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { upLoadImage } from "app/core/apis/board";
import { Modal, Button,Tooltip, CloseButton,FormControl, 
    DropdownButton, Form, Dropdown, OverlayTrigger } from "react-bootstrap";
import { boardHandleActionReducer } from "store/boardReducer";

import { showNotification, type } from "utilities/component/notification/Notification";

import './ModalChangeBGImageColor.scss'

const ImageList = [
    'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/bf776ffa2e906f248ea123ad04dc7493/photo-1632042704576-7ae3ef405c78.jpg',
    'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2134x1600/82c3d5103f8af03dab9b8b35d2ff8a68/photo-1638130419943-1242ff0300bf.jpg',
    'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2048x1266/676c6ba95badd5b668481ef366800f33/photo-1638176820495-52a7c2ad8505.jpg',
    'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2048x1138/89e7cc3e0a3a323fb4cc314bacd7b60b/photo-1638024510305-c36fcc0bf3b1.jpg',
    'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1439x1920/71aa6bb35b5a26d11e600b0a142a8abe/photo-1637404230552-5ac6d76cb3a0.jpg',
    'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1439x1920/71aa6bb35b5a26d11e600b0a142a8abe/photo-1637404230552-5ac6d76cb3a0.jpg',
    'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1280x1920/4c79ec4d12b062da965222aa1549ffc9/photo-1636964204923-ebb7558340b3.jpg',
]

const ModalChangeBGImageColor = (props) => 
{
    const { isShow, setIsShow, setBoard } = props
    const board = useSelector(state => state.board.board)
    const dispatch = useDispatch()
    const changeBG = async (index) => {
        const temp = {...board}

        dispatch(boardHandleActionReducer({
            board:{
                ...board,
                image: ImageList[index]
            },
            type: 'SET_BOARD'
          }))
        
        try {
            const res = await upLoadImage({
                _id: board._id,
                link: ImageList[index]
            })
            
            if(!res || !res.data.result)
            {
                dispatch(boardHandleActionReducer({
                    board:temp,
                    type: 'SET_BOARD'
                  }))
                showNotification('Thay đổi hình ảnh thất bại', res.data.msg, type.danger, 3000)
            }
            else
            {
                showNotification('Thay đổi hình ảnh thành công', 'Thay đổi hình ảnh thành công', type.succsess, 3000)
            }
        } catch (error) {
            dispatch(boardHandleActionReducer({
                board:temp,
                type: 'SET_BOARD'
              }))
            console.log(error)
            showNotification('Thay đổi hình ảnh thất bại', error.message, type.danger, 3000)
        }
    }
    return(
        <Modal 
            className='modal-change-background-board'
            show={isShow} 
            onHide={() => setIsShow(false)}
            size="sm"
            backdrop="static"
            keyboard="false"
            >
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5>Thay đổi hình nền của bảng</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    {
                        ImageList.map((item,index)=> (
                            <li onClick={() => changeBG(index)}>
                                <img src={item}></img>
                            </li>
                        ))
                    }
                </ul>
            </Modal.Body>
        </Modal>
    )
}

export default ModalChangeBGImageColor