import axios from 'axios'

const accessToken = window.localStorage.getItem('sessionToken')

const request = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    token: accessToken ? accessToken : ''
  }
})

export default request