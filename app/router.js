import React, { PureComponent } from 'react'
import { BackHandler, Animated, Easing } from 'react-native'
import {
  StackNavigator,
  TabNavigator,
  DrawerNavigator,
  TabBarBottom,
  addNavigationHelpers,
  NavigationActions,
} from 'react-navigation'
import { connect } from 'react-redux'
import { Icon } from 'native-base'

import Login from './containers/Login'
import Home from './containers/Home'
import Setting from './containers/Setting'
import Detail from './containers/Detail'
import Customize from './containers/Customize'
import Drawer from './containers/Drawer'

const Tabbar = TabNavigator(
  {
    Home: { screen: Home },
    Setting: { screen: Setting },
  },
  {
    initialRouteName: 'Home',
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: true,
    lazyLoad: true,
  }
);

const App = StackNavigator(
  {
    Tabbar: { screen: Tabbar },
    Detail: { screen: Detail },
    Login: { screen: Login },
    Drawer: { screen: Drawer },
    Customize: { screen: Customize },
  },
  {
    initialRouteName: 'Tabbar',
    headerMode: 'float',
    mode: 'card',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps
        const { index } = scene

        const height = layout.initHeight
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        })

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        })
        return { opacity, transform: [{ translateY }] }
      },
    }),
  }
);

const DrawerView = DrawerNavigator({
  App: {
    screen: App,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Icon name="home"></Icon>
      ),
    },
  },
  Drawer: {
    screen: Drawer,
    navigationOptions: {
      drawerLabel: 'drawer',
      drawerIcon: ({ tintColor }) => (
        <Icon name="logo-apple"></Icon>
      ),
    },
  },
}, {
  contentOptions: {
    activeTintColor: '#e91e63',
  },
})

function getCurrentScreen(navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getCurrentScreen(route)
  }
  return route.routeName
}

@connect(({ router }) => ({ router }))
class Router extends PureComponent {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }

  /**
   * return: bool [true: 不返回主界面, false: 返回主界面]
   */
  backHandle = () => {
    const currentScreen = getCurrentScreen(this.props.router)
    if (currentScreen === 'Home' || currentScreen === 'Setting') {
      return false
    }
    this.props.dispatch(NavigationActions.back())
    return true
  }

  render() {
    const { dispatch, router } = this.props
    const navigation = addNavigationHelpers({ dispatch, state: router })
    return <DrawerView navigation={navigation} />
  }
}

export function routerReducer(state, action = {}) {
  return DrawerView.router.getStateForAction(action, state)
}

export default Router
