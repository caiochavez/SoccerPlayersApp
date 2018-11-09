import React, { Component } from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'
import { Container, Header, Left, Icon, Title, Form, Item, Input, Spinner } from 'native-base'
import { Actions } from 'react-native-router-flux'
import ImagePicker from 'react-native-image-picker'

class CreateTeam extends Component {

  state = { name: '', country: '', photoData: null, loading: false }

  setName (name) {
    this.setState({ name })
  }
  
  setCountry (country) {
    this.setState({ country })
  }

  formIsValid () {
    const { name, country, photoData } = this.state
    return name !== '' && country !== '' & photoData !== null
  }

  renderButton () {
    if (this.state.loading) return <Spinner color='#006400' size={60} />
    const { buttonStyle, textStyle } = style
    if (this.formIsValid()) {
      return (
        <TouchableOpacity style={buttonStyle} onPress={this.createTeam.bind(this)}>
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

  createTeam () {
    console.log('Create Team')
  }

  showImagePicker () {
    const options = {
      title: 'Selecione a foto',
      cancelButtonTitle: 'Fechar',
      chooseFromLibraryButtonTitle: 'Escolha da biblioteca',
      takePhotoButtonTitle: 'Tirar Foto',
      storageOptions: { skipBackup: true, path: 'images' },
      mediaType: 'photo'
    }
    ImagePicker.showImagePicker(options, res => {
        const source = res.uri
        this.setState({ photoData: source })
    })
  }

  showSelectImage () {
    if (!this.state.photoData) {
      return (
        <TouchableOpacity onPress={() => this.showImagePicker()}>
          <Text style={{ fontWeight: 'bold', color: '#006400', fontSize: 18 }}>
            Selecione a foto
          </Text>
        </TouchableOpacity>
      )
    } else return <Image source={{ uri: this.state.photoData }} style={{ width: 200, height: 200 }} />
  }

  render () {
    return (
      <Container>
        <Header style={{ backgroundColor: '#006400' }} androidStatusBarColor='#006400'>
          <Left style={{ flexDirection: 'row', flex: 1 }}>
            <TouchableOpacity onPress={() => Actions.listTeam()} style={{ paddingRight: 8 }}>
              <Icon name='arrow-back' style={{ color: 'white' }} />
            </TouchableOpacity>
            <Title style={{ paddingLeft: 8 }}>Criar Time</Title>
          </Left>
        </Header>
        <Form style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
          <Item rounded style={{ marginBottom: 6 }}>
            <Input 
            placeholder='Nome'
            value={this.state.name}
            onChangeText={this.setName.bind(this)}/>
          </Item>
          <Item rounded style={{ marginBottom: 6 }}>
            <Input 
            placeholder='País'
            value={this.state.country}
            onChangeText={this.setCountry.bind(this)}/>
          </Item>
          <View style={{ alignSelf: 'center', marginVertical: 10 }}>
            { this.showSelectImage() }
          </View>
          <View>
            { this.renderButton() }
          </View>
        </Form>
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

export default CreateTeam