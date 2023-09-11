import React, { useEffect, useState } from 'react'
import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { FcBusinessman, FcCheckmark, FcTodoList } from 'react-icons/fc'
import { FaTheaterMasks } from 'react-icons/fa'
import { CgLogOff } from 'react-icons/cg'
import FAB from './components/fab/Fab'
import PrimarySearchAppBar from './components/header/HeaderApp'
import FooterApp from './components/footer/FooterApp'
function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userLogged, setUserLogged] = useState()
  const checkUserToken = () => {
    const userToken = localStorage.getItem('user-token')
    const userName = localStorage.getItem('user-name')

    if (!userToken || userToken === 'undefined') {
      setIsLoggedIn(false)
    }
    setIsLoggedIn(true)
    setUserLogged(userName)
  }
  useEffect(() => {
    checkUserToken()
  }, [isLoggedIn])

  const navigate = useNavigate()
  function handleClick (path) {
    navigate(path)
  }

  const actions = [
    { label: 'Tarefas', icon: <FcTodoList />, onClick: () => handleClick('/') },
    { label: 'Nova tarefa', icon: <FcCheckmark />, onClick: () => handleClick('tarefa') },
    { label: 'Alunos', icon: <FcBusinessman />, onClick: () => handleClick('login') },
    { label: 'Elenco', icon: <FaTheaterMasks color='white' />, onClick: () => handleClick('/') },
    {
      label: 'Sair',
      icon: <CgLogOff color='red' />,
      onClick: () => {
        localStorage.clear()
        handleClick('/login')
      }
    }
  ]

  return <>
            {userLogged && <PrimarySearchAppBar />}
              <Outlet />
            {isLoggedIn && <FAB actions={actions} />}
            {userLogged && <FooterApp />}
          </>
}

export default App
