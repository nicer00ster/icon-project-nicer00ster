import React from 'react';
import * as firebase from 'firebase';
import firebaseApp from '../base';
import { ListView, Alert, AlertIOS } from 'react-native';
import Prompt from 'rn-prompt';
import {
  formatPrice,
  addIncome,
  deleteIncome,
  editIncome,
  addExpense,
  deleteExpense,
  editExpense
} from './contextFunctions';

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
            categoryText: ''
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
                expenseSum: parseInt(expenseTotal)
            });
        });

        incomeRef.on('value', (snap) => {
            const incomeItems = [];
            var incomeTotal = [];
            snap.forEach((child) => {
              var childValues = child.child('value').val();
              incomeTotal.push(childValues);
                incomeItems.push({
                  incomeSum: incomeTotal,
                  incomeNumber: child.child('value').val(),
                  incomeKey: child.key
                })
            });
            if(!incomeTotal.length) {
              return;
            } else if (incomeTotal) {
              incomeTotal = incomeTotal.reduce(function(a, b) { return a + b });
            }
            this.setState({
                incomeDataSource: this.state.incomeDataSource.cloneWithRows(incomeItems),
                incomeSum: parseInt(incomeTotal)
            });
        });
    }

  render() {
    const fill = Math.floor((this.state.incomeSum / this.state.expenseSum) * 10);
    return (
      <Context.Provider value={{
          state: this.state,
          fill: fill,
          formatPrice,
          addIncome,
          deleteIncome,
          editIncome,
          addExpense,
          deleteExpense,
          editExpense,
          tagIncome: (num, tag, key) => {
            const ref = firebase.database().ref('/income/' + key);
            this.setState({
              categoryText: tag
            });
            ref.set({
              value: parseInt(num),
              tag: this.state.categoryText
            });
          },
          tagExpense: (num, tag, key) => {
            const ref = firebase.database().ref('/expense/' + key);
            this.setState({
              categoryText: tag
            });
            ref.set({
              value: parseInt(num),
              tag: this.state.categoryText
            });
          }
      }}>
        {this.props.children}
      </Context.Provider>
    )
  }
}
