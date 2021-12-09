import React, { useState } from 'react'
import { Dropdown, DropdownButton, Button, FormControl } from 'react-bootstrap'

import { updateAttachment } from 'app/core/apis/card';

import { showNotification, type } from 'utilities/component/notification/Notification';
import './DropDownAttachment.scss'
import { useSelector } from 'react-redux';

function DropDownAttachment(props)
{
    const { card, setTempCard } = props
    const [ attachments, setAttachments] = useState(null)
    const [ link, setLink ] = useState('')

    const uploadAttachment = async (isFile) => {
        if(isFile)
        {
            if(!attachments)
            {
                showNotification('Cập nhật tệp đính kèm thất bại', 'Bạn phải chọn 1 tệp rồi mới upload', type.danger, 3000)
                return
            }
            try {
                const formData = new FormData()
                formData.append("File", attachments);
                formData.append('_id', card._id)
                const res = await updateAttachment(formData)
                if(res && res.data.result)
                {
                    const temp = [...card.attachment]
                    temp.push(res.data.data.url)
                    setTempCard({
                        ...card,
                        attachment: temp
                    })
                    showNotification('Cập nhật tệp đính kèm thành công', 'Cập nhật tệp đính kèm thành công', type.succsess, 3000)
                }
                else
                {   
                    showNotification('Cập nhật tệp đính kèm thất bại', 'Cập nhật tệp đính kèm thất bại', type.danger, 3000)
                    console.log(res.data.msg)
                }
            } catch (error) {
                showNotification('Cập nhật tệp đính kèm thất bại', error.message, type.danger, 3000)
                console.log(error)
            }
        }
        else
        {
            if(link === '')
            {
                showNotification('Cập nhật tệp đính kèm thất bại', 'Bạn phải điền link hình ảnh vào trước', type.danger, 3000)
                return
            }
            try {
                const res = await updateAttachment({
                    _id:  card._id,
                    link: link
                })
                if(res && res.data.result)
                {
                    const temp = [...card.attachment]
                    temp.push(link)
                    setTempCard({
                        ...card,
                        attachment: temp
                    })
                    showNotification('Cập nhật tệp đính kèm thành công', 'Cập nhật tệp đính kèm thành công', type.succsess, 3000)
                }
                else
                {   
                    showNotification('Cập nhật tệp đính kèm thất bại', 'Cập nhật tệp đính kèm thất bại', type.danger, 3000)
                    console.log(res.data.msg)
                }
            } catch (error) {
                showNotification('Cập nhật tệp đính kèm thất bại', error.message, type.danger, 3000)
                console.log(error)
            }
        }
        setLink('')
    }

    
    return (
        <DropdownButton title="Đính kèm" className="card-attachments-dropdown btn">
            <Dropdown.Header>Đính kèm</Dropdown.Header>
            <Dropdown.Divider/>
            <div className="input-attachments-container">
                <input
                    className="custom-file-input"
                    type="file"
                    onChange={e => setAttachments(e.target.files[0])}
                />
                <button className="btn" onClick={() => uploadAttachment(true)}>Thêm</button>
            </div>
            <Dropdown.Divider/>
            <div className="attachment-link-added-body">
                <span>Đinh kèm liên kết vào đây</span>
                <FormControl 
                type="text"
                value={link}
                onFocus={(e) => e.target.select()}
                onChange={(e) => setLink(e.target.value)}
                />
            </div>
            <div className="button-confirm-container" style={{display: "flex", justifyContent: "start", marginRight: "20px"}}>
                <Button 
                onClick={() => uploadAttachment(false)}
                className="btn-confirm"
                variant="primary">Thêm</Button>
            </div>
        </DropdownButton>
    )
}

export default DropDownAttachment