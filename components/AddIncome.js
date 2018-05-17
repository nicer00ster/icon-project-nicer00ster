import React from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { TouchableOpacity, View, Alert } from 'react-native';
import Prompt from 'rn-prompt';
import * as firebase from 'firebase';
import Provider, { Context } from '../context/Context';

class AddIncome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            promptVisible: false,
        }
    }

    render() {
        return (
          <Provider>
              <Context.Consumer>
              {(context) => (
                <View>
                <TouchableOpacity onPress={() => this.setState({ promptVisible: true })}>
                    <EvilIcons name={'plus'} size={125} color={'#fab1a0'} />
                </TouchableOpacity>
                <Prompt
                    title={`Add an income amount`}
                    placeholder="Enter a number"
                    visible={ this.state.promptVisible }
                    onCancel={ () => this.setState({
                    promptVisible: false,
                    }) }
                    onSubmit={ (value) => {
                        context.addIncome(value)
                        this.setState({
                            promptVisible: false
                        })
                    } }/>
                </View>
              )}
              </Context.Consumer>
          </Provider>
        )
    }
}

export default AddIncome;
