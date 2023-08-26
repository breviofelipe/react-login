import axios from 'axios'
const baseUrl = 'http://192.168.0.6:5000'

export async function tasks () {
  try {
    const configurationObject = {
      method: 'get',
      url: `${baseUrl}/task/consultar`
    }
    const response = await axios(configurationObject)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function criar ({ body }) {
  try {
    console.log('body=' + body)

    const configurationObject = {
      method: 'post',
      url: `${baseUrl}/task/criar`,
      data: body
    }
    const response = await axios(configurationObject)
    console.log(response.data)

    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
}
