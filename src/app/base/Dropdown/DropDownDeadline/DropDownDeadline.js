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
    const { card, deadlineFormatted } = props
    const [ valueDeadline, setValueDeadline ] = useState(deadlineFormatted !=='' ? new Date(deadlineFormatted) : new Date());

    const onHanldeClickSave = async () => {
        try {
            const res = await updateDate({
                dateTime: valueDeadline.toISOString().split('T')[0],
                _id: card._id
            })
            if(res && res.data.result)
            {
                showNotification('Lưu ngày hết hạn thành công', '', type.succsess, 3000)
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

    const onHanldeClickCancel = () => {
        //cancel
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
                            minDate={new Date()}
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