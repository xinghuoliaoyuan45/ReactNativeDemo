import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native'
import { connect } from 'react-redux'
import { Item, Input, Icon, Button } from 'native-base'
import { NavigationActions } from 'react-navigation'
import { createAction } from '../utils'

@connect(({ app }) => ({ ...app }))
class Login extends Component {
  static navigationOptions = {
    title: 'Login',
    header: null,
  }

  onLogin = () => {
    this.props.dispatch(createAction('app/login')())
  }

  render() {
    const { fetching } = this.props
    return (
      <View style={styles.container}>
        {fetching ? (
          <ActivityIndicator />
        ) : (
          [
            <Item regular key="person" style={styles.item}>
              <Icon active name="person" />
              <Input placeholder="请输入手机号" />
            </Item>,
            <Item regular key="password" style={styles.item}>
              <Icon active name="lock" />
              <Input placeholder="请输入密码" />
            </Item>,
            <Button
              block
              info
              onPress={this.onLogin}
              key="login"
              style={styles.item}
            >
              <Text>登录</Text>
            </Button>,
          ]
        )}
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
  item: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
})

export default Login
