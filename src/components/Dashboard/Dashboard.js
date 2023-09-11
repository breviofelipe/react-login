import React, { Fragment } from 'react'
import './Dashboard.css'
import TaskList from './components/tasklist/TaskList'

export default function Dashboard () {
  return (
    <Fragment>
      <TaskList />
    </Fragment>
  )
}
