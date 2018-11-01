import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ListItem, Thumbnail, Left, Body, Text } from 'native-base'

const ListTeamItem = ({ item }) => {
  return (
    <ListItem thumbnail>
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