import React, {useState} from "react";
import { Modal, Form , FormControl, Button } from "react-bootstrap";
import LoadingOverlay from 'react-loading-overlay';
import { useParams, useHistory, useLocation } from "react-router";
import { addNewBoard } from "app/core/apis/board";
import { showNotification, type } from "utilities/component/notification/Notification";
import { mainWorkSpaceReducer } from 'store/mainWorkSpaceReducer'
import { useDispatch, useSelector } from 'react-redux'

import './ModalAddNewBoard.scss'

const ModalAddNewBoard = (props) => 
{
    const { showAddNewBoard, setShowAddNewBoard, fetchWorkSpaceOwerAndGuest } = props
    const [ isActive, setIsActive ] = useState(false)
    let { id } = useParams()
    const [ title, setTitle ] = useState('')
    const [ error, setError ] = useState('')
    const [ workSpaceId, setworkSpaceId ] = useState(id)
    const dispatch = useDispatch()
    const onHandleChange = (text1) => 
    {
        if(text1==="")
        {
            setError('Bảng cần phải có tiêu đề')
        }
        else if(text1.length <= 4 || text1.length >= 20 )
        {
            setError('Tiêu đề của bảng phải từ 4 đến 20 kí tự')
        }
        else
        {
            setError('')
            setTitle(text1)
        }
    }

    const onClickCreateNewBoard = async (e) => 
    {
        if(title==="")
        {
            setError('Bảng cần phải có tiêu đề')
        }   
        setIsActive(true)
        const res = await addNewBoard({
            title: title,
            workSpaceId: workSpaceId
        })
        
        if(res && res.data.result)
        {
            await fetchWorkSpaceOwerAndGuest()
            dispatch(mainWorkSpaceReducer({_id: id, type: 'fetchObject'}))
            setShowAddNewBoard(false)
            setIsActive(false)
            showNotification('Add new board success', 'A new board has been created', type.succsess, 3000)
        }
        else
        {   
            setIsActive(false)
            showNotification('Add new board failed', res.data.msg, type.danger, 3000)
        }
        setShowAddNewBoard(false)
    }
    return(
        <Modal className="modal-delete-wp" show={showAddNewBoard} 
            onHide={() => {
                setTitle('')
                setError('')
                setworkSpaceId('')
                setShowAddNewBoard(false)
            }}
            >
            {
                isActive &&
                <LoadingOverlay
                    active={isActive}
                    spinner
                    text={'Đợi 1 xíu...'}
                    >
                </LoadingOverlay>
            }
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5>Tạo mới bảng</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>
                        Tiêu đề của bảng: 
                    </Form.Label>
                    <FormControl
                        isInvalid={error}
                        type="text"
                        onChange={(e) => {     
                            onHandleChange(e.target.value)
                        }}
                    />
                    <Form.Control.Feedback type="invalid">
                        {error}
                    </Form.Control.Feedback>
                </Form.Group>
                {/* <Form.Group>
                    <Form.Label>
                        Không gian làm việc: 
                    </Form.Label>
                    <Form.Control
                        as="select"
                        >
                            {
                                ownerWP.map((item,index) => {
                                        if(item._id === id)
                                        {
                                            return(
                                                <option key={index} selected value={item._id}>{item.name}</option>
                                            )
                                        }
                                        else
                                        {
                                            return(
                                                <option key={index} value={item._id}>{item.name}</option>
                                            )
                                        }
                                        
                                })
                            }
                        </Form.Control>
                </Form.Group> */}
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant="primary" 
                    type="submit"
                    onClick={onClickCreateNewBoard}
                    disabled={error}
                >Tạo bảng</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAddNewBoard