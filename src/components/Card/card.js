import React from 'react'

import './card.scss'

function Card(props)
{
  const { card } = props

  return (
    <div className="card-item">
      {
        card.cover && <img className="card-cover" src={card.cover} alt="trello-clone" draggable="false"></img>
      }
      {card.title}
    </div>
)
}

export default Card

