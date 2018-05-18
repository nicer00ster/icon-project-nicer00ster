import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View, Animated, ActivityIndicator, Image } from 'react-native';

class Landing extends React.Component {
  state = {
    fade: new Animated.Value(0),  // Initial value for opacity: 0
  }
  componentDidMount() {
    Animated.timing(
      this.state.fade,
      {
        toValue: 1,
        duration: 6500,
      }
    ).start();
  }
  render() {
    let { fade } = this.state;

    return (
      <Animated.View style={{flex: 1, alignItems: 'center', justifyContent: 'center', opacity: fade}}>
        <Text style={styles.text}>Coconut Cash</Text>
        <Text style={styles.textTwo}>Become mindful of your money</Text>
        <Image
          source={require('../static/coconuts.png')}
        />
        <ActivityIndicator size="large" color="#3dc1d3" />
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#333',
    fontSize: 32,
    fontWeight: "100"
  },
  textTwo: {
    color: '#333',
    fontSize: 18,
    fontWeight: "100",
    fontStyle: 'italic'
  },
})

export default Landing;
