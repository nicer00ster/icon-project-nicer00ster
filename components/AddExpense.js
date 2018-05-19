import React from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { StyleSheet, TouchableOpacity, View, Text, Alert } from 'react-native';
import Prompt from 'rn-prompt';
import * as firebase from 'firebase';
import Provider, { Context } from '../context/Context';

class AddExpense extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            promptVisible: false,
        }
    }

    render() {
        return (
          <Provider>
              <Context.Consumer>
              {(context) => (
                <View style={styles.container}>
                  <Text style={styles.text}>Expense</Text>
                  <TouchableOpacity onPress={() => this.setState({ promptVisible: true })}>
                      <EvilIcons name={'plus'} size={125} color={'#fab1a0'} />
                  </TouchableOpacity>
                  <Prompt
                      title={`Add an expense amount`}
                      placeholder="Enter a number"
                      visible={ this.state.promptVisible }
                      onCancel={ () => this.setState({
                      promptVisible: false,
                      }) }
                      onSubmit={ (value) => {
                          context.addExpense(value)
                          this.setState({
                              promptVisible: false
                          })
                      } }/>
                </View>
              )}
              </Context.Consumer>
          </Provider>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    width: '100%',
    alignItems: 'center'
  },
  text: {
    color: '#333',
    marginLeft: 12,
    fontSize: 24,
    fontWeight: "100"
  },
})

export default AddExpense;
