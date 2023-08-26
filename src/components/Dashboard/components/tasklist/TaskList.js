import React, { useEffect, useState } from 'react'
import './TaskList.css'
import TaskItem from './item/TaskItem'
import { tasks } from '../../../../services/tasks'

export default function TaskList () {
  const [listTasks, setTasks] = useState()

  useEffect(() => {
    tasks().then(response => {
      console.log(response)
      setTasks(response)
    })
  }, [])

  return <> {listTasks && <ol style={{ '--length': 5 }} role="list">
            {listTasks && listTasks.map((task) => {
              return <TaskItem key={task.id} task={task} />
            })}
            </ol>
    }
    </>
}
