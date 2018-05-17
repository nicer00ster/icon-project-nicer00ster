import React from 'react';
import * as firebase from 'firebase';
import firebaseApp from '../base';
import { ListView, Alert, AlertIOS } from 'react-native';
import Prompt from 'rn-prompt';

// Create a context.
export const Context = React.createContext();

// Create provider component.
export default class Provider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            fill: 0,
            type: '',
            expenseDataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            incomeDataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            expenseSum: 0,
            incomeSum: 0,
        }
    }
    componentDidMount() {
        const expenseRef = firebaseApp.database().ref('/expense');
        const incomeRef = firebaseApp.database().ref('/income');

        expenseRef.on('value', (snap) => {
            const expenseItems = [];
            var expenseTotal = [];
            // Loop through each value in our database
            snap.forEach((child) => {
              var childValues = child.child('value').val();
              expenseTotal.push(childValues);
                expenseItems.push({
                  expenseSum: expenseTotal,
                  expenseNumber: child.child('value').val(),
                  expenseType: child.child('type').val(),
                  expenseKey: child.key
                })
            });
            // If here is no total, display 0. Otherwise, reduce the sum of all values.
            if(!expenseTotal.length) {
              return;
            } else if (expenseTotal) {
              expenseTotal = expenseTotal.reduce(function(a, b) { return a + b });
            }
            this.setState({
                expenseDataSource: this.state.expenseDataSource.cloneWithRows(expenseItems),
                expenseSum: expenseTotal
            });
        });

        incomeRef.on('value', (snap) => {
            const incomeItems = [];
            var incomeTotal = [];
            // Loop through each value in our database
            snap.forEach((child) => {
              var childValues = child.child('value').val();
              incomeTotal.push(childValues);
                incomeItems.push({
                  incomeSum: incomeTotal,
                  incomeNumber: child.child('value').val(),
                  incomeType: child.child('type').val(),
                  incomeKey: child.key
                })
            });
            // If here is no total, display 0. Otherwise, reduce the sum of all values.
            if(!incomeTotal.length) {
              return;
            } else if (incomeTotal) {
              incomeTotal = incomeTotal.reduce(function(a, b) { return a + b });
            }
            this.setState({
                incomeDataSource: this.state.incomeDataSource.cloneWithRows(incomeItems),
                incomeSum: incomeTotal
            });
        });
    }

  render() {
    const fill = Math.floor((this.state.incomeSum / this.state.expenseSum) * 10);
    return (
      <Context.Provider value={{
          state: this.state,
          fill: fill,
          formatPrice: (cents) => {
            return (cents / 100).toLocaleString("en-US", {
              style: "currency",
              currency: "USD"
            });
          },
          resetFinances: () => {
            firebase.database().ref().remove();
              return this.state.sum = 0;
          },
          logData: () => {
            console.log(fill);
          },
          addIncome: (num) => {
              const ref = firebase.database().ref('/income');
              const parsed = parseInt(num);
              if(isNaN(parsed)) {
                Alert.alert(
                  'Invalid value!',
                  'Enter a number!',
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )
                return;
              } else {
                ref.push({
                  value: parsed,
                  type: 'Beer'
                });
              }
            },
          deleteIncome: (key) => {
            const ref = firebase.database().ref('/income/' + key);
            Alert.alert(
              'Deleting Income',
              'Are you sure you want to delete this income?',
              [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => ref.remove()},
              ],
              { cancelable: false }
            )
          },
          editIncome: (num, key, type) => {
            const ref = firebase.database().ref('/income/' + key);
            AlertIOS.prompt(
              'Edit Income',
              'Enter a value',
              num => {
                if(isNaN(num)) {
                  Alert.alert(
                    'Invalid value!',
                    'Enter a number!',
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                  )
                  return;
                } else {
                  ref.set({
                    value: parseInt(num),
                    // type
                  });
                }
              },
              'plain-text',
              num.toString(),
              'numeric',
            );
          },
          addExpense: (num) => {
            const ref = firebase.database().ref('/expense/');
            const parsed = parseInt(num);
            if(isNaN(parsed)) {
              Alert.alert(
                'Invalid value!',
                'Enter a number!',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
              return;
            } else {
              ref.push({
                value: parsed,
                type: 'Beer'
              })
            }
          },
          deleteExpense: (key) => {
            const ref = firebase.database().ref('/expense/' + key);
            Alert.alert(
              'Deleting Expense',
              'Are you sure you want to delete this expense?',
              [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => ref.remove()},
              ],
              { cancelable: false }
            )
          },
          editExpense: (num, key, type) => {
            const ref = firebase.database().ref('/expense/' + key);
            AlertIOS.prompt(
              'Edit Expense',
              'Enter a value',
              num => {
                if(isNaN(num)) {
                  Alert.alert(
                    'Invalid value!',
                    'Enter a number!',
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                  )
                  return;
                } else {
                  ref.set({
                    value: parseInt(num),
                    // type
                  });
                }
              },
              'plain-text',
              num.toString(),
              'numeric',
            );
          }
      }}>
        {this.props.children}
      </Context.Provider>
    )
  }
}
