import React, { Component } from 'react'
import  { Text, Image, View, AsyncStorage, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Content, Form, Item, Input, Icon, Spinner } from 'native-base'
import UserService from '../services/UserService'

class Login extends Component {
  state = { username: '', password: '', loading: false, error: false }

  onChangeUsername (username) {
    this.setState({ username })
  }

  onChangePassword (password) {
    this.setState({ password })
  }

  async onPressButton () {
    try {
      this.setState({ loading: true })
      const { username, password } = this.state
      const res = (await UserService.signIn({ username, password })).data
      AsyncStorage.setItem('token', res.token)
      this.setState({ loading: false, error: false })
      Actions.listTeam()
    } catch (err) {
      this.setState({ loading: false, error: true })
      throw err
    }
  }

  formIsValid () {
    let { username, password } = this.state
    return username !== '' && password !== ''
  }

  renderButton () {
    const { loading } = this.state
    if (loading) return <Spinner color='white' size={60} />
    const { textStyle, buttonStyle } = style
    if (this.formIsValid()) {
      return (
        <TouchableOpacity style={buttonStyle} onPress={this.onPressButton.bind(this)}>
          <Text style={textStyle}>Entrar</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity style={[buttonStyle, { opacity: 0.5 }]} disabled>
          <Text style={textStyle}>Entrar</Text>
        </TouchableOpacity>
      )
    }
  }

  renderMsgError () {
    if (this.state.error) {
      return (
        <Text style={{ alignSelf: 'center', color: 'red', fontSize: 15 }}>
          Usuário ou Senha inválido(s)!
        </Text>
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
        <Text style={{ fontSize: 40, fontStyle: 'italic', color:'white' }}>Soccer Players</Text>
       </View>
        <Content style={{ paddingVertical: 40, paddingHorizontal: 35 }}>
          <Form>
            <Item rounded style={{ marginBottom: 10 }}>
              <Icon name='person' style={{ marginLeft:  12, color: 'white' }} />
              <Input
              style={{ color: '#FFFFFF' }}
              placeholder='Nome de usuário'
              placeholderTextColor='#C6C2C2'
              onChangeText={this.onChangeUsername.bind(this)}
              value={this.state.username} />
            </Item>
            <Item rounded last style={{ marginBottom: 10 }}>
              <Icon name='lock' style={{ color: 'white' }} />
              <Input
              style={{ color: '#FFFFFF' }}
              placeholder='Senha'
              placeholderTextColor='#C6C2C2'
              onChangeText={this.onChangePassword.bind(this)}
              value={this.state.password}
              secureTextEntry />
            </Item>
            { this.renderMsgError() }
            <Content style={{ flexDirection: 'column', alignSelf: 'center', marginTop: 5 }}>
              <View>
                { this.renderButton() }
              </View>
              <Text style={{ color: 'white', alignSelf: 'center', paddingVertical: 3}}>OU</Text>
              <View>
                <TouchableOpacity style={style.buttonStyle}>
                  <Text style={style.textStyle} onPress={() => Actions.createUser()}>Criar Conta</Text>
                </TouchableOpacity>
              </View>
            </Content>
          </Form>
        </Content>
      </Container>
    )
  }

}

const style = {
  textStyle: {
    alignSelf: 'center',
    color: '#006400',
    fontSize: 17,
    fontWeight: '600',
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5
  }
}

export default Login