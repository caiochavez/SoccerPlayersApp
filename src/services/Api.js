import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://soccer-players.herokuapp.com'
  })
}