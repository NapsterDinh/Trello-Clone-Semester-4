import React, {useEffect, useState} from "react";
import { Modal,Button} from "react-bootstrap";
import { Form, Col, Row } from 'react-bootstrap'

import boardEmpty from 'app/Images/features/empty-board.svg'
import AutoComplete from "app/Common/AutoComplete/AutoComplete";
import { inviteUser } from "app/core/apis/workSpace";
import { showNotification, type } from "utilities/component/notification/Notification";

import './ModalInviteTeamMates.scss'


const ModalInviteTeamMates = (props) => {
    const { handleModalInvite, showInvite, allUser, usersWP, id } = props

    const [ inviteList, setInviteList ] = useState([])

    const handleSubmit = async () => {
        try {
            const res = await inviteUser(
                {
                    _id: id,
                    userMail: inviteList
                }
            )
            if(res)
            {
                showNotification(
                    "Mời người dùng thành công",
                    "Email mời vào không gian làm việc đã được gửi.",
                    type.succsess,
                    3000
                )
            }
            else
            {
                showNotification(
                    "Mời người dùng thất bại",
                    res.data.msg,
                    type.danger,
                    3000
                )
            }
        } catch (error) {
            showNotification(
                "Mời người dùng thất bại",
                error.message,
                type.danger,
                3000
            )
        }
        //call API to invitePeople
        setInviteList([])
        handleModalInvite(false)
    }
    return (
        <Modal show={showInvite} 
        onHide={() => {
            setInviteList([])
            handleModalInvite(false)
        }}
        backdrop="static"
        keyboard={false}
        >
            <Row>
                <Col className="col-left" md={6}>
                <Modal.Header closeButton>
                    <Modal.Title>Mời nhóm của bạn</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit}>
                    <Modal.Body>
                        <h6>Trello làm cho làm việc nhóm là việc tốt nhất của bạn. Mời các thành viên nhóm mới của bạn để bắt đầu!</h6>
                        <Form.Label>Các thành viên không gian làm việc</Form.Label>
                        <AutoComplete 
                            inviteList={inviteList} 
                            setInviteList={setInviteList} 
                            allUser={allUser} 
                            usersWP={usersWP}
                        />
                        <strong>Mẹo chuyên gia!</strong>
                        <span>Dán email vào đây bao nhiêu tùy theo nhu cầu.</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            variant="primary" 
                            type="button"
                            onClick={() => handleSubmit()}
                        >Mời vào không gian làm việc</Button>
                        <a href="">Tôi sẽ thực hiện sau</a>
                    </Modal.Footer>
                </Form>
                </Col>
                <Col className="col-right" md={6}>
                    <img src={boardEmpty} alt=""></img>
                </Col>
            </Row>
            
        </Modal>
    )
    
}

export default ModalInviteTeamMates


