import React, { useEffect, useState } from 'react'
import Select from 'react-select'

import AlertTitle from '@mui/material/AlertTitle'

import
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
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm()

  // const DateInput = (props) => {
  //   return (
  //    <DatePicker
  //       type="date"
  //       locale="pt-br"
  //       dateFormat="dd/MM/yyyy"
  //       selected={props.startdate}
  //       onChange={props.onChange}
  //       value={props.value}
  //       className={props.className}
  //       />
  //   )
  // }

  const { field: { value: langValue, onChange: langOnChange, ...restLangField } } = useController({ name: 'prioridade', control })
  const colourStyles = {
    singleValue: (styles) => ({ ...styles, color: 'white' }),
    control: (styles, { isFocused }) => ({ ...styles, backgroundColor: 'rgba(255,255,255,0.07)', borderColor: isFocused ? 'red' : 'rgba(255,255,255,0.07)', color: isFocused ? 'green' : 'red' }),
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
              : undefined,
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
    { value: '1', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: '2', label: 'Blue', color: '#0052CC', isDisabled: false },
    { value: '3', label: 'Purple', color: '#5243AA' },
    { value: '4', label: 'Red', color: '#FF5630', isFixed: true },
    { value: '5', label: 'Green', color: '#FF8B00' }
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
    const dataEntraga = new Date().toUTCString()
    const prioridade = data.prioridade

    const body = {
      titulo,
      dataInicio,
      descricao,
      dataEntraga,
      prioridade
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
  return <><Collapse in={openErro}>
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
    <AlertTitle>Success</AlertTitle>
    Tarefa salva com sucesso id = {tituloSalvo}</Alert>
</Collapse>
  <section>

    <form onSubmit={handleSubmit(onSubmit)}>
  <h4>Criar nova tarefa</h4>

  <label htmlFor="titulo">Titulo</label>
  <input type="text" placeholder="Digite um titulo" id='titulo' {...register('titulo', { required: true })}/>
  {errors.titulo && errors.titulo.type === 'required' && (
        <p className="errorMsg">Digite o titulo.</p>
  )}

  <label htmlFor="titulo">Entrega</label>
  {/* <DateInput /> */}
  <input type="text" placeholder="Data da entrega" id='entrega' {...register('entrega', { required: true })}/>
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
<div>
  <button type="submit">salvar</button>
</div>
</form></section></>
}
