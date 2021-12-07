import React, {useEffect, useState, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Button, DropdownButton, Form, FormGroup } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import { updateDate } from 'app/core/apis/card'
import { showNotification, type }  from 'utilities/component/notification/Notification'

import "react-datepicker/dist/react-datepicker.css";

import './DropDownDeadline.scss'

function DropDownDeadline(props)
{
    const { card, deadlineFormatted, setTempCard } = props
    const [ valueDeadline, setValueDeadline ] = useState(deadlineFormatted !== '4-3-2028' ? new Date(deadlineFormatted) : new Date());

    const onHanldeClickSave = async () => {
        try {
            let date = new Date(valueDeadline)
            date.setDate(date.getDate() + 1)
            const temp = date.toISOString().split('T')[0]
            const res = await updateDate({
                dateTime: temp,
                _id: card._id
            })
            console.log(res)
            if(res && res.data.result)
            {
                console.log(temp)
                setTempCard({
                    ...card,
                    deadline: res.data.data.deadline
                })
                showNotification('Lưu ngày hết hạn thành công', 'Lưu ngày hết hạn thành công', type.succsess, 3000)
            }
            else
            {
                showNotification('Lưu ngày hết hạn thất bại', res.data.msg, type.danger, 3000)
            }
            //thieu upload vao store
        } catch (error) {
            console.log(error.message)
        }
    }

    const onHanldeClickCancel = async () => {
        //cancel
        try {
            const res = await updateDate({
                dateTime: new Date('4-4-2028').toISOString().split('T')[0],
                _id: card._id
            })
            if(res && res.data.result)
            {
                showNotification('Gỡ ngày hết hạn thành công', 'Gỡ ngày hết hạn thành công', type.succsess, 3000)
            }
            else
            {
                showNotification('Gỡ ngày hết hạn thất bại', res.data.msg, type.danger, 3000)
            }
            //thieu upload vao store
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <DropdownButton title="Ngày" className="card-deadline-dropdown btn">
            <Dropdown.Header>Ngày</Dropdown.Header>
                    <Dropdown.Divider/>
                    <div className="deadline-choose-body">
                        <span>Chọn ngày hết hạn</span>
                        <DatePicker 
                            selected={valueDeadline} 
                            onChange={(date) => setValueDeadline(date)} 
                            dateFormat="yyyy/MM/dd"
                            isClearable={true}
                            // minDate={new Date()}
                        />
                    </div>
                    <div style={{marginRight: "20px"}}>
                        <Button 
                        onClick={() => onHanldeClickSave()}
                        className="btn-confirm"
                        variant="primary">{deadlineFormatted === '4-3-2028' ? 'Thêm' : 'Lưu'}</Button>
                        <Button 
                        onClick={() => onHanldeClickCancel()}
                        className="btn-cancel"
                        variant="primary">Gỡ bỏ</Button>
                    </div>
        </DropdownButton>
    )
}

export default DropDownDeadline