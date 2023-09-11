import React, { useEffect, useState, Fragment } from 'react'
import Select from 'react-select'

import AlertTitle from '@mui/material/AlertTitle'

import DatePicker,
{ registerLocale }
  from 'react-datepicker'
import ptBR from 'date-fns/locale/pt-BR'

import chroma from 'chroma-js'
import makeAnimated from 'react-select/animated'

import { criar } from '../../services/tasks'

import './Tarefa.css'
import 'react-datepicker/dist/react-datepicker.css'

import { useForm, useController } from 'react-hook-form'
import { Alert, Collapse } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

import { useNavigate } from 'react-router-dom'

registerLocale('pt-br', ptBR)

export default function Tarefa () {
  const [open, setOpen] = useState(false)
  const [openErro, setOpenErro] = useState(false)
  const [tituloSalvo, setTitulo] = useState(false)
  const [startDate, setStartDate] = useState(new Date())

  // const startDate = new Date()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm()

  const DateInput = () => {
    return (
     <DatePicker
        type="date"
        locale="pt-br"
        placeholderText='Data da entrega'
        dateFormat="dd/MM/yyyy"
        selected={startDate}
        onChange={setStartDate}
        value={startDate}
        className='datepicker'
        />
    )
  }

  const { field: { value: langValue, onChange: langOnChange, ...restLangField } } = useController({ name: 'prioridade', control })
  const colourStyles = {
    singleValue: (styles, { data }) => ({ ...styles, color: data.color ? data.color : 'white' }),
    control: (styles, { isFocused }) => ({ ...styles, backgroundColor: 'rgba(255,255,255,0.07)', borderColor: isFocused ? 'white' : 'rgba(255,255,255,0.07)' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color)
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
            ? data.color
            : isFocused
              ? color.alpha(0.1).css()
              : '#404040',
        color: isDisabled
          ? '#ccc'
          : isSelected
            ? chroma.contrast(color, 'white') > 2
              ? 'white'
              : 'black'
            : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined
        }
      }
    }
  }
  const colourOptions = [
    { value: '1', label: 'Vermelho', color: '#e35959', isFixed: true },
    { value: '2', label: 'Amarelo', color: '#e3ac59', isDisabled: false },
    { value: '3', label: 'Limão', color: '#c7e359' },
    { value: '6', label: 'Ciano', color: '#59e3e3', isFixed: true },
    { value: '8', label: 'Roxo', color: '#7559e3' }
  ]

  const navigate = useNavigate()

  function handleClick (path) {
    navigate(path)
  }

  useEffect(() => {
    reset()
  }, [tituloSalvo])

  const animatedComponents = makeAnimated()

  const onSubmit = (data) => {
    console.log(data)
    const titulo = data.titulo
    const dataInicio = new Date().toUTCString()
    const descricao = data.descricao
    const dataEntraga = startDate.toUTCString()
    const cor = data.prioridade

    const body = {
      titulo,
      dataInicio,
      descricao,
      dataEntraga,
      cor
    }

    console.log('task body=' + body)

    criar({ body }).then(res => {
      console.log(res)
      if (res.titulo) {
        setTitulo(data.titulo)
        setOpen(true)
      } else {
        setOpenErro(true)
      }
    })
  }
  return <Fragment>
  <div className='cardNewTask'>

    <form onSubmit={handleSubmit(onSubmit)}>
  <h4>Criar nova tarefa</h4>

  <label htmlFor="titulo">Titulo</label>
  <input type="text" placeholder="Digite um titulo" id='titulo' {...register('titulo', { required: true })}/>
  {errors.titulo && errors.titulo.type === 'required' && (
        <p className="errorMsg">Digite o titulo.</p>
  )}

  <label htmlFor="titulo">Entrega</label>
  <DateInput id='entrega' />
  {/* <input type="text" placeholder="Data da entrega" /> */}
  {errors.entrega && errors.entrega.type === 'required' && (
        <p className="errorMsg">Digite a data da entrega.</p>
  )}
  <label htmlFor="titulo">Prioridade</label>
  <Select
  id='prioridade'
  placeholder='Selecione a prioridade...'
  components={animatedComponents}
  options={colourOptions}
  styles={colourStyles}
  value={langValue ? colourOptions.find(x => x.value === langValue) : langValue}
        onChange={option => langOnChange(option ? option.value : option)}
        {...restLangField}
  />
  <label htmlFor="descricao">Descrição</label>
  <textarea placeholder="Descreva a atividade..." id="descricao" {...register('descricao', { required: true, minLength: 6 })} />
  {errors.descricao && errors.descricao.type === 'required' && (
        <p className="errorMsg">Digite a descricao.</p>
  )}

  {errors.descricao && errors.descricao.type === 'minLength' && (
        <p className="errorMsg">Descrição muito curta.</p>
  )}

<div>
  <button type="submit">salvar</button>
</div>
</form>
</div>
<div className='alertTarefa'>
  <Collapse in={openErro}>
    <Alert onClose={() => {
      setOpenErro(false)
    }} severity="error">
      <AlertTitle>Ops...</AlertTitle>
      Erro ao salvar tarefa</Alert>
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
      <AlertTitle>Sucesso</AlertTitle>
      Tarefa {tituloSalvo} salva com sucesso</Alert>
  </Collapse>
</div>
</Fragment>
}
