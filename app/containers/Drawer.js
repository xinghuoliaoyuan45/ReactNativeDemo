import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'native-base'

@connect()
export default class Drawer extends Component {
  static navigationOptions = {
    title: 'drawer',
  }

  render() {
    return (
      <View>
        <Text>drawer</Text>
      </View>
    )
  }
}
