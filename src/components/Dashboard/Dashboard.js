import React, { Fragment } from 'react'
import './Dashboard.css'
import TaskList from './components/tasklist/TaskList'

export default function Dashboard () {
  return (
    <Fragment>
      <div className='titulo'>
        <h4>Tarefas</h4>
      </div>
      <TaskList />
    </Fragment>
  )
}
