import React, { useState, useEffect, useRef } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form, Button } from 'react-bootstrap'
import { cloneDeep } from 'lodash'

import './column.scss'

import Card from '../Card/card'
import ConfirmModal from '../Common/confirmModal'
import { MODAL_ACTION_CONFIRM } from '../../utilities/constants'

import { mapOrder } from '../../../src/utilities/sort'
import { saveContentAfterPressEnter, selectAllInlineText} from '../../../src/utilities/contentEditable'

function Column(prop)
{
  const { column, onCardDrop, onUpdateColumn} = prop
  const cards = mapOrder(column.cards, column.cardOrder, 'id')

  const newCardInputRef = useRef(null)

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)

  const [columnTitle, setColumnTitle] = useState('')
  const handleColumnTitleChange = (e) => setColumnTitle(e.target.value)

  const [newCardTitle, setNewCardTitle] = useState('')
  const onNewCardTitleChange = (e) => setNewCardTitle(e.target.value)

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenAddCardForm = () => setOpenNewCardForm(!openNewCardForm)

  // useEffect Column Title
  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  // useEffect Card auto focus when open Add new card form
  useEffect(() => {
    if (newCardInputRef && newCardInputRef.current)
    {
      newCardInputRef.current.focus()
    }
  }, [openNewCardForm])

  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM)
    {
      const newColumn = {
        ...column,
        _destroy: true
      }
      onUpdateColumn(newColumn)
    }
    toggleShowConfirmModal()
  }

  const handleColumnTitleBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle
    }
    onUpdateColumn(newColumn)
  }

  const addNewCard = () => {
    if (!newCardTitle)
    {
      newCardInputRef.current.focus()
      return
    }

    const newCardToAdd = {
      id: Math.random().toString(36).substr(2, 5), //5 random character, will remove when we implement code api
      boardId: column.boardId,
      columnId: column.id,
      title: newCardTitle.trim(),
      cover: null
    }

    // let newColumns = [...column]
    // Main purpose is edit state then update new data from state to initial data
    // with let newColumns = [...column], we had edited initial data. That wrongs with main purpose
    let newColumns = cloneDeep(column)
    newColumns.cards.push(newCardToAdd)
    newColumns.cardOrder.push(newCardToAdd.id)

    onUpdateColumn(newColumns)
    setNewCardTitle('')
    toggleOpenAddCardForm()
  }

  return (
    <div className='board-columns'>
      <div className='column'>
        <header className='column-drag-handle'>
          <div className="column-title">
            <Form.Control size="sm"
              type="text"
              className="title-editable"
              value={columnTitle}
              onBlur={handleColumnTitleBlur}
              onChange={handleColumnTitleChange}
              onKeyDown={saveContentAfterPressEnter}
              onClick={selectAllInlineText}
              onMouseDown={(e) => e.preventDefault()}
              spellCheck="false">
            </Form.Control>
          </div>
          <div className="column-dropdown-actions">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <i className="fa fa-ellipsis-h"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Add new Card...</Dropdown.Item>
                <Dropdown.Item href="#/action-2" onClick={toggleShowConfirmModal}>Remove this list...</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Move this list...</Dropdown.Item>
                <Dropdown.Item href="#/action-4">New feature (coming soon)</Dropdown.Item>
                <Dropdown.Item href="#/action-5">New feature (coming soon)</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </header>
        <div className ='card-list'>
          <Container
            groupName='col'
            onDrop={dropResult => onCardDrop(column.id, dropResult)}
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
          {
            openNewCardForm &&
              <div className="add-new-card-area">
                <Form.Control size="sm"
                  as="textarea"
                  rows="3"
                  placeholder="Enter card title..."
                  className="input-enter-new-card add-input"
                  ref={newCardInputRef}
                  value={newCardTitle}
                  onChange={onNewCardTitleChange}
                  onKeyDown={event => (event.key === 'Enter') && addNewCard()}>
                </Form.Control>
              </div>
          }
        </div>
        <footer>
          {
            openNewCardForm &&
                <div className="column-action">
                  <Button variant="success" size="sm" className="add-button" onClick={addNewCard}>Add new cards</Button>
                  <i className="fa fa-trash icon" onClick={toggleOpenAddCardForm}></i>
                </div>
          }
          {
            !openNewCardForm &&
              <div className="footer-actions" onClick={toggleOpenAddCardForm}>
                <i className="fa fa-plus icon"></i>
                Add another card
              </div>
          }
        </footer>
        <ConfirmModal
          show={showConfirmModal}
          onAction={onConfirmModalAction}
          title="Remove Column"
          //using html-react-paser to parse string to html code
          content={`Are you sure to remove <strong>${column.title}!</strong> <br/>All related cards will also be removed!`}
        />
      </div>
    </div>
  )
}

export default Column