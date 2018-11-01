import React, { Component } from 'react'
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native'
import { Header, Body, Title, Right, Icon, Container, List } from 'native-base'
import { Actions } from 'react-native-router-flux'
import ListTeamItem from './ListTeamItem'

class ListTeam extends Component {
  state = { teams: [] }

  logout () {
    AsyncStorage.removeItem('token')
    Actions.login()
  }

  renderListTeamItem () {
    const { teams } = this.state 
    if (teams.length === 0) {
      return (
        <Text style={{ alignSelf: 'center', marginVertical: 200, fontSize: 20, color: '#006400' }}>
          Nemhum Time Disponível
        </Text>
      )
    }
    return teams.map(team => {
      return <ListTeamItem item={team} />
    })
  }

  render () {
    return (
      <Container>
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
        <List>
          { this.renderListTeamItem() }
        </List>
      </Container>
    )
  }

}

export default ListTeam