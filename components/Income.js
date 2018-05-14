import React from 'react';
import { StyleSheet, View, Text, ListView } from 'react-native';
import Provider, { Context } from '../context/Context';
import AddButton from './AddButton';
import ListItem from './ListItem';


class Income extends React.Component {
    renderItem(item) {
        return (
            <ListItem item={item} onPress={() => {}} />
          )
      }

    render() {
        return (
            <Provider>
                <Context.Consumer>
                    {(context) => (
                        <View style={styles.container}>
                            {/* <Text>{Object.keys(context.state.items)}</Text> */}
                            <ListView dataSource={context.state} renderRow={this.renderItem.bind(this)} />
                            {/* <Text onPress={() => console.log(context.state)}>Welcome to the ICON App!</Text> */}
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

export default Income;