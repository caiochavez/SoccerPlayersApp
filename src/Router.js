import React from 'react'
import { AsyncStorage } from 'react-native'
import { Scene, Router, Actions } from 'react-native-router-flux'
import Login from './components/Login'
import ListTeam from './components/Team/ListTeam'

const tokenExist = async () => {
  const token = await AsyncStorage.getItem('token')
  return token
}

const userLogged = async () => {
  const token = await tokenExist()
  if (token) Actions.listTeam()
}

const verifyUserLogged = async () => {
  const token = await tokenExist()
  if (!token) Actions.login()
}

const RouterComponent = () => {
  return (
    <Router>
      <Scene key='root'>
        <Scene key='login' component={Login} onEnter={userLogged()} hideNavBar initial />
        <Scene key='listTeam' component={ListTeam} hideNavBar onEnter={verifyUserLogged()} />
      </Scene>
    </Router>
  )
}

export default RouterComponent