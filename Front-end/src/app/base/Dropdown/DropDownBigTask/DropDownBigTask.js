import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Button, DropdownButton, Form, FormControl } from 'react-bootstrap'
import { addNewBigTask } from 'app/core/apis/bigTask'
import { boardHandleActionReducer } from 'store/boardReducer'
import { showNotification, type } from 'utilities/component/notification/Notification'

import './DropDownBigTask.scss'

function DropDownBigTask(props)
{
    const { card, setTempCard } = props

    const [ title, setTitle ] = useState('Việc cần làm')

    const board = useSelector(state => state.board.board)

    const dispatch = useDispatch()

    const onClickAddNewBigTask = async () => 
    {
        try {
            const res = await addNewBigTask({
                    cardId: card._id,
                    title:title,
                })
            console.log(res)
            if(res && res.data.result)
            {
                const listBigTaskTemp = [...card.listBigTask]
                const bigTaskOrder = [...card.bigTaskOrder]
                listBigTaskTemp.push({...res.data.data, smallTask: []})
                bigTaskOrder.push(res.data.data._id)
                const temp = {
                    ...card,
                    listBigTask: listBigTaskTemp,
                    bigTaskOrder: bigTaskOrder
                }

                setTempCard(temp)
                showNotification('Thêm việc cần làm thành công', 'Thêm việc cần làm thành công', type.succsess, 3000)
            }
            else
            {
                showNotification('Thêm việc cần làm thất bại', res.data.msg, type.danger, 3000)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <DropdownButton 
        title="Việc cần làm" className="card-big-task-dropdown btn">
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
                onClick={() => onClickAddNewBigTask()}
                className="btn-confirm"
                variant="primary">Thêm</Button>
            </div>
            
        </DropdownButton>
    )
}

export default DropDownBigTask