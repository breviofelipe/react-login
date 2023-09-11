import React from 'react'
import './HeaderApp.css'
// import { IoNotificationsOutline } from 'react-icons/io5'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
// import TeatroImagem from '../../../../assets/images/teatro.png'
import { FaTheaterMasks } from 'react-icons/fa'

export default function PrimarySearchAppBar () {
  return <>
  <head>
            <link rel="preconnect" href="https://fonts.gstatic.com"></link>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet"></link>
        </head>
  <div className='appHeader'>
      {/* <Badge badgeContent={17} style={{ paddingRight: 5 }} color="error">
      <IoNotificationsOutline size='28' color='white'/>
      </Badge> */}
      <div className="shape">
        <FaTheaterMasks size={48} color='white' />
      </div>
      <div className='titulo'>Tarefas</div>
      <Badge className='profile'>
        <Avatar alt="Profile Picture" src='A' />
      </Badge>
  </div></>
}
