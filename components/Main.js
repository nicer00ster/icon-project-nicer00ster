import React from 'react';
import * as firebase from 'firebase';
import firebaseApp from '../base';
import Expenses from './Expenses';
import Income from './Income';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Provider, { Context } from '../context/Context';
import { Button } from './Button';
import { createBottomTabNavigator } from 'react-navigation';
import { StyleSheet, Text, View, Alert, ListView } from 'react-native';


class Main extends React.Component {
  constructor(props) {
    super(props);

    const ref = firebase.app().database().ref();
    ref.once('value')
      .then(function(snap) {
        console.log(`snap.val()`, snap.val());
      });
  }

  resetFinances() {
      return firebase.database().ref().remove();
  }

  addSample() {
    const ref = firebase.app().database().ref();
      return ref.push(24234);
  }

  render() {
    return (
        <Provider>
            <Context.Consumer>
                {(context) => (
                    <View style={styles.container}>
                        <Text>Welcome to the ICON App!</Text>
                        <Button onPress={() => this.resetFinances()}>RESET</Button>
                        <Button onPress={() => this.addSample()}>ADD</Button>
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