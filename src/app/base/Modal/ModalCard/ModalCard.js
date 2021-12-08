import React, { useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button,Tooltip, CloseButton,FormControl, 
    DropdownButton, Form, Dropdown, OverlayTrigger } from "react-bootstrap";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import logo from 'app/Images/features/1.jpg'
import { cardHandleReducer } from "store/cardReducer";
import { boardHandleActionReducer } from "store/boardReducer";
import { converDateFormat } from "utilities/convertDate";
import ConfirmModal from "app/Common/confirmModal";
import { deleteCard, updateImage, updateAttachment, deleteAttachment } from "app/core/apis/card";
import PreviewImage from "utilities/component/PreviewImage/PreviewImage";

import { showNotification, type } from "utilities/component/notification/Notification";

import SectionBigTask from 'app/base/Section/SectionBigTask/SectionBigTask'
import DropDownBigTask from "app/base/Dropdown/DropDownBigTask/DropDownBigTask";
import DropDownTag from "app/base/Dropdown/DropDownTag/DropDownTag";
import DropDownDeadline from "app/base/Dropdown/DropDownDeadline/DropDownDeadline";
import DropDownWPaperCard from "app/base/Dropdown/DropDownWPaperCard/DropDownWPaperCard";
import DropDownAttachment from 'app/base/Dropdown/DropDownAttachment/DropDownAttachment'
import { mapOrderAndReplaceNotExist } from 'utilities/sort'
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from 'utilities/constants'

import { updateDescription, updateCard, updateStatus } from "app/core/apis/card";
import './ModalCard.scss'

