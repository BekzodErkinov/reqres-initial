import axios from 'axios'

const request = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'Salom': 'Alik',
    'Content-Type': 'application-json',
  }
})

export default request