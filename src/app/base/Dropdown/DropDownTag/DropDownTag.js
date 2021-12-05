import React, {useEffect, useState, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addNewTag, updateTagName, updateTagColor, deleteTag} from 'app/core/apis/tag'
import { Dropdown, Button, DropdownButton, Form, FormControl } from 'react-bootstrap'
import { showNotification, type } from 'utilities/component/notification/Notification';
import './DropDownTag.scss'

function DropDownTag(props)
{
    const { card, isShow, setIsShow } = props
    const [ isChooseTag, setIsChooseTag ] = useState(true)
    const [ title, setTitle ] = useState('')
    const [ color, setColor ] = useState('#563d7c')

    const onHanldeClick = () => {
        if(isChooseTag)
        {
            //change dropdown
            setIsChooseTag(false)
        }
        else{
            setIsChooseTag(true)
        }
    }

    const onAddNewTag = async () => 
    {
        try {
            const res = await addNewTag({
                name: title,
                color: color,
                cardId: card._id
            })
            if(res && res.data.result)
            {
                showNotification('Thêm nhãn thành công', '', type.succsess, 3000)
            }
            else
            {
                showNotification('Thêm nhãn thất bại', res.data.msg, type.danger, 3000)
            }
            //thieu upload vao store
            setIsShow(false)
            setIsChooseTag(true)
        } catch (error) {
            console.log(error.message)
        }
    }

    const onDeleteTag = async () => 
    {
        
    }

    const onUpdateTagColor = async () => 
    {
        
    }

    const onUpdateTagName = async () => 
    {
        
    }

    return (
        <DropdownButton 
            show={isShow} title="Nhãn" className="card-tag-dropdown btn">
            {
                isChooseTag && 
                <>
                    <Dropdown.Header>Nhãn</Dropdown.Header>
                    <Dropdown.Divider/>
                    <div className="tag-choose-body">
                        <ul>
                            <li>
                                <span className="card-label">Goal</span>
                                <a>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li>
                                <span className="card-label">Goal</span>
                                <a>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li>
                                <span className="card-label">Goal</span>
                                <a>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li>
                                <span className="card-label">Goal</span>
                                <a>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li>
                                <span className="card-label">Goal</span>
                                <a>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li>
                                <span className="card-label">Goal</span>
                                <a>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </a>
                            </li>
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
                        onChange={(e) => setTitle(e.target.value)}
                        />
                        <div style={{display: 'flex'}}>
                            <span>Chọn một màu</span>
                            <Form>
                            <Form.Control
                                type="color"
                                id="exampleColorInput"
                                defaultValue="#563d7c"
                                title="Choose your color"
                                onChange={(e) => setColor(e.target.value) }
                            />
                            </Form>
                        </div>
                    </div>
                    <div style={{display: "flex", justifyContent: "end", marginRight: "20px"}}>
                        <Button 
                        className="btn-add"
                        variant="primary" onClick={() => onAddNewTag()}>Thêm</Button>
                    </div>
                </>
            }
           
        </DropdownButton>
    )
}

export default DropDownTag