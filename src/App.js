import React from 'react'
import { AsyncStorage } from 'react-native'
import Router from './Router'
import axios from 'axios'

const App = () => {
  const token = AsyncStorage.getItem('token')
  if (token) axios.defaults.headers.common['Authorization'] = token
  return (
    <Router/>
  )
}

export default App