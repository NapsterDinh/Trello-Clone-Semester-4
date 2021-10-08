import React from 'react'
import { Container, Draggable } from 'react-smooth-dnd'

import './column.scss'

import Card from '../Card/card'

import { mapOrder } from '../../../src/utilities/sort'

function Column(prop)
{
  const { column } = prop
  const cards = mapOrder(column.cards, column.cardOrder, 'id')

  const onCardDrop = (dropResult) => {
    console.log(dropResult)
  }

  return (
    <div className='board-columns'>
      <div className='column'>
        <header className='column-drag-handle'>{column.title}</header>
        <div className ='card-list'>
          <Container
            onDragStart={e => console.log('drag started', e)}
            onDragEnd={e => console.log('drag end', e)}
            onDragEnter={() => {
              console.log('drag enter:', column.id);
            }}
            onDragLeave={() => {
              console.log('drag leave:', column.id);
            }}
            onDropReady={p => console.log('Drop ready: ', p)}
            groupName='col'
            onDrop={onCardDrop}
            getChildPayload={index => cards[index]}
            dragClass='card-ghost'
            dropClass='card-ghost-drop'
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: 'card-drop-preview'
            }}
            dropPlaceholderAnimationDuration={200}
          >
            {cards.map((card, index) => (
              <Draggable key={index}>
                <Card card={card} />
              </Draggable>
            ))}
          </Container>
        </div>
        <footer>Add another card</footer>
      </div>
    </div>
  )
}

export default Column