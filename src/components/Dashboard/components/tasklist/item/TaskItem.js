import React from 'react'
import './TaskItem.css'
import { NavLink } from 'react-router-dom'
export default function TaskItem ({ task }) {
  const style = { '--i': 5, '--color': task?.cor }
  return <NavLink className='navlink' to='card-tarefa' state={{ task }} >
      <div className='listaTarefas'>
      <li style={style}>
        <h3>{task?.titulo}</h3>
        <p>{task?.descricao}</p>
      </li>
    </div>
  </NavLink>
}
