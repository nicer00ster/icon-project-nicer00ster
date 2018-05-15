import React from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { TouchableOpacity, View, Alert } from 'react-native';
import Prompt from 'rn-prompt';
import * as firebase from 'firebase';

class AddIncome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            promptVisible: false,
        }
    }

    addIncome(num) {
        const ref = firebase.database().ref('/income');
        const parsed = parseInt(num);
        if(isNaN(parsed)) {
          Alert.alert(
            'Invalid value!',
            'Enter a number!',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
          return;
        } else {
          ref.push(parsed);
        }
      }

    render() {
        return (
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
                    this.addIncome(value)
                    this.setState({
                        promptVisible: false
                    })
                } }/>
            </View>
        )
    }
}

export default AddIncome;
