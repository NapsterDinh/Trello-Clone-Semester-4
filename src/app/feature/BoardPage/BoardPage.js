import React from 'react'

//custom components
import AppBar from 'app/base/AppBar/AppBar';
import BoardBar from 'app/base/BoardBar/BoardBar';
import BoardContent from 'app/base/BoardContent/BoardContent';

function BoardPage() {
  return (
      <div className="trello-app">
        <AppBar/>
        <BoardBar/>
        <BoardContent/>
      </div>
  );
}

export default BoardPage;
