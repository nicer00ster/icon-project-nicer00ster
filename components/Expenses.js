import React from 'react';
import ListExpense from './ListExpense';
import AddButton from './AddButton';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import Provider, { Context } from '../context/Context';

class Expenses extends React.Component {
    render() {
        return (
            <Provider>
                <Context.Consumer>
                    {(context) => (
                        <View style={styles.container}>
                            <Text>Welcome to the ICON {context.state.items} App!</Text>
                            <ListExpense />
                            <AddButton />
                        </View>
                    )}
                </Context.Consumer>
            </Provider> 
        )
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

export default Expenses;