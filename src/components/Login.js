import React, { Component } from 'react'
import  { Text, Image, View, TouchableOpacity, AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Content, Form, Item, Input, Icon, Button } from 'native-base'
import UserService from '../services/UserService'

class Login extends Component {
  state = { username: '', password: '' }

  onChangeUsername (username) {
    this.setState({ username })
  }

  onChangePassword (password) {
    this.setState({ password })
  }

  async onPressButton () {
    try {
      const { username, password } = this.state
      const res = (await UserService.signIn({ username, password })).data
      AsyncStorage.setItem('token', res.token)
      Actions.listTeam()
    } catch (err) {
      throw new Error(err)
    }
  }

  formIsValid () {
    let { username, password } = this.state
    return username !== '' && password !== ''
  }

  renderButton () {
    if (this.formIsValid()) {
      return (
        <Button rounded light onPress={this.onPressButton.bind(this)}>
          <Text style={{ paddingHorizontal: 50, fontSize: 18 }}>Entrar</Text>
        </Button>
      )
    } else {
      return (
        <Button rounded light onPress={this.onPressButton.bind(this)} disabled>
          <Text style={{ paddingHorizontal: 50, fontSize: 18 }}>Entrar</Text>
        </Button>
      )
    }
  }

  render () {
    return (
      <Container style={{ backgroundColor: '#006400' }}>
       <View style={{ alignSelf: 'center', paddingTop: 80 }}>
        <Image source={require('../../assets/logo.png')} style={{ height: 110, width: 140 }}/>
       </View>
       <View style={{ alignSelf: 'center' }}>
        <Text style={{ fontSize: 40, fontStyle: 'oblique', color:'white' }}>Soccer Players</Text>
       </View>
        <Content style={{ paddingVertical: 40, paddingHorizontal: 35 }}>
          <Form>
            <Item rounded style={{ marginBottom: 10 }}>
              <Icon name='person' style={{ marginLeft:  12, color: 'white' }} />
              <Input
              placeholder='Nome de usuário'
              placeholderTextColor='white'
              onChangeText={this.onChangeUsername.bind(this)}
              value={this.state.username} />
            </Item>
            <Item rounded last style={{ marginBottom: 10 }}>
              <Icon name='lock' style={{ color: 'white' }} />
              <Input
              placeholder='Senha'
              placeholderTextColor='white'
              onChangeText={this.onChangePassword.bind(this)}
              value={this.state.password}
              secureTextEntry />
            </Item>
            <Content style={{ alignSelf: 'center', marginTop: 5 }}>
              { this.renderButton() }
            </Content>
          </Form>
        </Content>
      </Container>
    )
  }

}

export default Login