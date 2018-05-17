import React from 'react';
import { StyleSheet, View, TouchableHighlight, TouchableOpacity, Text, TextInput } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Provider, { Context } from '../context/Context';
import ModalSelector from 'react-native-modal-selector';

class ListIncome extends React.Component {
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
        { key: index++, label: <Ionicons name={'ios-cash-outline'} size={45} color={'#00b894'} onPress={() => this.setState({ category: 'Cash' })} /> },
        { key: index++, label: <Ionicons name={'ios-card-outline'} size={45} color={'#ff7675'} /> },
        { key: index++, label: 'Radishes' },
        { key: index++, label: 'Radicchio' },
        { key: index++, label: 'Red Onions' },
        { key: index++, label: 'Red Potatoes' },
        { key: index++, label: 'Rhubarb' },
        { key: index++, label: 'Tomatoes' }
    ];
    return (
    <Provider>
        <Context.Consumer>
        {(context) => (
            <View onPress={console.log(this.props)} style={styles.container}>
                <View style={styles.item}>
                  <ModalSelector
                      selectStyle={{borderColor: 'transparent'}}
                      data={data}
                      initValue={<Ionicons name={'ios-arrow-dropdown-outline'} size={45} color={'#81ecec'} />}
                      onChange={option => { this.setState({ category: option.label }) }} />
                  <View style={{flex: 2}}>
                    <Text style={styles.itemText}>{context.formatPrice(this.props.item.incomeNumber)}</Text>
                    <Text style={styles.labelText}>{this.state.category}</Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => context.editIncome(this.props.item.incomeNumber, this.props.item.incomeKey, this.props.item.type)} style={styles.icon}>
                      <EvilIcons name={'pencil'} size={45} color={'tomato'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => context.deleteIncome(this.props.item.incomeKey)} style={styles.icon}>
                      <EvilIcons name={'close-o'} size={45} color={'tomato'} />
                    </TouchableOpacity>
                  </View>
                </View>
            </View>
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

export default ListIncome;
