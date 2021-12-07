import React, {useState, useEffect, useRef, useLayoutEffect} from 'react'

import { mapOrder } from 'utilities/sort'
import { getFullBoard } from 'app/core/apis/board'
import { useSelector, useDispatch } from 'react-redux'

import { boardHandleActionReducer } from 'store/boardReducer'
import { listUserBoard } from 'app/core/apis/board'
import LoadingOverlay from 'react-loading-overlay';

//custom components
import AppBar from 'app/base/AppBar/AppBar';
import BoardBar from 'app/base/BoardBar/BoardBar';
import BoardContent from 'app/base/BoardContent/BoardContent';

function BoardPage() {
  const [ isActive, setIsActive] = useState(true)
  const _id = window.location.pathname.split("/");
  const boardId = _id[2];

  const dispatch = useDispatch()
  const board = useSelector(state => state.board.board)
  
  const fetchFullBoardById = async () => {
    try {
      const res = await getFullBoard(boardId);
      if(res && res.data.result)
      {
        console.log('board: ', res.data.data)
        // setBoard(res.data.data);
        // setColumns(mapOrder(res.data.data.columns, res.data.data.columnOrder, "_id"));
        await dispatch(boardHandleActionReducer({
          listTag: [...res.data.data.listTag],
          type: "SET_LIST_TAG"
        }))
        let columns = [...res.data.data.board1.columns]
        const newCol = []
        columns.map(item => {
          let temp = {
            ...item,
            cards: mapOrder(item.cards, item.cardOrder, "_id")
          }
          newCol.push(temp)
        })
        await dispatch(boardHandleActionReducer({
          board: {
            ...res.data.data.board1,
            columns: mapOrder(newCol, res.data.data.board1.columnOrder, "_id")
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
            await dispatch(boardHandleActionReducer({
              listUserBoard: res.data.data.listUserBoard,
              listNotUserBoard: res.data.data.listNotUserBoard,
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
    fetchFullBoardById()
    fetchLisUserBoard()
  }, [])

  useEffect(() => {
    board?.title !== undefined && setIsActive(false)
    console.log('board after save store: ', board)
  }, [board])


  return (
      <div className="trello-app">
        <AppBar/>
          <LoadingOverlay
            active={isActive}
            spinner
            text={'Đợi xíu đang load...'}
            >
          </LoadingOverlay>
        {
          !isActive &&
          <>
            <BoardBar/>
            <BoardContent/>
          </>
        }
        
      </div>
  );
}

export default BoardPage;
