import React, { Component } from 'react'
import { View, Image, Button, Text } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import styles from '../style/util'

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

  constructor(props) {
    super(props)
    this.state = {
      btns: [
        {
          title: 'gotoLogin',
          func: this.gotoLogin,
        },
        {
          title: 'gotoCustomize',
          func: this.gotoCustomize,
        },
        {
          title: 'gotoList',
          func: this.gotoList,
        },
      ],
    }
  }

  gotoLogin = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Login' }))
  }

  gotoCustomize = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Customize',
        params: { name: 'Customize' },
      })
    )
  }

  gotoList = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'List',
        params: { name: 'List' },
      })
    )
  }

  render() {
    const { btns } = this.state
    return (
      <View style={styles.container}>
        {btns.map(({ title, func }, i) => (
          <View style={styles.btn} key={i}>
            <Button title={title} onPress={func} />
          </View>
        ))}
      </View>
    )
  }
}

export default Setting
