import React, { Component } from 'react'
import { connect } from 'dva'

import {
  StyleSheet,
  ScrollView,
  View,
  Button,
  TouchableHighlight,
} from 'react-native'
import {
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Spinner,
} from 'native-base'

import { NavigationActions } from '../utils'
import { prefix } from '../config'

@connect(({ app }) => ({ ...app }))
class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  }

  getList = () => {
    this.props.dispatch({
      type: 'app/getList',
      payload: {},
    })
  }
  clear = () => {
    this.props.dispatch({
      type: 'app/clear',
      payload: {},
    })
  }
  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
  }
  render() {
    const { list } = this.props
    return (
      <ScrollView style={styles.wrap}>
        <View style={styles.container}>
          <Button title="get" onPress={this.getList} />
          <Button title="clear" onPress={this.clear} />
        </View>
        <View>
          <Spinner />
          <Spinner color="red" />
          <Spinner color="green" />
          <Spinner color="blue" />
        </View>
        <View>
          {list.length > 0 &&
            list.map(({ title, doctor, language, poster, id }) =>
              <TouchableHighlight key={id} onPress={this.gotoDetail}>
                <View>
                  <List>
                    <ListItem avatar>
                      <Left>
                        <Thumbnail source={{ uri: `${prefix}${poster}` }} />
                      </Left>
                      <Body>
                        <Text>{title}</Text>
                        <Text note>{doctor}</Text>
                      </Body>
                      <Right>
                        <Text note>{language}</Text>
                      </Right>
                    </ListItem>
                  </List>
                </View>
              </TouchableHighlight>
            )}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrap: {
    flex: 1,
    overflow: 'scroll',
  },
  icon: {
    width: '100%',
    height: '100',
  },
})

export default Login
