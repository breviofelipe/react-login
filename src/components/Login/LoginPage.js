import React, { useState } from 'react';
import './Login.css';
import {autenticar} from '../../services/login'
import { useForm } from 'react-hook-form';
import { Alert, Collapse } from '@mui/material';
import AlertTitle from '@mui/material/AlertTitle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function LoginPage() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(false);
  const [openErro, setOpenErro] = useState(false);
  const [token, setToken] = useState("XXXXXXXX");
  const onSubmit = (data) => {
    console.log(data);
    autenticar(data.user, data.password).then(res => {
      console.log(res)
      if(res.token){
        setToken(res.token)
        setOpen(true)
      } else {
        setOpenErro(true)
      }
    })
  };



  return(
    <div>
      <head>
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet"></link>  
      </head>      
      <body>
      <Collapse in={openErro}>
        <Alert onClose={() => {setOpenErro(false)}} severity="error">
          <AlertTitle>Error</AlertTitle>
          Usuário invalido</Alert>
      </Collapse>
      <Collapse in={open}>
        <Alert onClose={() => {setOpen(false)}}
          iconMapping={{
            success: <CheckCircleOutlineIcon fontSize="inherit" />,
          }}
        >
          <AlertTitle>Success</AlertTitle>
          Usuário logado com sucesso token = {token}</Alert>
      </Collapse>
     
      <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Bora logar?</h3>
        
          <label for="username">Usuário</label>
          <input type="text" placeholder="Email ou Usuário" id='user' {...register("user", {required: true})}/>
          {errors.user && errors.user.type === "required" && (
            <p className="errorMsg">Digite o usuário.</p>
          )}
          <label for="password">Senha</label>
          <input type="password" placeholder="Password" id="password" {...register("password", {required: true, minLength: 6})} />
          {errors.password && errors.password.type === "required" && (
            <p className="errorMsg">Digite a senha.</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p className="errorMsg">
              Senha curta. Minimo 6 caracteres
            </p>
          )}
        <div>
          <button type="submit">entrar</button>
        </div>
        <div class="social">
          <div class="go"><i class="fab fa-google"></i>Google</div>
          <div class="fb"><i class="fab fa-facebook"></i>Facebook</div>
        </div>
      </form>
      </body>
    </div>
  )
}