const ModalCard = (props) => 
{
    //const curCard = useSelector(state => state.card.card)
    const { isActive, setIsActive, setColumns, card, col, setTempCard, onUpdateStatus, indexCol } = props
    console.log(card)
    const [ showConfirmModal, setShowConfirmModal ] = useState(false)
    const listTag = useSelector(state => state.board.listTag)
    const board = useSelector(state => state.board.board)
    const [ isShowTagDropDown, setIsShowTagDropDown ] = useState(false)
    
    const [ isPreviewImage, setIsPreviewImage ] = useState(false)
    const [ curImagePreview, setCurImagePreview ] = useState('')
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
    
    const onDeleteAttachment = async (index) => {
        const cloneCard = {...card}
        try {
            const temp = [...card.attachment]
            temp.splice(index, 1)
            setTempCard({
                ...card,
                attachment: temp
            })
            const res = await deleteAttachment({
                _id: card._id,
                attachment: temp
            })
            if(!res || !res.data.result)
            {
                setTempCard(cloneCard)
                showNotification('Cập nhật tệp đính kèm thất bại', 'Cập nhật tệp đính kèm thất bại', type.danger, 3000)
                console.log(res.data.msg)
            }

        } catch (error) {
            setTempCard(cloneCard)
            showNotification('Cập nhật tệp đính kèm thất bại', error.message, type.danger, 3000)
            console.log(error)
        }
    }

    const onDeleteCard = async (type1) => {
        if(type1 === MODAL_ACTION_CONFIRM)
        {
            try {
                const res = await deleteCard(card._id)
                if(res && res.data.result)
                {
                    let columns = [...board.columns]
                    let curCol = {...columns[indexCol]}
                    columns.splice(indexCol, 1, {
                        ...columns[indexCol],
                        cards: columns[indexCol].cards.filter(item => item._id !== card._id ),
                        cardOrder: columns[indexCol].cardOrder.filter(item => item !== card._id )
                    })
    
                    setColumns([...columns])
                    showNotification('Xóa thẻ thành công', 'Xóa thẻ thành công', type.succsess, 3000)
                }
                else
                {
                    console.log(res.data.msg)
                    showNotification('Xóa thẻ thất bại', res.data.msg, type.danger, 3000)
                }
            } catch (error) {
                console.log(error)
                showNotification('Xóa thẻ thất bại', error.message, type.danger, 3000)
            }
        }
        await setIsActive(false)
        setShowConfirmModal(false)
    }
    useEffect(() => {
        
    }, [])

    return(
        <Modal 
            className={card.image === '' ? "modal-card-detail" : "modal-card-detail active-wallpaper"}
            show={isActive} 
            onHide={() => onHideModal()}
            size="sm"
            backdrop="static"
            keyboard="false"
            >
            <CloseButton onClick={() => onHideModal()} />
            <Modal.Header>
                <div className="card-wallpaper">
                    <img src={card.image}></img>
                </div>
                <DropDownWPaperCard card={card} setTempCard={setTempCard}/>
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
                                        {
                                            mapOrderAndReplaceNotExist(listTag, card.tagOrder, "_id").map(item => (
                                                <li key={`tagItem-${item._id}`} style={{backgroundColor: item.color}}
                                                className="tag-item">{item.name}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            }
                            {
                                converDateFormat(card.deadline) !== "12-31-2030" &&
                                <div className="deadline-container">
                                    <span>Ngày hết hạn</span>
                                    <div className="deadline-check">
                                    <div key={card.status === 'done' ? true : false}>
                                        <Form>
                                            <Form.Check type="checkbox" id="checkboxDeadline">
                                                <Form.Check.Input type="checkbox" 
                                                onChange={(e) => onUpdateStatus(e)}
                                                defaultChecked={card.status === 'done' ? true : false}
                                                />
                                            </Form.Check>
                                        </Form>
                                    </div>
                                        <span className="deadline-span">{converDateFormat(card.deadline)}
                                        {
                                            card._isExpired && card.status === 'undone' &&
                                            <span className="expired">Quá hạn</span>
                                        }
                                        {
                                            card.status === 'done' &&
                                            <span className="done">Hoàn thành</span>
                                        } 
                                        </span>
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
                        {
                            card.attachment.length !== 0 &&
                            <div className="attachments-container">
                                <i className="fa fa-paperclip icon" aria-hidden="true"></i>
                                <span>Các tập tin đính kèm</span>
                                <ul className="attachment-list">
                                    {
                                        card.attachment.map((item, index) => (
                                            <OverlayTrigger
                                                placement="right"
                                                overlay={
                                                    <Tooltip id={`tooltip-right`}>
                                                        {item}
                                                    </Tooltip>
                                                }
                                                >
                                                    <li 
                                                    className="attachment-item">
                                                        <img 
                                                        onClick={() => {
                                                            setCurImagePreview(item)
                                                            setIsPreviewImage(true)
                                                        }}
                                                        src={item}></img>
                                                        <button className="btn" onClick={() => onDeleteAttachment(index)}>
                                                            <i className="fa fa-close icon"></i>
                                                        </button>
                                                    </li>
                                            </OverlayTrigger>
                                        ))
                                    }
                                    
                                    <li className="attachment-item-add" style={{display: 'none'}}>
                                        <button className="btn">
                                            Thêm tệp đính kèm
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        }
                        <SectionBigTask card={card} setTempCard={setTempCard}/>
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
                                <DropDownTag card={card} setTempCard={setTempCard}/>
                            </li>
                            <li>
                                <DropDownBigTask card={card} isShow={isShowTagDropDown} setIsShow={setIsShowTagDropDown} setTempCard={setTempCard}/>
                            </li>
                            <li>
                                <DropDownDeadline card={card} deadlineFormatted={converDateFormat(card.deadline)} setTempCard={setTempCard}/>
                            </li>
                            <li>
                                <DropDownAttachment card={card} setTempCard={setTempCard}/>
                            </li>
                            {
                                card.image === '' &&
                                <li><DropDownWPaperCard card={card} setTempCard={setTempCard}/></li>
                            }
                            <li>
                                <Button 
                                onClick={()=> setShowConfirmModal(true)}
                                    variant="danger" 
                                    type="submit"
                                >Xóa thẻ này</Button>
                            </li>
                            <ConfirmModal
                            show={showConfirmModal}
                            onAction={onDeleteCard}
                            title="Xóa thẻ"
                            //using html-react-paser to parse string to html code
                            content={`Bạn có chắc muốn xóa thẻ này. Hành động của bạn sẽ không thể hoàn tác!!!!`}
                            />
                        </ul>
                    </div>
                </div>
            </Modal.Body>
            {
                curImagePreview !== '' &&
                <PreviewImage show={isPreviewImage} setShow={setIsPreviewImage} image={curImagePreview} />
            }
        </Modal>
    )
}

export default ModalCard