import React from 'react';
import * as firebase from 'firebase';
import firebaseApp from '../base';
import { ListView } from 'react-native';

// Create a context.
export const Context = React.createContext();

// Create provider component.
export default class Provider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
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
              var childValues = child.val();
              expenseTotal.push(childValues);
                expenseItems.push({
                  expenseSum: expenseTotal,
                  expenseNumber: child.val(),
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
              var childValues = child.val();
              incomeTotal.push(childValues);
                incomeItems.push({
                  incomeSum: incomeTotal,
                  incomeNumber: child.val(),
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
    return (
      <Context.Provider value={{
          state: this.state,
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
            console.log(this.state);
          },
          deleteIncome: (key) => {
            const ref = firebase.database().ref('/income/' + key);
            ref.remove();
          },
          deleteExpense: (key) => {
            const ref = firebase.database().ref('/expense/' + key);
            ref.remove();
          }
      }}>
        {this.props.children}
      </Context.Provider>
    )
  }
}
