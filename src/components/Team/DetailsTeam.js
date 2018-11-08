import React, { Component } from 'react'
import { TouchableOpacity, Text, ScrollView, View } from 'react-native'
import { Container, Header, Body, Title, Left, Icon, Thumbnail, List, ListItem } from 'native-base'
import { Actions } from 'react-native-router-flux'

class DetailsTeam extends Component {

  renderPlayersToPosition (position) {
    const players = this.props.team.players.filter(player => player.position === position)
    return players.map(player => {
      return (
        <ListItem avatar>
          <Left>
            <Thumbnail small source={{ uri: player.photoData }} />
          </Left>
          <Body>
            <Text>{player.name} - {player.age} anos</Text>
            <Text>{player.nationality}</Text>
          </Body>
        </ListItem>
      )
    })
  }

  renderListPlayers () {
    const positions = [
      { title: 'GOLEIROS', name: 'goalkeeper' },
      { title: 'LATERAIS', name: 'side' },
      { title: 'ZAGUEIROS', name: 'defender' },
      { title: 'MEIAS', name: 'sock' },
      { title: 'ATACANTES', name: 'attacker' }
    ]
    return positions.map(position => {
      return (
        <List>
          <ListItem itemDivider>
            <Text>{position.title}</Text>
          </ListItem>
          { this.renderPlayersToPosition(position.name) }
        </List>
      )
    })
  }

  render () {
    const { team } = this.props
    return (
      <Container>
        <Header style={{ backgroundColor: '#006400' }} androidStatusBarColor='#006400'>
          <Left>
            <TouchableOpacity onPress={() => Actions.listTeam()}>
            <Icon name='arrow-back' style={{ color: 'white' }} />
            </TouchableOpacity>
          </Left>
          <Body style={{ flexDirection: 'row' }}>
            <View style={{paddingRight: 2 }}>
              <Thumbnail small source={{ uri: team.photoData }} style={{ paddingRight: 8 }} />
            </View>
            <View style={{ paddingLeft: 2 }}>
              <Title style={{ paddingLeft: 8 }}>{team.name}</Title>
            </View>
          </Body>
        </Header>
        <ScrollView>
          { this.renderListPlayers() }
        </ScrollView>
      </Container>
    )
  }

}

export default DetailsTeam