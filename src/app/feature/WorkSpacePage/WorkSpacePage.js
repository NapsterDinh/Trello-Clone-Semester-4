import React ,{useState} from "react";
import { Container, Row, Col, Accordion, Card, Modal,Button} from "react-bootstrap";

import './WorkSpacePage.scss'

import AppBar from "app/base/AppBar/AppBar";
import ToggleWorkSpace from "app/base/CustomToggle/ToggleWorkSpace/ToggleWorkSpace";
import ModalAddWorkSpace from "app/base/Modal/ModalAddWorkSpace/ModalAddWorkSpace";
import ModalInviteTeamMates from "app/base/Modal/ModalInviteTeamMates/ModalInviteTeamMates";
import WorkSpacePane from "app/base/Pane/WorkSpacePane/WorkSpacePane";

const WorkSpacePage = () => {
    const [show, setShow] = useState(false);
    const [showInvite, setShowInvite] = useState(false)

    const handleModal = (state) => {
        state === 'SHOW' ? setShow(true) : setShow(false)
    }

    const handleModalInvite = (state) => {
        state === 'SHOW' ? setShowInvite(true) : setShowInvite(false)
    }

    return(
        <div className="trello-app workspace-page">
            <AppBar/>
            <Container fluid={"md"} className="middle-workspace-page">
                <Row>
                    <Col md={"3"}>
                        <Card.Header className="workspaces">
                            <span>Các không gian làm việc</span>
                            <i className="fa fa-plus" aria-hidden="true" onClick={() => handleModal('SHOW')}></i>
                        </Card.Header>
                        <ModalAddWorkSpace show={show} handleModal={handleModal} handleModalInvite={handleModalInvite}/>
                        <ModalInviteTeamMates showInvite={showInvite} handleModalInvite={handleModalInvite} />
                        <Accordion>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    <ToggleWorkSpace
                                        className=""
                                        image="/1.jpg"
                                        name="CNPM"
                                        />
                                    <i className="fa fa-chevron-up" aria-hidden="true"></i>
                                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                </Accordion.Toggle>

                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <ul className="action-list">
                                            <li className="action-list-item">
                                                <i className="fa fa-table" aria-hidden="true"></i>
                                                <span>Bảng</span>
                                            </li>
                                            <li className="action-list-item">
                                                <i className="fa fa-heart-o" aria-hidden="true"></i>
                                                <span>Điểm nổi bật</span>
                                            </li>
                                            <li className="action-list-item">
                                                <i className="fa fa-users" aria-hidden="true"></i>
                                                <span>Thành viên</span>
                                            </li>
                                            <li className="action-list-item">
                                                <i className="fa fa-cog" aria-hidden="true"></i>
                                                <span>Cài đặt</span>
                                            </li>
                                        </ul>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>

                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="1">
                                    <ToggleWorkSpace
                                            className=""
                                            image="/1.jpg"
                                            name="CNPM"
                                            />
                                    <i className="fa fa-chevron-up" aria-hidden="true"></i>
                                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                </Accordion.Toggle>

                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                    <ul className="action-list">
                                            <li className="action-list-item">
                                                <i className="fa fa-table" aria-hidden="true"></i>
                                                <span>Bảng</span>
                                            </li>
                                            <li className="action-list-item">
                                                <i className="fa fa-heart-o" aria-hidden="true"></i>
                                                <span>Điểm nổi bật</span>
                                            </li>
                                            <li className="action-list-item">
                                                <i className="fa fa-users" aria-hidden="true"></i>
                                                <span>Thành viên</span>
                                            </li>
                                            <li className="action-list-item">
                                                <i className="fa fa-cog" aria-hidden="true"></i>
                                                <span>Cài đặt</span>
                                            </li>
                                        </ul>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>
                    <Col md={"9"}>
                        <WorkSpacePane />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default WorkSpacePage