import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native'
import { Header, Body, Title, Right, Icon, Container, List, Item, Input } from 'native-base'
import { Actions } from 'react-native-router-flux'
import ListTeamItem from './ListTeamItem'
import dataTeams from './data'

class ListTeam extends Component {
  state = { teams: dataTeams, searchText: '' }

  logout () {
    AsyncStorage.removeItem('token')
    Actions.login()
  }

  renderListTeamItem () {
    const { teams, searchText } = this.state
    if (searchText.length >= 3) {
      const teamsFiltered = this.searchTeams(searchText)
      if (teamsFiltered.length > 0) {
        return teamsFiltered.map(team => {
          return <ListTeamItem item={team} key={team.name} />
        })
      } else {
        return (
          <Text style={{ alignSelf: 'center', marginVertical: 200, fontSize: 20, color: '#006400' }}>
            Nemhum Time Disponível
          </Text>
        )
      }
    }
    else if (searchText.length === 0) {
      if (teams.length === 0) {
        return (
          <Text style={{ alignSelf: 'center', marginVertical: 200, fontSize: 20, color: '#006400' }}>
            Nemhum Time Disponível
          </Text>
        )
      } else {
        return teams.map(team => {
          return <ListTeamItem item={team} key={team.name} />
        })
      }
    } else {
      return teams.map(team => {
        return <ListTeamItem item={team} key={team.name} />
      })
    }
  }

  searchTeams (inputValue) {
    const value = inputValue.toLowerCase()
    const teamsFilter = this.state.teams.filter(team => {
      const teamLowerCase = team.name.toLowerCase()
      const resultSearch = teamLowerCase.search(value)
      return resultSearch === 0
    })
    return teamsFilter
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
        <View searchbar rounded>
          <Item>
            <Icon name='ios-search' />
            <Input placeholder='Buscar' onChangeText={value => this.setState({ searchText: value})} />
          </Item>
        </View>
        <ScrollView>
          <List>
            { this.renderListTeamItem() }
          </List>
        </ScrollView>
      </Container>
    )
  }

}

export default ListTeam