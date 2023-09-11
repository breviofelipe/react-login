import axios from 'axios'
// const baseUrl = 'http://192.168.0.6:5000'
const baseUrl = 'https://hidden-beach-56074-0fd939fd2f6c.herokuapp.com'

export async function tasks () {
  try {
    const token = localStorage.getItem('user-token')
    const configurationObject = {
      method: 'get',
      url: `${baseUrl}/task/consultar`,
      headers: {
        accept: '*/*',
        Authorization: 'Bearer ' + token
      }

    }
    const response = await axios(configurationObject)
    return response.data
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function tasksById (id) {
  try {
    const token = localStorage.getItem('user-token')
    const configurationObject = {
      method: 'get',
      url: `${baseUrl}/task/consultar/${id}`,
      headers: {
        accept: '*/*',
        Authorization: 'Bearer ' + token
      }
    }
    const response = await axios(configurationObject)
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function tasksAttachById (body) {
  try {
    const token = localStorage.getItem('user-token')
    const configurationObject = {
      method: 'post',
      url: `${baseUrl}/task/anexar`,
      data: body,
      headers: {
        accept: '*/*',
        Authorization: 'Bearer ' + token
      }
    }
    const response = await axios(configurationObject)
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function criar ({ body }) {
  try {
    const token = localStorage.getItem('user-token')
    const configurationObject = {
      method: 'post',
      url: `${baseUrl}/task/criar`,
      data: body,
      headers: {
        accept: '*/*',
        Authorization: 'Bearer ' + token
      }
    }
    const response = await axios(configurationObject)
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
}
