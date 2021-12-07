import React, {useEffect, useState, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, ProgressBar, Form } from "react-bootstrap";
import { deleteBigTask, updateTitle } from 'app/core/apis/bigTask'
import { updateDoneSmallTask, addNewSmallTask, updateTitleSmallTask, deleteSmallTask } from "app/core/apis/smallTask";
import { showNotification, type } from "utilities/component/notification/Notification";
import './SectionBigTask.scss'

const SectionBigTask = (props) => {
    const {  card, col, setTempCard} = props

    const [ smallTaskTitle, setSmallTaskTitle ] = useState('')
    const smallRefAdd = useRef([])
    const dispatch = useDispatch()

    const openAddSmallTaskInput = (isTrue, index) => 
    {
        if(isTrue)
        {
            smallRefAdd.current.map(item => item.classList.remove('added'))
            smallRefAdd.current[index].classList.add('added')
        }
        else
        {
            setSmallTaskTitle('')
            smallRefAdd.current[index].classList.remove('added')
        }
    }

    const onCreateNewSmallTask = async(itemSmallBigTask, index) => {
        try {
            const res = await addNewSmallTask({
                title: smallTaskTitle,
                bigTaskId: itemSmallBigTask._id,
                cardId: card._id
            })
            if(res && res.data.result)
            {
                const bigTask = [...card.listBigTask]
                const listSmallTaskTemp = [...bigTask[index].smallTask]
                const smallTaskOrder = [...bigTask[index].smallStaskOrder]
                listSmallTaskTemp.push({...res.data.data})
                smallTaskOrder.push(res.data.data._id)
                bigTask.splice(index, 1, {
                    ...bigTask[index],
                    smallTask: listSmallTaskTemp,
                    smallStaskOrder: smallTaskOrder,
                    percentage: res.data.data.percentageBigTask
                })
                setTempCard({
                    ...card,
                    listBigTask: bigTask,
                    percentage: {...res.data.data}.percentageCard
                })
                showNotification('Thêm công việc thành công', 'Thêm công việc thành công', type.succsess, 3000)
            }
            else
            {   
                console.log(res.data.msg)
                showNotification('Thêm công việc thất bại', res.data.msg, type.danger, 3000)
            }
        } catch (error) {
            showNotification('Thêm công việc thất bại', error.message, type.danger, 3000)
            console.log(error)
        }
        openAddSmallTaskInput(false, index)
    }

    const onDeleteBigTask = async(itemFilter) => {
        let temp = {
            ...card,
            listBigTask: card.listBigTask.filter(item => item._id !== itemFilter._id),
            bigTaskOrder: card.bigTaskOrder.filter(item => item !== itemFilter._id)
        }
        const percentArr = card.percentage.split('/')
        let numerator = (parseInt(percentArr[0]))
        let denominator = (parseInt(percentArr[1]))

        numerator -= itemFilter.smallTask.filter(item => item.isDone).length
        denominator -= itemFilter.smallStaskOrder.length

        setTempCard({
            ...temp,
            percentage: numerator + '/' + denominator
        })

        try {
            const res = await deleteBigTask(itemFilter._id)
            if(!res || !res.data.result)
            {
                setTempCard(card)
                console.log(res.data.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onDeleteSmallTask = async(index, itemFilter) => {
        try {
            const bigTaskTemp = {...card.listBigTask[index]}
            const listBigTask = [...card.listBigTask]
            let bigTaskTemp1 = {
                ...card.listBigTask[index],
                smallTask: bigTaskTemp.smallTask.filter(item => item._id !== itemFilter._id),
                smallStaskOrder: bigTaskTemp.smallStaskOrder.filter(item => item !== itemFilter._id), 
            }
            let lengthDone = bigTaskTemp1.smallTask.filter(item => item.isDone).length
            bigTaskTemp1 ={
                ...bigTaskTemp1,
                percentage: Math.round( lengthDone/ bigTaskTemp1.smallTask.length)*100
            }
            listBigTask.splice(index, 1,bigTaskTemp1)
            const percentArr = card.percentage.split('/')
            let numerator = (parseInt(percentArr[0]))
            let denominator = (parseInt(percentArr[1]))
            if(itemFilter.isDone)
            {
                numerator -=1
            }
            denominator -= 1
            setTempCard({
                ...card,
                listBigTask: listBigTask,
                percentage: numerator + '/' + denominator
            })
            const res = await deleteSmallTask({
                _id: itemFilter._id,
                cardId: card._id
            })
            if(!res || !res.data.result)
            {
                setTempCard(card)
                console.log(res.data.msg)
                showNotification('Xóa công việc thất bại', res.data.msg, type.danger, 3000)
            }
        } catch (error) {
            setTempCard(card)
            console.log(error)
            showNotification('Xóa công việc thất bại', error.message, type.danger, 3000)
        }
    }

    const onBlurUpdateTitleBigTask = async (e, itemBigTask) => {
        const listBigTaskTemp = [...card.listBigTask]
        const index = listBigTaskTemp.findIndex(item => item._id === itemBigTask._id)
        listBigTaskTemp.splice(index, 1, {...listBigTaskTemp[index], title: e.target.value})
        const temp = {
            ...card,
            listBigTask: listBigTaskTemp
        }
        setTempCard(temp)
        try {
            const res = await updateTitle({
                _id: itemBigTask._id,
                title: e.target.value
            })
            if(!res || !res.data.result)
            {
                setTempCard(card)
                console.log(res.data.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onBlurUpdateTitleSmallTask = async (e, indexBigTask ,itemSmallTask) => {
        const listBigTaskTemp = [...card.listBigTask]
        const index = listBigTaskTemp[indexBigTask].smallTask.findIndex(item => item._id === itemSmallTask._id)
        const curSmallTask = {...card.listBigTask[indexBigTask].smallTask[index]}
        const smallTaskTemp = [...card.listBigTask[indexBigTask].smallTask]
        smallTaskTemp.splice(index, 1, {...curSmallTask, title: e.target.value})
        listBigTaskTemp.splice(indexBigTask, 1, {
            ...card.listBigTask[indexBigTask],
            smallTask: smallTaskTemp
        })

        const temp = {
            ...card,
            listBigTask: listBigTaskTemp
        }

        setTempCard(temp)
        try {
            const res = await updateTitleSmallTask({
                _id: itemSmallTask._id,
                title: e.target.value
            })
            if(!res || !res.data.result)
            {
                setTempCard(card)
                console.log(res.data.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onCheckSmallTaskDone = async (e, indexBigTask, indexSmallTask, item) => {
        let isdone = true
        if(!e.target.checked)
        {
            isdone = false
        }
        const listBigTaskTemp = [...card.listBigTask]
        const curSmallTask = {...card.listBigTask[indexBigTask].smallTask[indexSmallTask]}
        const smallTaskTemp = [...card.listBigTask[indexBigTask].smallTask]

        smallTaskTemp.splice(indexSmallTask, 1, {...curSmallTask, isDone: isdone})

        const percentageBigTask = Math.round((smallTaskTemp.filter(item => item.isDone).length / smallTaskTemp.length)*100)

        const temperory = {
            ...card.listBigTask[indexBigTask],
            smallTask: smallTaskTemp,
            percentage: percentageBigTask.toString()
        }

        listBigTaskTemp.splice(indexBigTask, 1, temperory)

        const percentArr = card.percentage.split('/')

        const temp = {
            ...card,
            listBigTask: listBigTaskTemp,
            percentage: isdone ? ((parseInt(percentArr[0])+1)+"/"+percentArr[1]) : ((percentArr[0]-1)+"/"+percentArr[1])
        }
        setTempCard(temp)
        try {
            const res = await updateDoneSmallTask({
                _id: item._id,
                ischeck: isdone
            })
            if(!res || !res.data.result)
            {
                setTempCard(card)
                console.log(res.data.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <ul className="task-container">
            {
                card.listBigTask.length !== 0 &&
                card.listBigTask.map((item, index) => (
                    <li key={`bigTaskItem${item._id}`} className="big-task-item">
                        <i className="fa fa-check-square-o icon" aria-hidden="true"></i>
                        <div key={item.title}>
                            <input 
                                className="text"
                                onKeyDown={e => e.key === 'Enter' && e.target.blur()}
                                onBlur={e => onBlurUpdateTitleBigTask(e, item)}
                                type="text" 
                                defaultValue={item.title}></input>
                        </div>
                        
                        <button className="btn" onClick={() =>  onDeleteBigTask(item)}>
                            Xóa
                        </button>
                        {
                            item.percentage != '0' &&
                            <ProgressBar animated now={item.percentage} label={`${item.percentage}%`} />
                        }
                        <ul className="small-task-list">
                            {
                                item.smallTask.length !== 0 &&
                                item.smallTask.map((item1, index1) => (
                                    <li key={`smallTask-${item1._id}`} className="small-task-item">
                                        <Form>
                                            <Form.Check type="checkbox" id="checkboxSmallTask">
                                                <Form.Check.Input type="checkbox" 
                                                onChange={(e) => onCheckSmallTaskDone(e, index, index1, item1)}
                                                defaultChecked={item1.isDone ? true : false}
                                                />
                                            </Form.Check>
                                        </Form>
                                        <input
                                        className="text"
                                        type="text"
                                        onKeyDown={e => e.key === 'Enter' && e.target.blur()}
                                        onBlur={e => onBlurUpdateTitleSmallTask(e,index, item1)}
                                        defaultValue={item1.title}
                                        >
                                        </input>
                                        <i className="fa fa-close" onClick={() => onDeleteSmallTask(index, item1)}></i>
                                    </li>
                                ))
                                
                            }
                            <li 
                            ref={el => smallRefAdd.current[index] = el}
                            id={`item-${item._id}-add`} className="small-task-item add">
                                <input
                                    className="text"
                                    type="text"
                                    onChange={e => setSmallTaskTitle(e.target.value)}
                                    >
                                </input>
                                <div className="action-container">
                                    <Button variant="primary" onClick={() => onCreateNewSmallTask(item, index)}>Thêm</Button>
                                    <i className="fa fa-close" onClick={() => openAddSmallTaskInput(false, index)}></i>
                                </div>
                                <button style={{marginTop: '10px'}}
                                    className="btn" onClick={() => openAddSmallTaskInput(true, index)}>
                                        Thêm một mục
                                </button>              
                            </li>
                        </ul>
                    </li>
                ))
            }
            
        </ul>
    )
}

export default SectionBigTask