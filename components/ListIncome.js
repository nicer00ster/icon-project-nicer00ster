import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet, View, TouchableHighlight, TouchableOpacity, Text, TextInput } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Provider, { Context } from '../context/Context';
import ModalSelector from 'react-native-modal-selector';

class ListIncome extends React.Component {
  constructor() {
    super();
    this.state = {
      category: <Ionicons name={'ios-arrow-dropdown-outline'} size={45} color={'#333'} />,
      categoryText: ''
    }
  }
  componentDidMount() {
    const ref = firebase.database().ref('/income/' + this.props.item.incomeKey);
    ref.once('value')
      .then((snap) => {
        this.setState({
          categoryText: snap.val().tag
        });
        switch(this.state.categoryText) {
          case 'Cash':
            this.setState({ category: <Ionicons name={'ios-cash-outline'} size={45} color={'#00b894'} /> })
            break;
          case 'Credit Card':
            this.setState({ category: <Ionicons name={'ios-card-outline'} size={45} color={'#ff7675'} /> })
            break;
          case 'Paycheck':
            this.setState({ category: <Ionicons name={'ios-calendar-outline'} size={45} color={'#0984e3'} /> })
            break;
          case 'Freelance':
            this.setState({ category: <Ionicons name={'ios-hammer-outline'} size={45} color={'#2d3436'} /> })
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
          label: 'Income Type'
        },
        { key: index++,
          labelText: 'Cash',
          label: <Ionicons name={'ios-cash-outline'} size={45} color={'#00b894'} />
        },
        { key: index++,
          labelText: 'Credit Card',
          label: <Ionicons name={'ios-card-outline'} size={45} color={'#ff7675'} />
        },
        { key: index++,
          labelText: 'Paycheck',
          label: <Ionicons name={'ios-calendar-outline'} size={45} color={'#0984e3'} />
        },
        { key: index++,
          labelText: 'Freelance',
          label: <Ionicons name={'ios-hammer-outline'} size={45} color={'#2d3436'} />
        },
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
                      initValue={this.state.category}
                      onChange={option => {
                        this.setState({
                          category: option.label,
                          categoryText: option.labelText
                        });
                        context.tagIncome(this.props.item.incomeNumber, option.labelText, this.props.item.incomeKey);
                      }} />
                  <View style={{flex: 2}}>
                    <Text style={styles.itemText}>{context.formatPrice(this.props.item.incomeNumber)}</Text>
                    <Text style={styles.labelText}>{this.state.categoryText}</Text>
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

export default ListIncome;
