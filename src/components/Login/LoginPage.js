import React from 'react';
import './Login.css';

export default function LoginPage() {
  return(
    <div>
      <head>
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet"></link>  
      </head>      
      <body>
      <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <form >
      <h3>Bora logar?</h3>
        
          <label for="username">Usuário</label>
          <input type="text" placeholder="Email ou Usuário" />
          <label for="password">Senha</label>
          <input type="password" placeholder="Password" id="password"></input>
        
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