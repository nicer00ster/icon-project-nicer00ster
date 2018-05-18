import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet, View, TouchableHighlight, TouchableOpacity, Text } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Provider, { Context } from '../context/Context';
import ModalSelector from 'react-native-modal-selector';

class ListExpense extends React.Component {
  constructor() {
    super();
    this.state = {
      category: <Ionicons name={'ios-arrow-dropdown-outline'} size={45} color={'#333'} />,
      categoryText: ''
    }
  }
  componentDidMount() {
    const ref = firebase.database().ref('/expense/' + this.props.item.expenseKey);
    ref.once('value')
      .then((snap) => {
        this.setState({
          categoryText: snap.val().tag
        });
        switch(this.state.categoryText) {
          case 'Sweets & Treats':
            this.setState({ category: <Ionicons name={'ios-ice-cream-outline'} size={45} color={'#fd79a8'} /> })
            break;
          case 'Bills':
            this.setState({ category: <Ionicons name={'ios-book-outline'} size={45} color={'#00b894'} /> })
            break;
          case 'Academia':
            this.setState({ category: <Ionicons name={'ios-school-outline'} size={45} color={'#6c5ce7'} /> })
            break;
          case 'Transportation':
            this.setState({ category: <Ionicons name={'ios-train-outline'} size={45} color={'#0984e3'} /> })
            break;
          case 'Medical':
            this.setState({ category: <Ionicons name={'ios-medkit-outline'} size={45} color={'#d63031'} /> })
            break;
          case 'Entertainment':
            this.setState({ category: <Ionicons name={'ios-beer-outline'} size={45} color={'#3dc1d3'} /> })
            break;
          case 'Coffee':
            this.setState({ category: <Ionicons name={'ios-cafe-outline'} size={45} color={'#636e72'} /> })
            break;
          default:
            this.setState({ category: <Ionicons name={'ios-arrow-dropdown-outline'} size={45} color={'#333'} /> })
        }
    });
  }
  render() {
    let index = 0;
    const data = [
        { key: index++,
          section: true,
          label: 'Expense Category'
        },
        { key: index++,
          labelText: 'Academia',
          label: <Ionicons name={'ios-school-outline'} size={45} color={'#6c5ce7'} />
        },
        { key: index++,
          labelText: 'Transportation',
          label: <Ionicons name={'ios-train-outline'} size={45} color={'#0984e3'} />
        },
        { key: index++,
          labelText: 'Bills',
          label: <Ionicons name={'ios-book-outline'} size={45} color={'#00b894'} />
        },
        { key: index++,
          labelText: 'Medical',
          label: <Ionicons name={'ios-medkit-outline'} size={45} color={'#d63031'} />
        },
        { key: index++,
          labelText: 'Entertainment',
          label: <Ionicons name={'ios-beer-outline'} size={45} color={'#3dc1d3'} />
        },
        { key: index++,
          labelText: 'Coffee',
          label: <Ionicons name={'ios-cafe-outline'} size={45} color={'#636e72'} />
        },
        { key: index++,
          labelText: 'Sweets & Treats',
          label: <Ionicons name={'ios-ice-cream-outline'} size={45} color={'#fd79a8'} />
        },
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
                      initValue={this.state.category}
                      onChange={option => {
                        this.setState({
                          category: option.label,
                          categoryText: option.labelText
                        });
                        context.tagExpense(this.props.item.expenseNumber, option.labelText, this.props.item.expenseKey);
                      }} />
                      <View style={{flex: 2}}>
                        <Text style={styles.itemText}>{context.formatPrice(this.props.item.expenseNumber)}</Text>
                        <Text style={styles.labelText}>{this.state.categoryText}</Text>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => context.editExpense(this.props.item.expenseNumber, this.props.item.expenseKey, this.props.item.type)} style={styles.icon}>
                          <EvilIcons name={'pencil'} size={45} color={'tomato'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => context.deleteExpense(this.props.item.expenseKey)} style={styles.icon}>
                          <EvilIcons name={'close-o'} size={45} color={'tomato'} />
                        </TouchableOpacity>
                      </View>
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
        fontWeight: "100"
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
