import React from 'react'
import { AsyncStorage } from 'react-native'
import { Scene, Router, Actions } from 'react-native-router-flux'
import Login from './components/Login'
import ListTeam from './components/Team/ListTeam'

const userLogged = async () => {
  const token = await AsyncStorage.getItem('token')
  if (token) Actions.listTeam()
}

const RouterComponent = () => {
  return (
    <Router>
      <Scene key='root'>
        <Scene key='login' component={Login} hideNavBar initial></Scene>
        <Scene key='listTeam' component={ListTeam} title='Lista de Times'></Scene>
      </Scene>
    </Router>
  )
}

export default RouterComponent