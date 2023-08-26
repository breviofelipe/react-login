import axios from 'axios'
const baseUrl = 'http://localhost:5000'

export async function autenticar (user, password) {
  try {
    const body = {
      user,
      password
    }
    const configurationObject = {
      method: 'post',
      url: `${baseUrl}/login`,
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
