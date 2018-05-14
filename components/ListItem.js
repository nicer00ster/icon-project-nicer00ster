import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import Provider, { Context } from '../context/Context';

class ListItem extends React.Component {
  render() {
    return (
    <Provider>
        <Context.Consumer>
        {(context) => (
            <TouchableHighlight style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.itemText}>{this.props.item.number}</Text>
                </View>
            </TouchableHighlight>
        )}
        </Context.Consumer>
    </Provider> 
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        width: '100%',
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16,
    },
    itemText: {
        color: '#333',
        fontSize: 24,
    },
})

export default ListItem;