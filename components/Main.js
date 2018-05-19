import React from 'react';
import * as firebase from 'firebase';
import firebaseApp from '../base';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Provider, { Context } from '../context/Context';
import { Button } from './Button';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { StyleSheet, Text, View, Alert, ListView, ActivityIndicator } from 'react-native';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incomeFill: 50,
      expenseFill: 75,
      balanceFill: 90
    }
  }

  render() {
    return (
        <Provider>
            <Context.Consumer>
                {(context) => (
                    <View style={styles.container}>
                      <View style={styles.twoContainer}>
                        <AnimatedCircularProgress
                          size={125}
                          width={3}
                          fill={this.state.incomeFill}
                          tintColor="#55efc4"
                          onAnimationComplete={() => console.log('onAnimationComplete')}
                          backgroundColor="#fab1a0"
                          style={{flex: 1}}>
                          {
                            (fill) => (
                              <View style={styles.circleContainer}>
                                <Text style={styles.incomeCircle}>
                                  {context.formatPrice(context.state.incomeSum)}
                                </Text>
                                <Text style={styles.text}>INCOME</Text>
                              </View>
                            )
                          }
                        </AnimatedCircularProgress>
                        <AnimatedCircularProgress
                          size={125}
                          width={3}
                          fill={this.state.expenseFill}
                          tintColor="#ff7675"
                          onAnimationComplete={() => console.log('onAnimationComplete')}
                          backgroundColor="#fab1a0"
                          style={{flex: 1}}>
                          {
                            (fill) => (
                              <View style={styles.circleContainer}>
                                <Text style={styles.expenseCircle}>
                                  {context.formatPrice(context.state.expenseSum)}
                                </Text>
                                <Text style={styles.text}>EXPENSE</Text>
                              </View>
                            )
                          }
                        </AnimatedCircularProgress>
                      </View>
                      <AnimatedCircularProgress
                        size={220}
                        width={5}
                        fill={this.state.balanceFill}
                        tintColor="#74b9ff"
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="#fab1a0"
                        style={{flex: 1}}>
                        {
                          (fill) => (
                            <View style={styles.circleContainer}>
                              <Text style={styles.balance}>
                                {context.formatPrice(context.state.incomeSum - context.state.expenseSum)}
                              </Text>
                              <Text style={styles.text}>BALANCE</Text>
                            </View>
                          )
                        }
                      </AnimatedCircularProgress>
                    </View>
                )}
            </Context.Consumer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff0ed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  twoContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff0ed',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 35
  },
  circleContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  balance: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    color: '#7591af',
    fontSize: 35,
    fontWeight: "100"
  },
  incomeCircle: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    color: '#7591af',
    fontSize: 16,
    fontWeight: "100"
  },
  expenseCircle: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    color: '#7591af',
    fontSize: 16,
    fontWeight: "100"
  },
  text: {
    color: '#7591af',
    fontSize: 14,
    fontWeight: "100",
  },
});


export default Main;
