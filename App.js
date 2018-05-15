import React from 'react';
import * as firebase from 'firebase';
import firebaseApp from './base';
import Provider, { Context } from './context/Context';
import Expenses from './components/Expenses';
import Income from './components/Income';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Main from './components/Main';
import { Button } from './components/Button';
import { createBottomTabNavigator } from 'react-navigation';
import { StyleSheet, Text, View, Alert, ListView } from 'react-native';
console.disableYellowBox = true;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Main />
    );
  }
}

export default createBottomTabNavigator(
  {
    OVERVIEW: Main,
    INCOME: Income,
    EXPENSES: Expenses
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
