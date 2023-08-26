import React from 'react'
import './TaskItem.css'

export default function TaskItem ({ task }) {
  const style = { '--i': task?.prioridade }
  return <div className='listaTarefas'>
    <li style={style}>
      <h3>{task?.titulo}</h3>
      <p>{task?.descricao}</p>
    </li>
  </div>
}
