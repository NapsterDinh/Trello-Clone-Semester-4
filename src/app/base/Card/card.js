import React, { useState, useEffect, useRef} from 'react'
import { Form } from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { cardHandleReducer } from "store/cardReducer";
import { getCardById } from 'app/core/apis/card';
import { isEmpty } from 'lodash-es';
import { boardHandleActionReducer } from 'store/boardReducer';
import { converDateFormat } from 'utilities/convertDate'
import { updateDescription, updateCard, updateStatus } from "app/core/apis/card";

import ModalCard from '../Modal/ModalCard/ModalCard'
import { mapOrderAndReplaceNotExist } from 'utilities/sort'

import './card.scss'

function Card(props)
{
  const { card, col, indexCard, indexCol,setColumns } = props
  const [ isActive, setIsActive ] = useState(false)
  const deadlineCheckbox = useRef(null)

  const listTag = useSelector(state => state.board.listTag)

  const dispatch = useDispatch()

  const setTempCard = (data) => {
    dispatch(boardHandleActionReducer({
        card: {...data},
        type: "UPDATE_CARD"
      }))
  }

  const handleOnClick = async() => 
  {
    try {
      const res = await getCardById(card._id)
      if(res && res.data.result)
      {
        setTempCard({
          ...res.data.data.newCard,
          lengthTask: res.data.data.lengthTask,
          taskDone: res.data.data.taskDone,
          indexCard: indexCard,
          indexCol: indexCol
        })
        setIsActive(true)
      }
      else
      {
        console.log(res.data.msg)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const onUpdateStatus = async(e) => {
    const temp = card.status
    let status = 'done'
    if(!e.target.checked)
    {
        status = 'undone'
        deadlineCheckbox.current.checked = false
    }
    else
    {
      deadlineCheckbox.current.checked = true
    }

    setTempCard({
        ...card,
        status: status
    })
    try {
        const res = await updateStatus({
            _id: card._id,
            status: status
        })
        if(!res || !res.data.result)
        {
            setTempCard({
              ...card,
              status: status
          })
            console.log(res.data.msg)
        }
    } catch (error) {
        console.log(error)
    }
    
}

  return (
    <>
      <div className="card-item" onClick={()=> handleOnClick()}>
      < i class="fa fa-pencil" aria-hidden="true" onClick={()=> handleOnClick()}></i>
        {
          card.image !== '' && <img className="card-cover" src={card.image} alt="trello-clone" draggable="false"></img>
        }
        {
          card.tagOrder.length !== 0 &&
          <div className="tag-label-container">
            {
              mapOrderAndReplaceNotExist(listTag, card.tagOrder, "_id").map(item => (
                  <span 
                  style={{backgroundColor: item.color}}
                  key={`tagLabel-${item._id}`} 
                  className="tag-label-item"></span>
                ))
            }
          </div>
        }
        {card.title}
        <div className="option-container">
          {
            card.percentage !== "" && card.percentage != "0/0" && converDateFormat(card.deadline) === "12-31-2030" &&
            <div className={card.status === 'done' ? "preview-task-process done" : "preview-task-process"}>
                <i class="fa fa-check-square-o" aria-hidden="true"></i>
                {card.percentage}
            </div>
          }
          {
            converDateFormat(card.deadline) !== "12-31-2030" &&
            <div className="preview-deadline">
              <Form className={card.status === 'done' ? 'done' : (card._isExpired) ? 'expired' : ''}>
                  <Form.Check type="checkbox" id="checkboxDeadline">
                      {/* <Form.Check.Input type="checkbox" 
                      checked={card.status === 'done' ? true : false}
                      ref={deadlineCheckbox}
                      defaultChecked={card.status === 'done' ? true : false}
                      /> */}
                      <Form.Check.Label>{converDateFormat(card.deadline)}</Form.Check.Label>
                  </Form.Check>
              </Form>
            </div>
          }
          {
            card.description !== '' && 
            <div className="preview-desscription">
              <i class="fa fa-paragraph" aria-hidden="true"></i>
            </div>
          }
          {
            card.attachment.length !== 0 && 
            <div className="preview-attachments">
              <i class="fa fa-paperclip" aria-hidden="true"></i>
              {card.attachment.length}
            </div>
          }
        </div>
      </div>
      {
        isActive && <ModalCard isActive={isActive} 
        setIsActive={setIsActive} 
        setTempCard={setTempCard}
        card={card} 
        col={col}
        indexCol={indexCol}
        setColumns={setColumns}
        onUpdateStatus={onUpdateStatus}
        />
      }
    </>
)
}

export default Card

