import React, { useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { updateImage } from 'app/core/apis/card';
import { showNotification, type } from 'utilities/component/notification/Notification';

import './DropDownWPaperCard.scss'
import { useSelector } from 'react-redux';

function DropDownWPaperCard(props)
{
    const { card, setTempCard } = props
    const [ wallPaper, setWallPaper ] = useState(null)

    const uploadWallPaper = async (isSave) => {
        if(isSave)
        {
            if(!wallPaper)
            {
                showNotification('Cập nhật ảnh bìa thất bại', 'Bạn phải chọn 1 tệp rồi mới upload', type.danger, 3000)
                return
            }
            try {
                const formData = new FormData()
                formData.append("File", wallPaper);
                formData.append('_id', card._id)
                formData.append('isDelete', false)
                const res = await updateImage(formData)
                if(res && res.data.result)
                {
                    setTempCard({
                        ...card,
                        image: res.data.data.image
                    })
                    showNotification('Cập nhật ảnh bìa thành công', 'Cập nhật ảnh bìa thành công', type.succsess, 3000)
                }
                else
                {   
                    showNotification('Cập nhật ảnh bìa thất bại', 'Cập nhật ảnh bìa thất bại', type.danger, 3000)
                    console.log(res.data.msg)
                }
            } catch (error) {
                showNotification('Cập nhật ảnh bìa thất bại', error.message, type.danger, 3000)
                console.log(error)
            }
        }
        else
        {
            const temp = {...card}
            try {
                setTempCard({
                    ...card,
                    image: ''
                })
                const res = await updateImage({
                    _id: card._id,
                    isDelete: true
                })
                if(!res || !res.data.result)
                {
                    setTempCard(temp)
                    showNotification('Gỡ ảnh bìa thất bại', 'Gỡ tệp ảnh bìa thất bại', type.danger, 3000)
                    console.log(res.data.msg)
                }
            } catch (error) {
                setTempCard(temp)
                showNotification('Gỡ ảnh bìa thất bại', error.message, type.danger, 3000)
                console.log(error)
            }
        }
    }
    return (
        <DropdownButton title="Ảnh bìa" className="card-wallpaper-dropdown btn">
            <Dropdown.Header>Ảnh bìa</Dropdown.Header>
            <Dropdown.Divider/>
            <div className="input-wallpaper-container">
                <input
                    className="custom-file-input"
                    type="file"
                    onChange={e => setWallPaper(e.target.files[0])}
                />
                <button className="btn add" onClick={() => uploadWallPaper(true)}>Thêm</button>
                <button className="btn cancel" onClick={() => uploadWallPaper(false)}>Gỡ</button>
            </div>
        </DropdownButton>
    )
}

export default DropDownWPaperCard