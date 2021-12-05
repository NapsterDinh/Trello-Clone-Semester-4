import React, {useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Draggable } from 'react-smooth-dnd'
import { Container as BootstrapContainer, Row, Col, Form, Button, OverlayTrigger,Tooltip } from 'react-bootstrap'
import { isEmpty, cloneDeep } from 'lodash'

import './BoardContent.scss'
import Column from '../Column/column'
import { applyDragIncol, applyDragTwoCol } from 'utilities/dragDrop'
import { boardHandleActionReducer } from 'store/boardReducer'

import { addNewColumn as addNewColumn1,
        updateColumn as updateColumn1,
        deleteColumn as deleteColumn1 } from 'app/core/apis/column'
import { updateCardOrder } from 'app/core/apis/column'
import { updateColumnOrder } from 'app/core/apis/board'

function BoardContent(props)
{
  const board = useSelector(state => state.board.board)
  const columns = board.columns

  const dispatch = useDispatch()
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)

  const newColumnInputRef = useRef(null)

  const [newColumnTitle, setNewColumnTitle] = useState('')
  const onNewColumnTitleChange = (e) => setNewColumnTitle(e.target.value)
  const [ error, setError ] = useState('')

  const setBoard = (boardResult) => 
  {
    dispatch(boardHandleActionReducer({
      type: 'SET_BOARD',
      board: boardResult
    }))
  }

  const setColumns = (columnsResult) => 
  {
    dispatch(boardHandleActionReducer({
      type: 'SET_COLUMNS',
      columns: columnsResult
    }))
  }

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

  const onColumnDrop = async (dropResult) => {
    // clone array to new array, process col then edit with newCol, finally save
    let newColumns = [...columns]
    newColumns = applyDragIncol(newColumns, dropResult)

    let newBoard = {...board}
    newBoard.columnOrder = newColumns.map(c => c._id)
    newBoard.columns = newColumns

    setColumns(newColumns)

    setBoard(newBoard)

    try {
      const res = await updateColumnOrder(newBoard)
      if(!res.data.result)
      {
        setColumns(columns)
        setBoard(board)
        console.log(res.data.msg)
      }
    } catch (error) {
      setColumns(columns)
      setBoard(board)
      console.log(error.message)
    }
  }

  const onCardDrop = async (columnId,dropResult) => {
   if(dropResult.removedIndex !== null
      && dropResult.addedIndex !== null
      && dropResult.removedIndex !== dropResult.addedIndex)
   {
     // change item card in col
     let newColumns = cloneDeep(columns)

     let currentColumn = newColumns.find(c => c._id === columnId)
     currentColumn.cards = applyDragIncol(currentColumn.cards, dropResult)
     currentColumn.cardOrder = currentColumn.cards.map(c => c._id)
     currentColumn.isUpdateColId = false
     setColumns(newColumns)
     try {
       const res = await updateCardOrder(currentColumn)
       if(res && res.data.result)
       {
         console.log(res.data.msg)
       }
     } catch (error) {
       console.log(error.message)
     }
   }
   else if(dropResult.removedIndex !== null || dropResult.addedIndex !== null)
   {
      // change item card in col
     let newColumns = cloneDeep(columns)

     let currentColumn = newColumns.find(c => c._id === columnId)
     const result = applyDragTwoCol(currentColumn.cards, currentColumn._id, dropResult)
   
     currentColumn.cards = result.result
      currentColumn.cardOrder = currentColumn.cards.map(c => c._id)
      currentColumn.itemToAdd =  result.itemToAdd
      currentColumn.isUpdateColId = false
     if(dropResult.addedIndex !== null)
     {
        currentColumn.isUpdateColId = true
     }
     setColumns(newColumns)
         try {
           const res = await updateCardOrder(currentColumn)
           if(!res || !res.data.result)
           {
             console.log(res.data.msg)
           }
         } catch (error) {
           console.log(error.message)
         }
   }
  }

  const addNewColumn = async () => {
    if (!newColumnTitle)
    {
      setError('Bạn phải đăng tên cho danh sách!!!')
      newColumnInputRef.current.focus()
      return
    }
    setError('')

    const newColumnToAdd = {
      boardId: board._id,
      title: newColumnTitle.trim()
      // cardOrder: [],
      // cards: []
    }
    let newColumns = [...columns]
    let newBoard = {...board}
    try {
      const res = await addNewColumn1(newColumnToAdd)
      if(res && res.data.result)
      {
        newColumns.push(res.data.data)
        newBoard.columnOrder = newColumns.map(c => c._id)
        newBoard.columns = newColumns
      }
      else
      {
        console.log(res.data.msg)
      }
    } catch (error) {
      console.log(error.message)
    }

    console.log('newboard: ',newBoard)
    setColumns(newColumns)

    setBoard(newBoard)
    setNewColumnTitle('')
    toggleOpenAddColumnForm()
  }

  const handleColBoardChange = (newColumnToUpdate) => {
    let newColumns = [...columns]
    let newBoard = {...board}

    const columnIndexToUpdate = newColumns.findIndex(c => c._id === newColumnToUpdate._id)
    if (newColumnToUpdate._destroy)
    {
      // remove column
      newColumns.splice(columnIndexToUpdate, 1)
    }
    else
    {
      // update title column
      //future update order of card in column
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
    }

    newBoard.columnOrder = newColumns.map(c => c._id)
    newBoard.columns = newColumns
    setColumns(newColumns)

    setBoard(newBoard)
  }

  const onUpdateColumn = async (newColumnToUpdate) => {

    handleColBoardChange(newColumnToUpdate)

    let res;

    try {
      if (newColumnToUpdate._destroy)
      {
        // remove column
        res = await deleteColumn1(newColumnToUpdate._id)
      }
      else
      {
        // update title column
        //future update order of card in column
        res = await updateColumn1(newColumnToUpdate)
      }
      if(!res.data.result)
      {
        setColumns(columns)
        setBoard(board)
        console.log(res.data.msg)
      }
    } catch (error) {
      setColumns(columns)
      setBoard(board)
      console.log(error.message)
    }
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
            <Column key={index} column={column} indexCol={index} onCardDrop={onCardDrop} onUpdateColumn={onUpdateColumn} handleColBoardChange={handleColBoardChange}/>
          </Draggable>
        ))}
      </Container>
      <BootstrapContainer className="add-new-column-container">
        {
          !openNewColumnForm &&
          <Row>
            <Col className="add-new-column" onClick={toggleOpenAddColumnForm}>
              <i className="fa fa-plus icon"></i>
                Thêm danh sách
            </Col>
          </Row>
        }
        {
          openNewColumnForm &&
          <Row>
            <Col className={ !error ? "enter-new-column input" : "enter-new-column input error"}>
              <Form.Control size="sm"
                required
                maxLength="30"
                type="text"
                placeholder="Tên danh sách..."
                className="input-enter-new-column"
                ref={newColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={event => (event.key === 'Enter') && addNewColumn()}>
              </Form.Control>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="button-tooltip-4">{error}</Tooltip>}
              >
                <i className="fa fa-exclamation-circle error" aria-hidden="true"></i>
              </OverlayTrigger>
              <div className="column-action">
                <Button variant="success" size="sm" onClick={addNewColumn}>Thêm danh sách</Button>
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