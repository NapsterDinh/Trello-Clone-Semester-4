import React from 'react'

import './column.scss'

import Card from '../Card/card'

import { mapOrder } from '../../../src/utilities/sort'

function Column(prop)
{
  const { column } = prop
  const cards = mapOrder(column.cards, column.cardOrder, 'id')

    return(
        <div className="board-columns">
          <div className="column">
            <header>{column.title}</header>
            <ul className ="card-list">
              
              {
                cards.map((card,index) => <Card key={index} card={card} />)
              }
            </ul>
            <footer>Add another card</footer>
          </div>
        </div>
    )
}

export default Column