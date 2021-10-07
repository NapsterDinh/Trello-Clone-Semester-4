import React from 'react'

import './card.scss'

function Card(props)
{
    const { card } = props

    return(
        <li className="card-item">
            {card.cover && <img className="card-cover" src={card.cover} alt="trello-clone"></img>}
            {card.title}
        </li>
    )
}

export default Card

