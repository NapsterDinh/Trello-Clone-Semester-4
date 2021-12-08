import React, { useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button,Tooltip, CloseButton,FormControl, 
    DropdownButton, Form, Dropdown, OverlayTrigger } from "react-bootstrap";

import { boardHandleActionReducer } from "store/boardReducer";

import { showNotification, type } from "utilities/component/notification/Notification";

import './ModalChangeBGImageColor.scss'

const ImageList = [
    'https://images.unsplash.com/photo-1632042704576-7ae3ef405c78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjM4OTk1MDMy&ixlib=rb-1.2.1&q=80&w=200',
    'https://images.unsplash.com/photo-1638793770847-54861ae7cdf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjM4OTk1MDMy&ixlib=rb-1.2.1&q=80&w=200',
    'https://images.unsplash.com/photo-1638735807524-589b3fab1115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjM4OTk1MDMy&ixlib=rb-1.2.1&q=80&w=200',
    'https://images.unsplash.com/photo-1638225117594-5b731a2b5113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjM4OTk1MDMy&ixlib=rb-1.2.1&q=80&w=200',
    'https://images.unsplash.com/photo-1638458682496-e49bc72b8ae4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDV8MzE3MDk5fHx8fHwyfHwxNjM4OTk1MDMy&ixlib=rb-1.2.1&q=80&w=200',
    'https://images.unsplash.com/photo-1638299586774-673c547fdfda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDZ8MzE3MDk5fHx8fHwyfHwxNjM4OTk1MDMy&ixlib=rb-1.2.1&q=80&w=200',
    'https://images.unsplash.com/photo-1638201977889-7cf4026c7960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDl8MzE3MDk5fHx8fHwyfHwxNjM4OTk1MDMy&ixlib=rb-1.2.1&q=80&w=200',
    'https://images.unsplash.com/photo-1638130419943-1242ff0300bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDEwfDMxNzA5OXx8fHx8Mnx8MTYzODk5NTAzMg&ixlib=rb-1.2.1&q=80&w=200',
    'https://images.unsplash.com/photo-1637935142056-03d421b2b13c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDE3fDMxNzA5OXx8fHx8Mnx8MTYzODk5NTAzMg&ixlib=rb-1.2.1&q=80&w=200',
    'https://images.unsplash.com/photo-1637102839358-51288f0a30d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDM5fDMxNzA5OXx8fHx8Mnx8MTYzODk5NTE3Mg&ixlib=rb-1.2.1&q=80&w=200',
    'https://images.unsplash.com/photo-1637093629853-acc524c6dc12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDQ1fDMxNzA5OXx8fHx8Mnx8MTYzODk5NTE3Mg&ixlib=rb-1.2.1&q=80&w=200',
    'https://images.unsplash.com/photo-1636958714700-51c16720bc4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDU3fDMxNzA5OXx8fHx8Mnx8MTYzODk5NTE3Mg&ixlib=rb-1.2.1&q=80&w=200',
    'https://images.unsplash.com/photo-1636979962108-6b9a521e6881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDU5fDMxNzA5OXx8fHx8Mnx8MTYzODk5NTE3Mg&ixlib=rb-1.2.1&q=80&w=200',
    'https://images.unsplash.com/photo-1636558286997-51038eca6a53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDc1fDMxNzA5OXx8fHx8Mnx8MTYzODk5NTIzNA&ixlib=rb-1.2.1&q=80&w=200',
    'https://images.unsplash.com/photo-1635914741250-2391bd64f1ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDkxfDMxNzA5OXx8fHx8Mnx8MTYzODk5NTM3MQ&ixlib=rb-1.2.1&q=80&w=200'
]

const ModalChangeBGImageColor = (props) => 
{
    const { isShow, setIsShow, setBoard } = props
    const board = useSelector(state => state.board.board)
    const changeBG = async (index) => {
        
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
                        ImageList.map((item)=> (
                            <li onClick={() => changeBG(item)}>
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