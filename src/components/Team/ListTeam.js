import React, { Component } from 'react'
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native'
import { Header, Body, Title, Right, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'

class ListTeam extends Component {
  logout () {
    AsyncStorage.removeItem('token')
    Actions.login()
  }

  render () {
    return (
      <View>
        <Header style={{ backgroundColor: '#006400' }} androidStatusBarColor='#006400'>
          <Body>
            <Title>Times</Title>
          </Body>
          <Right>
            <TouchableOpacity onPress={this.logout.bind(this)}>
              <Icon name='log-out' style={{ color: 'white' }} />
            </TouchableOpacity>
          </Right>
        </Header>
        <Text>List Team</Text>
      </View>
    )
  }
}

export default ListTeam