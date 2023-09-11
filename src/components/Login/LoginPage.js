import React, { useState } from 'react'
import './Login.css'
import { autenticar } from '../../services/login'
import { useForm } from 'react-hook-form'
import { Alert, Collapse } from '@mui/material'
import AlertTitle from '@mui/material/AlertTitle'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import jwtDecode from 'jwt-decode'

import { Navigate } from 'react-router-dom'
export default function LoginPage () {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [open, setOpen] = useState(false)
  const [openErro, setOpenErro] = useState(false)
  const [token, setToken] = useState()
  const [errorMsg, setErroMsg] = useState()

  const onSubmit = (data) => {
    console.log(data)
    localStorage.clear()
    autenticar(data.user, data.password).then(res => {
      console.log(res)

      if (res.token) {
        setToken(res.token)
        const decodedToken = jwtDecode(res.token)
        localStorage.setItem('user-token', res.token)
        localStorage.setItem('user-name', decodedToken.sub)
        setOpen(true)
      } else {
        setErroMsg(res)
        setOpenErro(true)
      }
    })
  }

  return (
    <div>
    <body>
      {token && (
          <Navigate to="/" replace={true} />
      )}

      <div className='sectionLogin'>
      <form className='form-default' onSubmit={handleSubmit(onSubmit)}>
      <h4>Bora logar?</h4>

          <label htmlFor="username">Usuário</label>
          <input type="text" placeholder="Email ou Usuário" id='user' {...register('user', { required: true })}/>
          {errors.user && errors.user.type === 'required' && (
            <p className="errorMsg">Digite o usuário.</p>
          )}
          <label htmlFor="password">Senha</label>
          <input type="password" placeholder="Password" id="password" {...register('password', { required: true, minLength: 5 })} />
          {errors.password && errors.password.type === 'required' && (
            <p className="errorMsg">Digite a senha.</p>
          )}
          {errors.password && errors.password.type === 'minLength' && (
            <p className="errorMsg">
              Senha curta. Minimo 6 caracteres
            </p>
          )}
        <div>
          <button type="submit">entrar</button>
        </div>
      </form>
      </div>
      </body>
      <div className='alertLogin'>
      <Collapse in={openErro}>
        <Alert onClose={() => { setOpenErro(false) }} severity="error">
          <AlertTitle>Error</AlertTitle>
          Usuário invalido {errorMsg?.message}</Alert>
      </Collapse>
      <Collapse in={open}>
        <Alert onClose={() => { setOpen(false) }}
          iconMapping={{
            success: <CheckCircleOutlineIcon fontSize="inherit" />
          }}
        >
          <AlertTitle>Success</AlertTitle>
          Usuário logado com sucesso token = {token}</Alert>
      </Collapse>
      </div>
    </div>

  )
}
