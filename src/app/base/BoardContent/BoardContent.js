import React, {useState, useEffect, useRef} from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap'
import { isEmpty } from 'lodash'

import './BoardContent.scss'
import Column from '../Column/column'
import { applyDrag } from 'utilities/dragDrop'

import { mapOrder } from 'utilities/sort'

import { initialData } from 'actions/initialData'
import { getDateOFForm } from 'utilities/format'


function BoardContent()
{
  const [board, setBoard ] = useState({})
  const [columns, setColumns] = useState([])
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)

  const newColumnInputRef = useRef(null)

  const [newColumnTitle, setNewColumnTitle] = useState('')
  const onNewColumnTitleChange = (e) => setNewColumnTitle(e.target.value)

  useEffect(() => {
    const boardFromDB = initialData.boards.find(board => board.id === 'board-1')

    if (boardFromDB)
    {
      setBoard(boardFromDB)
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
    }
  }, [])

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current)
    {
      newColumnInputRef.current.focus()
    }
  }, [openNewColumnForm])

  if (isEmpty(board))
  {
    return <div className="not-found">Board not found</div>
  }

  const onColumnDrop = (dropResult) => {
    // clone array to new array, process col then edit with newCol, finally save
    let newColumns = [...columns]
    newColumns = applyDrag(newColumns, dropResult)

    let newBoard = {...board}
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns

    setColumns(newColumns)

    setBoard(newBoard)
  }

  const onCardDrop = (columnId,dropResult) => {
    if (dropResult.removeIndex !== null || dropResult.addedIndex !== null)
    {
      let newColumns = [...columns]

      let currentColumn = newColumns.find(c => c.id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map(c => c.id)

      setColumns(newColumns)
    }
  }

  const addNewColumn = () => {
    if (!newColumnTitle)
    {
      newColumnInputRef.current.focus()
      return
    }

    const newColumnToAdd = {
      id: Math.random().toString(36).substr(2, 5), //5 random character, will remove when we implement code api
      boardId: board.id,
      title: newColumnTitle.trim(),
      cardOrder: [],
      cards: []
    }

    let newColumns = [...columns]
    newColumns.push(newColumnToAdd)

    let newBoard = {...board}
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns

    setColumns(newColumns)

    setBoard(newBoard)
    setNewColumnTitle('')
    toggleOpenAddColumnForm()
  }

  const onUpdateColumn = (newColumnToUpdate) => {
    const columnIdToUpdate = newColumnToUpdate.id

    let newColumns = [...columns]

    const columnIndexToUpdate = newColumns.findIndex(c => c.id === columnIdToUpdate)
    if (newColumnToUpdate._destroy)
    {
      // remove column
      newColumns.splice(columnIndexToUpdate, 1)
    }
    else
    {
      // update column
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
    }

    let newBoard = {...board}
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns

    setColumns(newColumns)

    setBoard(newBoard)
  }


  const toggleOpenAddColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        dragHandleSelector=".column-drag-handle"
        getChildPayload = {index => columns[index]}
        dropPlaceholder = {{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column key={index} column={column} onCardDrop={onCardDrop} onUpdateColumn={onUpdateColumn}/>
          </Draggable>
        ))}
      </Container>
      <BootstrapContainer className="add-new-column-container">
        {
          !openNewColumnForm &&
          <Row>
            <Col className="add-new-column" onClick={toggleOpenAddColumnForm}>
              <i className="fa fa-plus icon"></i>
                Add another column
            </Col>
          </Row>
        }
        {
          openNewColumnForm &&
          <Row>
            <Col className="enter-new-column">
              <Form.Control size="sm"
                type="text"
                placeholder="Enter column title..."
                className="input-enter-new-column"
                ref={newColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={event => (event.key === 'Enter') && addNewColumn()}>
              </Form.Control>
              <div className="column-action">
                <Button variant="success" size="sm" onClick={addNewColumn}>Add new column</Button>
                <i className="fa fa-trash icon" onClick={toggleOpenAddColumnForm}></i>
              </div>
            </Col>
          </Row>
        }
      </BootstrapContainer>
    </div>
  )
}

export default BoardContent