import React from 'react';
import * as firebase from 'firebase';
import firebaseApp from './base';
import Provider, { Context } from './context/Context';
import Expenses from './components/Expenses';
import Income from './components/Income';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Main from './components/Main';
import Landing from './components/Landing';
import { Button } from './components/Button';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { StyleSheet, Text, View, Alert, Animated, ListView, MaskedViewIOS } from 'react-native';
console.disableYellowBox = true;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingScreen: false
    }
  }

  render() {
    let that = this;
    setTimeout(function() {
      that.setState({ loadingScreen: true })
    }, 6500);
    if(!this.state.loadingScreen) {
      return <Landing />
    } else {
      return (
        <Main />
      )
    }
  }
}


const Root = createBottomTabNavigator(
  {
    OVERVIEW: { screen: App },
    INCOME: { screen: Income },
    EXPENSES: { screen: Expenses }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if(routeName === 'OVERVIEW') {
          iconName = 'heart';
        } else if (routeName === 'INCOME') {
          iconName = 'chart';
        } else if (routeName === 'EXPENSES') {
          iconName = 'exclamation';
        }
        return <EvilIcons name={iconName} size={35} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#0984e3',
      inactiveTintColor: 'gray',
      labelStyle: {
        fontSize: 12.5
      },
      style: {
        backgroundColor: '#fab1a0',
        height: 75
      }
  }
}
);


export default createStackNavigator(
  {
    Root
  },
  {
    navigationOptions: {
      headerTitle: 'Coconut Cash',
      headerTintColor: 'gray',
      headerStyle: {
        backgroundColor: '#fab1a0',
        height: 75
      },
      headerTitleStyle: {
        color: '#333',
        fontSize: 24,
        fontWeight: "100"
      }
    }
  }
)
