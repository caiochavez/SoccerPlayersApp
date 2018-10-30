import React from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import Login from './components/Login'

const RouterComponent = () => {
  return (
    <Router>
      <Scene key='root'>
        <Scene key='login' component={Login} hideNavBar></Scene>
      </Scene>
    </Router>
  )
}

export default RouterComponent