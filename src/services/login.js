import axios from 'axios'
// const baseUrl = 'http://192.168.0.6:5000'
const baseUrl = 'https://hidden-beach-56074-0fd939fd2f6c.herokuapp.com'

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
    return response.data
  } catch (error) {
    console.log(error)
    return error
  }
}
