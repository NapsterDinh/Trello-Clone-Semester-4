import React ,{useEffect, useState} from "react";
import { Container, Row, Col, Accordion, Card, Modal,Button} from "react-bootstrap";
import { NavLink, generatePath, Route, useLocation } from 'react-router-dom'

import './WorkSpacePage.scss'

import AppBar from "app/base/AppBar/AppBar";
import ToggleWorkSpace from "app/base/CustomToggle/ToggleWorkSpace/ToggleWorkSpace";
import ModalAddWorkSpace from "app/base/Modal/ModalAddWorkSpace/ModalAddWorkSpace";
import ModalInviteTeamMates from "app/base/Modal/ModalInviteTeamMates/ModalInviteTeamMates";
import WorkSpacePane from "app/base/Pane/WorkSpacePane/WorkSpacePane";
import { getWorkSpaceOwerAndGuest } from 'app/core/apis/workSpace'
import { showNotification, type } from "utilities/component/notification/Notification";
import { mainWorkSpaceReducer } from 'store/mainWorkSpaceReducer'
import { useDispatch, useSelector } from 'react-redux'

const path = "/workspace/:id/:type(boards||members||highlight||setting)"

const WorkSpacePage = (props) => {
    const [show, setShow] = useState(false);
    const [showInvite, setShowInvite] = useState(false)
    const wGuest = useSelector(state => state.workSpace.guestWP)
    const wOwner = useSelector(state => state.workSpace.owerWP)
    const location = useLocation()
    const dispatch = useDispatch()

    const handleModal = (state) => {
        state === 'SHOW' ? setShow(true) : setShow(false)
    }

    const handleModalInvite = (state) => {
        state === 'SHOW' ? setShowInvite(true) : setShowInvite(false)
    }

    const fetchWorkSpaceOwerAndGuest = async () => 
    {
        const res = await getWorkSpaceOwerAndGuest()
        if(res && res.data.result && res.status == 200)
        {
            console.log( [...res.data.data.workSpaceAndBoardOwer.resultOwer])
            console.log( [...res.data.data.workSpaceAndBoardGuest.resultGuest])
            dispatch(mainWorkSpaceReducer({
                resultOwer: [...res.data.data.workSpaceAndBoardOwer.resultOwer],
                resultGuest: [...res.data.data.workSpaceAndBoardGuest.resultGuest],
                boardGuest: [...res.data.data.workSpaceAndBoardGuest.boardGuest],
                boardOwer: [...res.data.data.workSpaceAndBoardOwer.boardOwer],
                type: 'fetchArray'
            }))
        }
        else
        {
            showNotification('Loading workspace failed', res.data.msg, type.danger, 3000)
        }
    }

    useEffect(() => {
        fetchWorkSpaceOwerAndGuest()
    }, [location])

    

    return(
        <div className="trello-app workspace-page">
            <AppBar/>
            <Container fluid={"md"} className="middle-workspace-page">
                <Row>
                    <Col md={"3"}>
                        <Card.Header className="workspaces">
                            <span>Các không gian làm việc của bạn</span>
                            <i className="fa fa-plus" aria-hidden="true" onClick={() => handleModal('SHOW')}></i>
                        </Card.Header>
                        <ModalAddWorkSpace show={show} handleModal={handleModal} handleModalInvite={handleModalInvite}/>
                        <ModalInviteTeamMates showInvite={showInvite} handleModalInvite={handleModalInvite} />
                        <Accordion>
                            {
                                wOwner?.map((item, index) => (
                                    <Card key={"wOwner"+item._id}>
                                        <Accordion.Toggle as={Card.Header} eventKey={`owner${index}`}>
                                            <ToggleWorkSpace
                                                className=""
                                                image="/1.jpg"
                                                name={item.name}
                                                />
                                            <i className="fa fa-chevron-up" aria-hidden="true"></i>
                                            <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                        </Accordion.Toggle>

                                        <Accordion.Collapse eventKey={`owner${index}`}>
                                            <Card.Body>
                                                <ul className="action-list">
                                                    <NavLink to={generatePath(path,{id: item._id, type: "boards"})} exact className="link-container" activeClassName='selected'>
                                                        <li className="action-list-item">
                                                            <i className="fa fa-table" aria-hidden="true"></i>
                                                            <span>Bảng</span>
                                                        </li>
                                                    </NavLink>

                                                    <NavLink to={generatePath(path,{id: item._id, type: "highlight"})} exact className="link-container" activeClassName='selected'>
                                                        <li className="action-list-item">
                                                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                                                            <span>Điểm nổi bật</span>
                                                        </li>
                                                    </NavLink>

                                                    <NavLink to={generatePath(path,{id: item._id, type: "members"})} exact className="link-container" activeClassName='selected'>
                                                        <li className="action-list-item">
                                                            <i className="fa fa-users" aria-hidden="true"></i>
                                                            <span>Thành viên</span>
                                                        </li>
                                                    </NavLink>

                                                    <NavLink to={generatePath(path,{id: item._id, type: "setting"})} exact className="link-container" activeClassName='selected'>
                                                        <li className="action-list-item">
                                                            <i className="fa fa-cog" aria-hidden="true"></i>
                                                            <span>Cài đặt</span>
                                                        </li>
                                                    </NavLink>
                                                </ul>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                ))
                            }
                        {
                            wGuest?.length !== 0 && 
                            <>
                                <Card.Header className="workspaces">
                                        <span>Các không gian làm việc khách</span>
                                </Card.Header>
                                    {
                                    wGuest?.map((item, index) => (
                                        <Card key={"wGuest"+item._id}>
                                            <Accordion.Toggle as={Card.Header} eventKey={`guest${wOwner?.length-1+index}`}>
                                                <ToggleWorkSpace
                                                    className=""
                                                    image="/1.jpg"
                                                    name={item.name}
                                                    />
                                                <i className="fa fa-chevron-up" aria-hidden="true"></i>
                                                <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                            </Accordion.Toggle>

                                            <Accordion.Collapse eventKey={`guest${wOwner?.length-1+index}`}>
                                                <Card.Body>
                                                    <ul className="action-list">
                                                    <NavLink to={generatePath(path,{id: item._id, type: "boards"})} exact className="link-container" activeClassName='selected'>
                                                        <li className="action-list-item">
                                                            <i className="fa fa-table" aria-hidden="true"></i>
                                                            <span>Bảng</span>
                                                        </li>
                                                    </NavLink>

                                                    <NavLink to={generatePath(path,{id: item._id, type: "setting"})} exact className="link-container" activeClassName='selected'>
                                                        <li className="action-list-item">
                                                            <i className="fa fa-cog" aria-hidden="true"></i>
                                                            <span>Cài đặt</span>
                                                        </li>
                                                    </NavLink>
                                                    </ul>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    ))
                                    }
                            </>
                        }
                        </Accordion>
                    </Col>
                    <Col md={"9"}>
                        <Route exact path={"/workspace/:id"}>
                            <WorkSpacePane fetchWorkSpaceOwerAndGuest={fetchWorkSpaceOwerAndGuest}/>
                        </Route>
                        <Route exact path={"/workspace/:id/:type"}>
                            <WorkSpacePane fetchWorkSpaceOwerAndGuest={fetchWorkSpaceOwerAndGuest}/>
                        </Route>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default WorkSpacePage