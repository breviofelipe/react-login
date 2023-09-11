import * as React from 'react'
import './CardTarefa.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Divider from '@mui/material/Divider'
import { format } from 'date-fns'
import { Alert, Collapse } from '@mui/material'
import AlertTitle from '@mui/material/AlertTitle'
import AttachFile from '@mui/icons-material/AttachFile'
import BasicModalCard from './components/BasicModal'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'

export default function CardTarefa () {
  const task = useLocation().state.task
  const location = useLocation()
  console.log(location)

  const navigate = useNavigate()

  function handleClick (path) {
    navigate(path)
  }

  const getDataEntrega = () => {
    const currentDate = format(new Date(task.dataEntrega), 'dd/MM/yyyy')
    return currentDate
  }

  const anexos = () => {
    let listaAnexos = task.anexos

    if (listaAnexos.length > 0) {
      listaAnexos = listaAnexos.map((anexo, index) => {
        return <>
              <ListItem
                    secondaryAction={
                  <IconButton color='success' aria-label="anexo">
                    <AttachFile onClick={() => window.open(`${anexo.link}`, '_blank')}/>
                  </IconButton>
                }
                key={index}>
                <ListItemText primaryTypographyProps={{
                  fontSize: 16,
                  fontWeight: 'small',
                  letterSpacing: 0,
                  margin: 0
                }} primary={`${anexo.titulo.toUpperCase()}`} />
              </ListItem>
        </>
      })
    }
    return listaAnexos
  }

  const [open, setOpen] = React.useState(false)
  const [openErro, setOpenErro] = React.useState(false)

  const alert = () => {
    return <>
      <Collapse in={openErro}>
        <Alert onClose={() => { setOpenErro(false) }} severity="error">
          <AlertTitle>Error</AlertTitle>
          Não foi possivel salvar o anexo</Alert>
      </Collapse>
      <Collapse in={open}>
        <Alert onClose={() => {
          setOpen(false)
          handleClick('/')
        }}
          iconMapping={{
            success: <CheckCircleOutlineIcon fontSize="inherit" />
          }}
        >
          <AlertTitle>Success</AlertTitle>
          Anexo salvo com sucesso</Alert>
      </Collapse>
    </>
  }

  const style = { '--i': 5, '--color': task?.cor }
  return <div className='cardTarefa' style={style}>
            {alert()}
            <h3>{task?.titulo} </h3>
            <div className='pCard'>
              <div className='dataCard'>
                <p>Data entrega:</p><p>{getDataEntrega()}</p>
              </div>
              <p>Descrição: {task?.descricao}</p>
            </div>
            <div className='contentCard'>Conteúdo complementar</div>
            <Divider></Divider>
            <div className='anexos'>
            <List
                sx={{
                  width: '100%',
                  maxWidth: '40rem',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 150,
                  bgcolor: 'rgba(255,255,255,0.1)'
                }}
              >
              {anexos()}
              </List>
            </div>
            <BasicModalCard setOpenAlert={setOpen} id={task.id} titulo={'Anexar novo conteúdo'} descricao={'Adicone links para auxilio da tarefa'}>
              Anexar novo<AttachFile color='success' />
            </BasicModalCard>

</div>
}
