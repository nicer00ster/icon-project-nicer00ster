import React from 'react';
import * as firebase from 'firebase';
import firebaseApp from '../base';
import { ListView } from 'react-native';

// Create a context.
export const Context = React.createContext();

// Create provider component.
export default class Provider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            items: []
        }
    }
    componentDidMount() {
        const ref = firebaseApp.database().ref();
        ref.on('value', (snap) => {
            // this.setState({
            //     items: snap.val()
            // })
            const items = [];
            snap.forEach((child) => {
                items.push({
                    key: child.key,
                    number: child.val()
                })
            })
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
                // dataSource: this.state.dataSource.cloneWithRows([{ number: snap.val()}])
            })
        })
    }

  render() {
    return (
      <Context.Provider value={{
          state: this.state.dataSource
      }}>
        {this.props.children}
      </Context.Provider>
    )
  }
}