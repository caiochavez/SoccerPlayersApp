import React, { Component } from 'react'
import { TouchableOpacity, Text, View, AsyncStorage, ToastAndroid } from 'react-native'
import { Container, Header, Title, Left, Icon, Content, Form, Item, DatePicker, Input, Spinner } from 'native-base'
import { Actions } from 'react-native-router-flux'
import moment from 'moment'
import UserService from '../../services/UserService'

class CreateUser extends Component {

  state = { name: '', username: '', password: '', dateBirth: null, loading: false }

  setDateBirth (dateBirth) {
    this.setState({ dateBirth: moment(dateBirth).format('DD/MM/YYYY') })
  }
  onChangeName (name) {
    this.setState({ name })
  }

  onChangeUsername (username) {
    this.setState({ username })
  }

  onChangePassword (password) {
    this.setState({ password })
  }

  renderButton () {
    if (this.state.loading) return <Spinner color='#006400' size={60} />
    const { buttonStyle, textStyle } = style
    if (this.formIsValid()) {
      return (
        <TouchableOpacity style={buttonStyle} onPress={this.createUser.bind(this)}>
          <Text style={textStyle}>Salvar</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity style={[buttonStyle, { opacity: 0.5 }]} disabled>
          <Text style={textStyle}>Salvar</Text>
        </TouchableOpacity>
      )
    }
  }

  formIsValid () {
    let { name, username, password, dateBirth } = this.state
    return name !== '' && username !== '' && password !== '' && dateBirth !== null
  }

  async createUser () {
    try {
      this.setState({ loading: true })
      const { name, username, password, dateBirth } = this.state
      const res = (await UserService.create({ name, username, password, dateBirth })).data
      AsyncStorage.setItem('token', res.token)
      this.setState({ loading: false })
      Actions.listTeam()
    } catch (err) {
      this.setState({ loading: false })
      ToastAndroid.show('Dados Inválidos', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
      throw err
    }
  }

  

  render () {
    return (
      <Container>
        <Header style={{ backgroundColor: '#006400' }} androidStatusBarColor='#006400'>
          <Left style={{ flexDirection: 'row', flex: 1 }}>
            <TouchableOpacity onPress={() => Actions.login()} style={{ paddingRight: 8 }}>
              <Icon name='arrow-back' style={{ color: 'white' }} />
            </TouchableOpacity>
            <Title style={{ paddingLeft: 8 }}>Criar Conta</Title>
          </Left>
        </Header>
        <Form style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
          <Item rounded style={{ marginBottom: 6 }}>
            <Input
            placeholder='Nome Completo'
            value={this.state.name}
            onChangeText={this.onChangeName.bind(this)}/>
          </Item>
          <Item rounded style={{ marginBottom: 6 }}>
            <Input
            placeholder='Username'
            value={this.state.username}
            onChangeText={this.onChangeUsername.bind(this)}/>
          </Item>
          <Item rounded style={{ marginBottom: 6 }}>
            <Input
            placeholder='Senha'
            value={this.state.password}
            onChangeText={this.onChangePassword.bind(this)}
            secureTextEntry/>
          </Item>
          <DatePicker
            defaultDate={Date.now()}
            locale={'pt-br'}
            modalTransparent={false}
            animationType='fade'
            androidMode='default'
            placeHolderText='Selecione sua data de nascimento'
            textStyle={{ color: '#006400' }}
            placeHolderTextStyle={{ color: '#006400' }}
            onDateChange={this.setDateBirth.bind(this)} />
        </Form>
        <View>
          { this.renderButton() }
        </View>
      </Container>
    )
  }

}

const style = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#006400',
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5
  }
}

export default CreateUser