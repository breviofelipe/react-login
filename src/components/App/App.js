import React from 'react'
import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { FcAbout, FcBusinessman, FcTodoList } from 'react-icons/fc'
import FAB from './components/fab/Fab'
function App () {
  const navigate = useNavigate()
  function handleClick (path) {
    navigate(path)
  }

  const actions = [
    { label: 'Tarefas', icon: <FcTodoList />, onClick: () => handleClick('tarefa') },
    { label: 'Montagem', icon: <FcAbout />, onClick: () => handleClick('/') },
    { label: 'Alunos', icon: <FcBusinessman />, onClick: () => handleClick('login') }
  ]

  return <>
        <head>
            <link rel="preconnect" href="https://fonts.gstatic.com"></link>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet"></link>
        </head>
            <div className="background">
              <div className="shape"></div>
              <div className="shape"></div>
            </div>
            {/* <section> */}
              <div>
                  <Outlet />
              </div>
            {/* </section> */}
            <FAB actions={actions} />
          </>
}

export default App
