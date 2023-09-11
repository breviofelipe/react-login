import React, { useEffect, useState } from 'react'
import './TaskList.css'
import TaskItem from './item/TaskItem'
import { tasks } from '../../../../services/tasks'
import { useNavigate } from 'react-router-dom'

export default function TaskList () {
  const [listTasks, setTasks] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    tasks().then(response => {
      if (response) {
        setTasks(response)
      } else {
        localStorage.clear()
        navigate('login')
      }
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
