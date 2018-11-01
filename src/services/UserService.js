import Api from './Api'

export default {
  signIn (params) {
    return Api().post('/signin', params)
  }
}