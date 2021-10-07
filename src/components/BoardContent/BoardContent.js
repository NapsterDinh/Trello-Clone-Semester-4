import React, {useState, useEffect} from 'react'

import { isEmpty } from 'lodash'

import './BoardContent.scss'
import Column from '../Column/column'

import { mapOrder } from '../../../src/utilities/sort'

import { initialData } from '../../../src/actions/initialData'


function BoardContent()
{
  const [board, setBoard ] = useState({})
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const boardFromDB = initialData.boards.find(board => board.id === 'board-1')

    if(boardFromDB)
    {
      setBoard(boardFromDB)
      
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
    }
  },[])

  if(isEmpty(board))
  {
      return <div className="not-found">Board not found</div>
  }

    return(
        <div className="board-columns">
          {columns.map((column, index) => <Column key={index} column={column}/>)}
        </div>
    )
}

export default BoardContent