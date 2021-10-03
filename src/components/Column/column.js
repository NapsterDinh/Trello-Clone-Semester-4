import React from 'react'

import './column.scss'

import Task from '../Task/task'

function Column()
{
    return(
        <div className="board-columns">
          <div className="column">
            <header>Brain Storm</header>
            <ul className ="task-list">
              <Task/>
              <li className="task-item">Add your task below</li>
              <li className="task-item">Add your task below</li>
              <li className="task-item">Add your task below</li>
              <li className="task-item">Add your task below</li>
              <li className="task-item">Add your task below</li>
            </ul>
            <footer>Add another card</footer>
          </div>
        </div>
    )
}

export default Column