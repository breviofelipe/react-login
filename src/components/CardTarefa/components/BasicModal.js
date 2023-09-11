import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useForm } from 'react-hook-form'
import { tasksAttachById } from '../../../services/tasks'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#080710',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'white'
}

function BasicModalCard ({ children, titulo, descricao, id, setOpenAlert }) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    console.log('dataform id' + id)
    const body = {
      id,
      titulo: data.titulo,
      anexo: data.anexo
    }
    tasksAttachById(body).then(res => {
      setOpenAlert(true)
      handleClose(true)
      console.log(res)
    })
  }

  const formAttach = () => {
    return <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="titulo">Titulo</label>
            <input type="text" placeholder="Titulo do anexo" id='titulo' {...register('titulo', { required: true })}/>
            {errors.titulo && errors.titulo.type === 'required' && (
              <p className="errorMsg">Digite o titulo.</p>
            )}
            <label htmlFor="link">Link</label>
            <input type="text" placeholder="Google Drive, Youtube, Doc..." id="anexo" {...register('anexo', { required: true, minLength: 6 })} />
            {errors.anexo && errors.anexo.type === 'required' && (
              <p className="errorMsg">Digite o link.</p>
            )}

          <div>
            <button type="submit">enviar</button>
          </div>
        </form>
  }

  return (
    <div>
      <Button color='info' onClick={handleOpen}>{children}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {titulo}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {descricao}
          </Typography>
          {formAttach()}
        </Box>
      </Modal>
    </div>
  )
}

export default BasicModalCard
