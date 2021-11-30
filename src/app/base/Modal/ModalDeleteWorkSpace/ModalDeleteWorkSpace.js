import React, { useState } from "react";
import { Modal, Button, FormControl, Form } from "react-bootstrap";
import { useParams, useHistory } from "react-router";
import { deleteWorkSpace } from "app/core/apis/workSpace";
import './ModalDeleteWorkSpace.scss'
import { showNotification, type } from "utilities/component/notification/Notification";
import LoadingOverlay from 'react-loading-overlay';
import { useSelector } from "react-redux";

const ModalDeleteWorkSpace = (props) => 
{
    const { show, setShow } = props
    let { id } = useParams()
    const history = useHistory()
    const [ isActive, setIsActive ] = useState(false)

    const curWP = useSelector(state => state.workSpace.curWP)

    const [ text, setText ] = useState('')

    const onHandleChange = (text1) => 
    {
        setText(text1)
    }

    const onClickDelete = async (e) => 
    {
        setIsActive(true)
        const res = await deleteWorkSpace(id)
        setShow(false)
        setIsActive(false)
        try {
            const res = await deleteWorkSpace(id)
            if(res && res.data.msg)
            {
                showNotification('Delete WorkSpace Sucessfull', 'You recently delete a workspace', type.succsess, 3000)
                history.push('/workspace')
            }
            else
            {
                showNotification('Delete WorkSpace failed', res.data.msg, type.danger, 3000)
            }
        } catch (error) {
            showNotification('Delete WorkSpace failed', error.message, type.danger, 3000)
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
                    <h5>Xóa không gian làm việc</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Bạn có chắc chắn muốn xóa không gian {curWP.name} ?</h5>
                <span>Những điều cần biết: </span>
                <ul>
                    <li>Điều này vĩnh viễn và không thể hoàn tác</li>
                    <li>Tất cả các bảng trong không gian làm việc sẽ bị xóa</li>
                    <li>Thành viên sẽ không thể tiếp tục tương tác với các bảng</li>
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
                <Button 
                    variant="primary" 
                    type="submit"
                    disabled={text !== curWP.name}
                    onClick={onClickDelete}
                >Xóa không gian làm việc</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDeleteWorkSpace