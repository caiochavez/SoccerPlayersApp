import React from 'react'
import { ListItem, Thumbnail, Left, Body, Text } from 'native-base'
import { Actions } from 'react-native-router-flux'

const ListTeamItem = ({ item }) => {
  return (
    <ListItem thumbnail onPress={() => Actions.detailsTeam({ team: item })}>
      <Left>
        <Thumbnail square source={{ uri: item.photoData }} />
      </Left>
      <Body>
        <Text>{item.name}</Text>
        <Text note numberOfLines={1}>{item.country}</Text>
      </Body>
    </ListItem>
  )
}

export default ListTeamItem