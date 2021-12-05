import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { cardHandleReducer } from "store/cardReducer";

import ModalCard from '../Modal/ModalCard/ModalCard'

import './card.scss'

function Card(props)
{
  const { card, col, indexCard, indexCol } = props

  const [ isActive, setIsActive ] = useState(false)
  const [ tempCard, setTempCard] = useState(card)

  const dispatch = useDispatch()

  const handleOnClick = async() => 
  {
    setTempCard({
      ...tempCard,
      indexCard: indexCard,
      indexCol: indexCol
    })
    setIsActive(true)
  }

  return (
    <>
      <div className="card-item" onClick={()=> handleOnClick()}>
        {
          tempCard.cover && <img className="card-cover" src={tempCard.cover} alt="trello-clone" draggable="false"></img>
        }
        {tempCard.title}
      </div>
      {
        isActive && <ModalCard isActive={isActive} 
        setIsActive={setIsActive} 
        setTempCard={setTempCard}
        card={tempCard} 
        col={col}/>
      }
    </>
    
)
}

export default Card

