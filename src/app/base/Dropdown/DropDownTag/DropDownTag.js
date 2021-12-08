import React, {useEffect, useState, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addNewTag, updateTagName, updateTagColor, deleteTag, updateTagOrder} from 'app/core/apis/tag'
import { Dropdown, Button, DropdownButton, Form, FormControl } from 'react-bootstrap'
import { showNotification, type } from 'utilities/component/notification/Notification';
import { boardHandleActionReducer } from "store/boardReducer";
import { cloneDeep } from 'lodash'
import './DropDownTag.scss'

function DropDownTag(props)
{
    const { card, isShow, setIsShow, setTempCard } = props
    const listTag = useSelector(state => state.board.listTag)

    const [ isChooseTag, setIsChooseTag ] = useState(true)
    const [ title, setTitle ] = useState('')
    const [ color, setColor ] = useState('#563d7c')
    const [ currentId, setCurrentId ] = useState(-1)
    const dispatch = useDispatch()

    const onHanldeClick = () => {
        if(isChooseTag)
        {
            //change dropdown
            setIsChooseTag(false)
        }
        else{
            setCurrentId(-1)
            setTitle('')
            setColor('#563d7c')
            setIsChooseTag(true)
        }
    }

    const onAddNewTag = async () => 
    {
        try {
            const res = await addNewTag({
                name: title,
                color: color,
                cardId: card._id,
                boardId: card.boardId
            })
            setCurrentId(-1)
            setTitle('')
            setColor('#563d7c')
            if(res && res.data.result)
            {
                const temp = [...listTag]
                temp.push({...res.data.data})
                
                dispatch(boardHandleActionReducer({
                    listTag: temp,
                    type: 'UPDATE_TAGLIST'
                }))
                showNotification('Thêm nhãn thành công', 'dahsdgashgda', type.succsess, 3000)
            }
            else
            {
                showNotification('Thêm nhãn thất bại', res.data.msg, type.danger, 3000)
            }
            setIsChooseTag(true)
            setIsShow(false)
            
        } catch (error) {
            console.log(error)
        }
    }

    const onEditTag = async () => 
    {
        try {
            const res = await updateTagName({
                _id: listTag[currentId]._id,
                name: title,
            })
            const res1 = await updateTagColor({
                _id: listTag[currentId]._id,
                color: color,
            })
            const temp = [...listTag]
            temp[currentId] = {
                ...temp[currentId],
                name: title,
                color: color
            }
            setCurrentId(-1)
            setTitle('')
            setColor('#563d7c')
            if(res1 && res1.data.result)
            {
                dispatch(boardHandleActionReducer({
                    listTag: temp,
                    type: 'UPDATE_TAGLIST'
                }))
                showNotification('Sửa nhãn thành công', 'dahsdgashgda', type.succsess, 3000)
            }
            else
            {
                showNotification('Sửa nhãn thất bại', res.data.msg, type.danger, 3000)
            }
            setIsChooseTag(true)
            setIsShow(false)
            
        } catch (error) {
            console.log(error)
        }
    }

    const onDeleteTag = async () => 
    {
        try {
            
            const res = await deleteTag(listTag[currentId]._id)
            setCurrentId(-1)
            setTitle('')
            setColor('#563d7c')
            if(res && res.data.result)
            {
                const temp = [...listTag]
                temp.splice(currentId, 1)
                dispatch(boardHandleActionReducer({
                    listTag: temp,
                    type: 'UPDATE_TAGLIST'
                }))
                showNotification('Xóa nhãn thành công', 'dahsdgashgda', type.succsess, 3000)
            }
            else
            {
                showNotification('Xóa nhãn thất bại', res.data.msg, type.danger, 3000)
            }   
            setIsChooseTag(true)
        } catch (error) {
            console.log(error)
        }
    }
    const loadTagItem = async (_id,item) => {
        await setCurrentId(_id)
        setColor(item.color)
        setTitle(item.name)
        setIsChooseTag(false)
    }

    const onUpdateTagOrder = async (itemTag) => 
    {
        try {
        const index = card.tagOrder.findIndex(item => item === itemTag._id)
        let tempOrder = [...card.tagOrder]

        if(index === -1)
        {
            //add
            tempOrder.push(itemTag._id)
        }
        else
        {
            //remove
            tempOrder = tempOrder.filter(item => item !== itemTag._id)
        }
        setTempCard({...card, tagOrder: tempOrder})

  
        const res = await updateTagOrder({...card, tagOrder: tempOrder})
        if(res && res.data.result)
        {
            
        }
        else
        {
            setTempCard({...card})
            showNotification('Thêm nhãn cho thẻ thất bại', res.data.msg, type.danger, 3000)
        }   
        } catch (error) {
            setTempCard({...card})
            console.log(error)
        }
    }

    return (
        <DropdownButton 
            // onClick={(e) => {
            //     e.preventDefault()
            //     setIsShow(true)
            // }}
            title="Nhãn" className="card-tag-dropdown btn">
            {
                isChooseTag && 
                <>
                    <Dropdown.Header>Nhãn</Dropdown.Header>
                    <Dropdown.Divider/>
                    <div className="tag-choose-body">
                        <ul>
                            {
                                
                                listTag.length !== 0 &&
                                listTag.map((item, index) => 
                               {
                                    return(
                                        <li key={item._id} className={card.tagOrder.findIndex(item1 => item1 === item._id) !== -1 ? "tag selected" : "tag"}>
                                            <span 
                                            onClick={() => {onUpdateTagOrder(item)}}
                                            style={{backgroundColor: item.color}}
                                            className="card-label">{item.name}</span>
                                            <i className="fa fa-check" aria-hidden="true"></i>
                                            <i 
                                            className="fa fa-pencil" aria-hidden="true" onClick={() => loadTagItem(index, item)}></i>
                                        </li>
                                    )
                               })
                            }
                        </ul>
                    </div>
                    <div style={{display: "flex", justifyContent: "end", marginRight: "20px"}}>
                        <Button 
                        onClick={() => onHanldeClick()}
                        className="btn-confirm"
                        variant="primary">Thêm</Button>
                    </div>
                </>
            }
            {
                !isChooseTag && 
                <>
                    <Dropdown.Header>
                        <i className="fa fa-chevron-left" aria-hidden="true" onClick={() => onHanldeClick()}></i>
                        Tạo nhãn mới
                    </Dropdown.Header>
                    <Dropdown.Divider/>
                    <div className="tag-added-body">
                        <span>Tên</span>
                        <FormControl 
                        type="text"
                        defaultValue={currentId === -1 ? '' : listTag[currentId].name}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                        <div style={{display: 'flex'}}>
                            <span>Chọn một màu</span>
                            <Form>
                            <Form.Control
                                type="color"
                                id="exampleColorInput"
                                defaultValue={currentId === -1 ? "#563d7c" : listTag[currentId].color}
                                title="Choose your color"
                                onChange={(e) => setColor(e.target.value) }
                            />
                            </Form>
                        </div>
                    </div>
                    <div style={{display: "flex", justifyContent: "end", marginRight: "20px"}}>
                        {
                            currentId === -1 &&
                            <Button 
                            className="btn-add"
                            variant="primary" onClick={() => onAddNewTag()}>Thêm</Button>
                        }
                        {
                            currentId !== -1 &&
                            <Button 
                            className="btn-add"
                            variant="primary" onClick={() => onEditTag()}>Sửa</Button>
                        }
                        <Button 
                        className="btn-delete"
                        variant="primary" onClick={() => onDeleteTag()}>Xóa</Button>
                    </div>
                </>
            }
           
        </DropdownButton>
    )
}

export default DropDownTag