import React from 'react';
import { StyleSheet, View, Text, ListView } from 'react-native';
import Provider, { Context } from '../context/Context';
import AddExpense from './AddExpense';
import ListExpense from './ListExpense';


class Expenses extends React.Component {
    renderItem(item, sectionID ,rowID) {
        return (
            <ListExpense item={item} rowID={rowID} sectionID={sectionID} onPress={() => {}} />
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
      backgroundColor: '#fff0ed',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Expenses;
