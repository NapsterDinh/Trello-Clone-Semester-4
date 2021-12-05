import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Button, DropdownButton, Form, FormControl } from 'react-bootstrap'

import './DropDownBigTask.scss'

function DropDownBigTask(props)
{
    const { card } = props

    const [ title, setTitle ] = useState('Việc cần làm')

    const onClickAddNewBigTask = () => 
    {
        // try {
        //     const res = await addNewTag({
        //             columnId:card.columnId,
        //             title:title,
        //             boardId:"61a5ce10c7674ec14e6a8889"
        //         })
        //     if(res && res.data.result)
        //     {
        //         showNotification('Thêm nhãn thành công', '', type.succsess, 3000)
        //     }
        //     else
        //     {
        //         showNotification('Thêm nhãn thất bại', res.data.msg, type.danger, 3000)
        //     }
        //     //thieu upload vao store
        //     setIsShow(false)
        //     setIsChooseTag(true)
        // } catch (error) {
        //     console.log(error.message)
        // }
    }
    return (
        <DropdownButton title="Việc cần làm" className="card-big-task-dropdown btn">
            <Dropdown.Header>Thêm danh sách công việc</Dropdown.Header>
            <Dropdown.Divider/>
            <div className="big-task-added-body">
                <span>Tiêu đề</span>
                <FormControl 
                type="text"
                placeholder="Việc cần làm"
                onFocus={(e) => e.target.select()}
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={title}
                />
            </div>
            <div style={{display: "flex", justifyContent: "end", marginRight: "20px"}}>
                <Button 
                className="btn-confirm"
                variant="primary">Thêm</Button>
            </div>
            
        </DropdownButton>
    )
}

export default DropDownBigTask