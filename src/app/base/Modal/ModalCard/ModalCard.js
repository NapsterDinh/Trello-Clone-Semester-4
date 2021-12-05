import React, { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button,Tooltip, CloseButton, 
    DropdownButton, ProgressBar, Form, Dropdown, OverlayTrigger } from "react-bootstrap";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import logo from 'app/Images/features/1.jpg'
import { cardHandleReducer } from "store/cardReducer";
import { boardHandleActionReducer } from "store/boardReducer";

import DropDownBigTask from "app/base/Dropdown/DropDownBigTask/DropDownBigTask";
import DropDownTag from "app/base/Dropdown/DropDownTag/DropDownTag";
import DropDownDeadline from "app/base/Dropdown/DropDownDeadline/DropDownDeadline";

import { updateDescription, updateCard } from "app/core/apis/card";
import './ModalCard.scss'

const ModalCard = (props) => 
{
    //const curCard = useSelector(state => state.card.card)
    const { isActive, setIsActive, card, col, setTempCard } = props
    const dispatch = useDispatch()

    const onBlurDescription = async (e, editor) => {
        const temp = card.description;
        setTempCard({
            ...card,
            description: editor.getData()
        })
        try {
            const res = await updateDescription({
                ...card,
                description: editor.getData()
            })
            if(!res || !res.data.result)
            {
                console.log(res.data.msg)
                setTempCard({
                    ...card,
                    description: temp
                })
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const onBlurTitle = async (e) => {
        const temp = card.title;
        setTempCard({
            ...card,
            title: e.target.value
        })
        try {
            const res = await updateCard({
                ...card,
                title: e.target.value
            })
            if(!res || !res.data.result)
            {
                console.log(res.data.msg)
                setTempCard({
                    ...card,
                    title: temp
                })
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const onHideModal = () => {
        const temp = card;
        dispatch(boardHandleActionReducer({
            card: {...card},
            type: 'UPDATE_CARD'
        }))
        // dispatch(cardHandleReducer({
        //     card: '',
        //     type: 'SET_CARD'
        // }))
        setIsActive(false)
    }

    const converDateFormat = (data) => {
        var date = new Date(parseInt(data));
        var fdate = (date.getMonth() + 1)+'-'+ date.getDate()  +'-'+date.getFullYear()
        return fdate
    }
    useEffect(() => {
       console.log( converDateFormat(card.deadline))
        
    }, [])

    
    return(
        <Modal 
            className="modal-card-detail" 
            show={isActive} 
            onHide={() => onHideModal()}
            size="sm"
            backdrop="static"
            keyboard="false"
            >
            <CloseButton onClick={() => onHideModal()} />
            <Modal.Header>
                <Button 
                    variant="primary" 
                    type="submit"
                    className="wall-paper-btn"
                >Ảnh bìa</Button>
            </Modal.Header>
            <Modal.Body>
                <div className="card-header">
                    <i className="fa fa-windows icon" aria-hidden="true"></i>
                    <Form.Control
                        className="card-title"
                        as="textarea"
                        placeholder="Leave a comment here"
                        rows="1"
                        defaultValue={card.title}
                        onBlur={(e) => onBlurTitle(e)}
                        />
                    <span>trong danh sách <strong>{col.title}</strong></span>
                </div>
                <div className="card-body">
                    <div className="card-left col-9">
                        <div className="tag-deadline-container">
                            {
                                card.tagOrder.length !== 0 && 
                                <div className="tag-container">
                                    <span>Nhãn</span>
                                    <ul className="tag-list">
                                        <li className="tag-item">Worker</li>
                                        <li className="tag-item">Discuss</li>
                                        <li className="tag-item">Classroom</li>
                                        <li className="tag-item">Classroom</li>
                                        <li className="tag-add-toggle">
                                            <button className="btn">
                                                <i className="fa fa-plus" aria-hidden="true"></i>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            }
                            {
                                converDateFormat(card.deadline) === "4-3-2028" &&
                                <div className="deadline-container">
                                    <span>Ngày hết hạn</span>
                                    <div className="deadline-check">
                                        <Form>
                                            <Form.Check 
                                                type='checbox'
                                            />
                                        </Form>
                                        <span>{converDateFormat(card.deadline)}</span>
                                    </div>
                                </div>
                            }
                            
                        </div>
                        <div className="description-container">
                            <i className="fa fa-paragraph icon" aria-hidden="true"></i>
                            <span>Mô tả</span>
                            <CKEditor
                            editor={ClassicEditor}
                            data={card.description}
                            onBlur={ ( event, editor ) => onBlurDescription(event, editor)}
                            />
                        </div>
                        <div className="attachments-container">
                            <i className="fa fa-paperclip icon" aria-hidden="true"></i>
                            <span>Các tập tin đính kèm</span>
                            <ul className="attachment-list">
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={
                                            <Tooltip id={`tooltip-right`}>
                                                1.jpg
                                            </Tooltip>
                                        }
                                        >
                                            <li className="attachment-item">
                                                <img src={logo}></img>
                                                <button className="btn">
                                                    <i className="fa fa-close icon"></i>
                                                </button>
                                            </li>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={
                                            <Tooltip id={`tooltip-right`}>
                                                1.jpg
                                            </Tooltip>
                                        }
                                        >
                                            <li className="attachment-item">
                                                <img src={logo}></img>
                                                <button className="btn">
                                                    <i className="fa fa-close icon"></i>
                                                </button>
                                            </li>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={
                                            <Tooltip id={`tooltip-right`}>
                                                1.jpg
                                            </Tooltip>
                                        }
                                        >
                                            <li className="attachment-item">
                                                <img src={logo}></img>
                                                <button className="btn">
                                                    <i className="fa fa-close icon"></i>
                                                </button>
                                            </li>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={
                                            <Tooltip id={`tooltip-right`}>
                                                1.jpg
                                            </Tooltip>
                                        }
                                        >
                                            <li className="attachment-item">
                                                <img src={logo}></img>
                                                <button className="btn">
                                                    <i className="fa fa-close icon"></i>
                                                </button>
                                            </li>
                                    </OverlayTrigger>
                               
                                <li className="attachment-item-add">
                                    <button className="btn">
                                        Thêm tệp đính kèm
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <ul className="task-container">
                            <li className="big-task-item">
                                <i className="fa fa-check-square-o icon" aria-hidden="true"></i>
                                <span>Việc cần làm</span>
                                <button className="btn">
                                    Xóa
                                </button>
                                <ProgressBar animated now={45} label="60%" />
                                <ul className="small-task-list">
                                    <li className="small-task-item">
                                        <div className="checkbox-container">
                                            <Form.Check 
                                                type='checbox'
                                            />
                                        </div>
                                        <span>13131313</span>
                                        <i className="fa fa-close"></i>
                                    </li>
                                    <li className="small-task-item">
                                        <button className="btn">
                                            Thêm một mục
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="card-right col-3">
                        <ul>
                            <li style={{marginBottom: "10px"}}>
                                <span>Thêm vào thẻ</span>
                            </li>
                            <li>
                                <DropdownButton title="Thành viên" className="card-member-dropdown btn">
                                    <Dropdown.Header>Thành viên</Dropdown.Header>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item href="#/action-1">Xem thông tin chi tiết</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Thay đổi ảnh nền</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Quản lý nhãn</Dropdown.Item>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item>Xóa bảng này</Dropdown.Item>
                                </DropdownButton>
                            </li>
                            <li>
                                <DropDownTag card={card}/>
                            </li>
                            <li>
                                <DropDownBigTask />
                            </li>
                            <li>
                                <DropDownDeadline card={card} deadlineFormatted={converDateFormat(card.deadline)}/>
                            </li>
                            <li>
                                <DropdownButton title="Đính kèm" className="card-attachments-dropdown btn">
                                    <Dropdown.Header>Đính kèm</Dropdown.Header>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item href="#/action-1">Xem thông tin chi tiết</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Thay đổi ảnh nền</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Quản lý nhãn</Dropdown.Item>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item>Xóa bảng này</Dropdown.Item>
                                </DropdownButton>
                            </li>
                            <li>
                                <DropdownButton title="Ảnh bìa" className="card-wallpaper-dropdown btn">
                                    <Dropdown.Header>Ảnh bìa</Dropdown.Header>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item href="#/action-1">Xem thông tin chi tiết</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Thay đổi ảnh nền</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Quản lý nhãn</Dropdown.Item>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item>Xóa bảng này</Dropdown.Item>
                                </DropdownButton>
                            </li>
                        </ul>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button 
                    variant="primary" 
                    type="submit"
                >Xóa không gian làm việc</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalCard