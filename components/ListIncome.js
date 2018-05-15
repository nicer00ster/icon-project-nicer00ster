import React from 'react';
import { StyleSheet, View, TouchableHighlight, TouchableOpacity, Text } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Provider, { Context } from '../context/Context';

class ListIncome extends React.Component {
  render() {
    return (
    <Provider>
        <Context.Consumer>
        {(context) => (
            <TouchableHighlight onPress={console.log(this.props)} style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.itemText}>{context.formatPrice(this.props.item.incomeNumber)}</Text>
                    <TouchableOpacity onPress={() => context.deleteIncome(this.props.item.incomeKey)} style={styles.deleteItem}>
                      <EvilIcons name={'close-o'} size={45} color={'tomato'} />
                    </TouchableOpacity>
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
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    item: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16,
    },
    itemText: {
        flex: 3,
        color: '#333',
        marginLeft: 12,
        fontSize: 24,
    },
    deleteItem: {
        flex: 1,
    }
})

export default ListIncome;
