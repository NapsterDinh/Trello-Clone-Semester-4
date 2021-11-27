import React, {useEffect, useState} from "react";
import { Modal,Button} from "react-bootstrap";
import { Form, Col, Row } from 'react-bootstrap'

import boardEmpty from 'app/Images/features/empty-board.svg'
import AutoComplete from "app/Common/AutoComplete/AutoComplete";

import './ModalInviteTeamMates.scss'


const ModalInviteTeamMates = (props) => {
    const { handleModalInvite, showInvite } = props

    const [ inviteList, setInviteList ] = useState([])

    const handleSubmit = () => {
        //call API to invitePeople
    }
    return (
        <Modal show={showInvite} 
        onHide={() => handleModalInvite(false)}
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
                        <AutoComplete inviteList={inviteList} setInviteList={setInviteList} />
                        <strong>Mẹo chuyên gia!</strong>
                        <span>Dán email vào đây bao nhiêu tùy theo nhu cầu.</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            variant="primary" 
                            type="submit"
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


