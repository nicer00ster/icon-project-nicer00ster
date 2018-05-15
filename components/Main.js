import React from 'react';
import * as firebase from 'firebase';
import firebaseApp from '../base';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Provider, { Context } from '../context/Context';
import { Button } from './Button';
import { createBottomTabNavigator } from 'react-navigation';
import { StyleSheet, Text, View, Alert, ListView, ActivityIndicator } from 'react-native';


class Main extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
        <Provider>
            <Context.Consumer>
                {(context) => (
                    <View style={styles.container}>
                        <Text onPress={() => console.log(context)}>Welcome to the ICON App!</Text>
                        <Text>
                          Balance: {context.formatPrice(context.state.incomeSum - context.state.expenseSum)}
                        </Text>
                        <Button onPress={() => context.resetFinances()}>RESET</Button>
                        <Button onPress={() => context.logData()}>LOG</Button>
                    </View>
                )}
            </Context.Consumer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default Main;
