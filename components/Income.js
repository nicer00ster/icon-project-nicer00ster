import React from 'react';
import { StyleSheet, View, Text, TextInput, ListView } from 'react-native';
import Provider, { Context } from '../context/Context';
import AddIncome from './AddIncome';
import ListIncome from './ListIncome';


class Income extends React.Component {
    renderItem(item) {
        return (
            <ListIncome item={item} onPress={() => {}} />
          )
      }

    render() {
        return (
            <Provider>
                <Context.Consumer>
                    {(context) => (
                        <View style={styles.container}>
                            <ListView
                              dataSource={context.state.incomeDataSource}
                              renderSeperator={(sectionId, rowId) => <View key={rowId} />}
                              renderRow={this.renderItem.bind(this)} />
                            <AddIncome />
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

export default Income;
