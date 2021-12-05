import React, {useState, useEffect, useRef} from 'react'

import { mapOrder } from 'utilities/sort'
import { getFullBoard } from 'app/core/apis/board'
import { useSelector, useDispatch } from 'react-redux'

import { boardHandleActionReducer } from 'store/boardReducer'
import { listUserBoard } from 'app/core/apis/board'

//custom components
import AppBar from 'app/base/AppBar/AppBar';
import BoardBar from 'app/base/BoardBar/BoardBar';
import BoardContent from 'app/base/BoardContent/BoardContent';

function BoardPage() {
  const [board, setBoard ] = useState({})
  const [columns, setColumns] = useState([])

  const _id = window.location.pathname.split("/");
  const boardId = _id[2];

  const dispatch = useDispatch()
  
  const fetchFullBoardById = async () => {
    try {
      const res = await getFullBoard(boardId);
      if(res && res.data.result && res.data.data)
      {
        console.log('board: ', res.data.data)
        // setBoard(res.data.data);
        // setColumns(mapOrder(res.data.data.columns, res.data.data.columnOrder, "_id"));
        dispatch(boardHandleActionReducer({
          board: {
            ...res.data.data,
            columns: mapOrder(res.data.data.columns, res.data.data.columnOrder, "_id")
          },
          type: 'SET_BOARD'
        }))
      }
      else
      {
        console.log(res.data.msg)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const fetchLisUserBoard = async() => 
  {
    try {
        const res = await listUserBoard(boardId)
        if(res && res.data.result)
        {
            dispatch(boardHandleActionReducer({
                listUserBoard: res.data.data,
                type: "SET_LIST_USER_BOARD"
            }))
        }
        else
        {
            console.log(res.data.msg)
        }
    } catch (error) {
        console.log(error.message)
    }
  }

  useEffect(() => {
    fetchLisUserBoard()
    fetchFullBoardById()
  }, [])

  return (
      <div className="trello-app">
        <AppBar/>
        <BoardBar/>
        <BoardContent/>
      </div>
  );
}

export default BoardPage;
