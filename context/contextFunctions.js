import * as firebase from 'firebase';
import { Alert, AlertIOS } from 'react-native';

export function formatPrice(cents) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

export function addIncome(num) {
    const ref = firebase.database().ref('/income/');
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
        value: parsed
      });
    }
  }

export function deleteIncome(key) {
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
}

export function editIncome(num, key, type) {
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
          value: parseInt(num)
        });
      }
    },
    'plain-text',
    num.toString(),
    'numeric',
  );
}

export function tagIncome(num, tag, key) {
  const ref = firebase.database().ref('/income/' + key);
  this.setState({
    categoryText: tag
  });
  ref.set({
    value: parseInt(num),
    tag: this.state.categoryText
  });
}

export function addExpense(num) {
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
      value: parsed
    })
  }
}

export function deleteExpense(key) {
  const ref = firebase.database().ref('/expense/' + key);
  Alert.alert(
    'Deleting Expense',
    'Are you sure you want to delete this expense?',
    [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () => {
        ref.remove()
      }},
    ],
    { cancelable: false }
  )
}

export function editExpense(num, key) {
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
        ref.update({
          value: parseInt(num)
        });
      }
    },
    'plain-text',
    num.toString(),
    'numeric',
  );
}
