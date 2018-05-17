import React from 'react';
import { StyleSheet, View, TouchableHighlight, TouchableOpacity, Text } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Provider, { Context } from '../context/Context';
import ModalSelector from 'react-native-modal-selector';

class ListExpense extends React.Component {
  constructor() {
    super();
    this.state = {
      category: ''
    }
  }
  render() {
    let index = 0;
    const data = [
        { key: index++, section: true, label: 'Income Type' },
        { key: index++, label: (
          <View>
            <Ionicons name={'ios-beer-outline'} size={45} color={'#3dc1d3'} />
            <Text>Entertainment</Text>
          </View>
        )},
        { key: index++, label: <Ionicons name={'ios-cafe-outline'} size={45} color={'#636e72'} /> },
        { key: index++, label: <Ionicons name={'ios-bus-outline'} size={45} color={'#a29bfe'} /> },
        { key: index++, label: <Ionicons name={'ios-game-controller-b-outline'} size={45} color={'#fdcb6e'} /> },
        { key: index++, label: 'Red Onions' },
        { key: index++, label: 'Red Potatoes' },
        { key: index++, label: 'Rhubarb' },
        { key: index++, label: 'Tomatoes' }
    ];
    return (
    <Provider>
        <Context.Consumer>
        {(context) => (
            <TouchableHighlight onPress={console.log(this.props)} style={styles.container}>
                <View style={styles.item}>
                  <ModalSelector
                      selectStyle={{borderColor: 'transparent'}}
                      data={data}
                      initValue={<Ionicons name={'ios-arrow-dropdown-outline'} size={45} color={'#81ecec'} />}
                      onChange={option => { this.setState({ category: option.label }) }} />
                      <View style={{flex: 2}}>
                        <Text style={styles.itemText}>{context.formatPrice(this.props.item.expenseNumber)}</Text>
                        <Text style={styles.labelText}>{this.state.category}</Text>
                      </View>
                    <TouchableOpacity onPress={() => context.editExpense(this.props.item.expenseNumber, this.props.item.expenseKey, this.props.item.type)} style={styles.icon}>
                      <EvilIcons name={'pencil'} size={45} color={'tomato'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => context.deleteExpense(this.props.item.expenseKey)} style={styles.icon}>
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
        padding: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    item: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderRightColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 3,
        borderRadius: 3,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16,
    },
    itemText: {
        flex: 4,
        color: '#333',
        marginLeft: 12,
        fontSize: 24,
    },
    labelText: {
      flex: 4,
      color: '#7591af',
      fontSize: 16,
      fontWeight: "100",
      marginLeft: 12,
    },
    icon: {
        flex: 1,
    }
})

export default ListExpense;
