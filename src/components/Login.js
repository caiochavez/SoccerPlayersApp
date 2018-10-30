import React, { Component } from 'react'
import  { Text, Image, View } from 'react-native'
import { Container, Content, Form, Item, Input, Icon, Grid, Col, Row } from 'native-base'

class Login extends Component {

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
            <Item rounded style={{ marginBottom: 6 }}>
              <Icon name='person' style={{ marginLeft: 12, color: 'white' }} />
              <Input placeholder='Nome de usuário' placeholderTextColor='white' />
            </Item>
            <Item rounded last style={{ marginBottom: 6 }}>
              <Icon name='lock' style={{ color: 'white' }} />
              <Input placeholder='Senha' placeholderTextColor='white' secureTextEntry />
            </Item>
          </Form>
        </Content>
      </Container>
    )
  }

}

export default Login