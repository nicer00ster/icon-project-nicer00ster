import React from 'react';
import { StyleSheet, View, Text, ListView } from 'react-native';
import Provider, { Context } from '../context/Context';
import AddExpense from './AddExpense';
import ListExpense from './ListExpense';


class Expenses extends React.Component {
    renderItem(item) {
        return (
            <ListExpense item={item} onPress={() => {}} />
          )
      }

    render() {
        return (
            <Provider>
                <Context.Consumer>
                    {(context) => (
                        <View style={styles.container}>
                            <ListView
                              dataSource={context.state.expenseDataSource}
                              renderSeperator={(sectionId, rowId) => <View key={rowId} />}
                              renderRow={this.renderItem.bind(this)} />
                              <Text>EXPENSES</Text>
                            <AddExpense />
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
      marginTop: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Expenses;
