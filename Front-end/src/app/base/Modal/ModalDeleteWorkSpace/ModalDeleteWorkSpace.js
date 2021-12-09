import React, { useState } from "react";
import { Modal, Button, FormControl, Form } from "react-bootstrap";
import { useParams, useHistory, useLocation } from "react-router";
import { deleteWorkSpace, removeUser } from "app/core/apis/workSpace";
import './ModalDeleteWorkSpace.scss'
import { showNotification, type } from "utilities/component/notification/Notification";
import LoadingOverlay from 'react-loading-overlay';
import { useSelector } from "react-redux";

const ModalDeleteWorkSpace = (props) => 
{
    const { show, setShow, email, isDeleteWP } = props
    let { id } = useParams()
    const history = useHistory()
    const [ isActive, setIsActive ] = useState(false)
    const location = useLocation()

    const curWP = useSelector(state => state.workSpace.curWP)
    const type1 = useSelector(state => state.workSpace.type)
    const [ text, setText ] = useState('')

    const onHandleChange = (text1) => 
    {
        setText(text1)
    }

    const onClickDelete = async (e) => 
    {
        setIsActive(true)
        try {
            const res = await deleteWorkSpace(id)
            setShow(false)
            setIsActive(false)
            if(res && res.data.msg)
            {
                showNotification('Xóa không gian làm việc thành công', 'Bạn vừa xóa một không gian làm việc', type.succsess, 3000)
                history.push('/workspace')
            }
            else
            {
                showNotification('Xóa không gian làm việc thất bại', res.data.msg, type.danger, 3000)
            }
        } catch (error) {
            showNotification('Xóa không gian làm việc thất bại', error.message, type.danger, 3000)
        } 
    }

    const onClickRemove = async (e) => 
    {
        setIsActive(true)
        try {
            const res = await removeUser({
                _id: id,
                userMail: new Array(email)
            })
            setShow(false)
            setIsActive(false)
            if(res && res.data.result)
            {
                showNotification('Loại bỏ người này khỏi không gian làm việc thành công', 'Bạn vừa Loại bỏ người này khỏi 1 không gian làm việc', type.succsess, 3000)
                history.push(location)
            }
            else
            {
                showNotification('Loại bỏ người này khỏi không gian làm việc thất bại', res.data.msg, type.danger, 3000)
            }
        } catch (error) {
            setShow(false)
            setIsActive(false)
            showNotification('Loại bỏ người này khỏi không gian làm việc thành công', 'Bạn vừa Loại bỏ người này khỏi 1 không gian làm việc', type.succsess, 3000)
            history.push(location)
        } 
    }
    return(
        <Modal className="modal-delete-wp" show={show} 
            onHide={() => setShow(false)}
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
                    <h5>{ isDeleteWP ? `Xóa không gian làm việc` : "Loại bỏ người này khỏi không gian làm việc"}</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>{ isDeleteWP ? `Bạn có chắc chắn muốn xóa không gian ${curWP.name} ?` : "Bạn có chắc muốn Loại bỏ người này khỏi không gian làm việc này ?"}</h5>
                <span>Những điều cần biết: </span>
                <ul>
                    <li>Điều này vĩnh viễn và không thể hoàn tác</li>
                    {
                        isDeleteWP &&
                        <>
                            <li>Tất cả các bảng trong không gian làm việc sẽ bị xóa</li>
                            <li>Thành viên sẽ không thể tiếp tục tương tác với các bảng</li>
                        </>
                    }
                    {
                        !isDeleteWP &&
                        <>
                            <li>Bạn không thể nhìn thấy không gian làm việc này</li>
                            <li>Bạn cũng không thể tương tác với các bảng trong không gian này được nữa</li>
                        </>
                    }
                    
                </ul>
                <span>Nhập tên không gian làm việc để xóa</span>
                <FormControl
                    placeholder={curWP.name}
                    type="text"
                    onChange={(e) => {     
                        onHandleChange(e.target.value)
                    }}
                >
                </FormControl>
            </Modal.Body>
            <Modal.Footer>
                {
                    isDeleteWP && 
                    <Button 
                    variant="primary" 
                    type="submit"
                    disabled={text !== curWP.name}
                    onClick={onClickDelete}
                >Xóa không gian làm việc</Button>
                }
                {
                    !isDeleteWP && 
                    <Button 
                    variant="primary" 
                    type="submit"
                    disabled={text !== curWP.name}
                    onClick={onClickRemove}
                >Loại bỏ người này khỏi không gian làm việc</Button>
                }
                
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDeleteWorkSpace