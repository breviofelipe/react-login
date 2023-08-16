import axios from 'axios';
const baseUrl = 'http://localhost:8080';


export async function autenticar(user, password){
    try {
        let body = {
            'user' : user,
            'password' : password
        }
        const configurationObject = {
            method: 'post',
            url: `${baseUrl}/auth`,
            data: body
        };
          const response = await axios(configurationObject);
          console.log(response.data);

        return response.data
    }
    catch (error){
        console.log(error)
        return []
    }
}
