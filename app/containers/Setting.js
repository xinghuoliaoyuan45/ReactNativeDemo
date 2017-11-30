import React, { Component } from 'react'
import { StyleSheet, View, Image, Button, Text } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

@connect()
class Setting extends Component {
  static navigationOptions = {
    header: null,
    title: 'Setting',
    tabBarLabel: 'Setting',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/person.png')}
      />
    ),
  }

  gotoLogin = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Login' }))
  }

  gotoMap = () => {
    console.log('click')
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Customize',
        params: { name: 'Customize' },
      })
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Goto Login" onPress={this.gotoLogin} />
        <Button title="Goto Customize" onPress={this.gotoMap} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
})

export default Setting
