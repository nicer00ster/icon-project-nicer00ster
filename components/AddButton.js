import React from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { TouchableOpacity, View } from 'react-native';
import Prompt from 'rn-prompt';
import * as firebase from 'firebase';

class AddButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            promptVisible: false,
        }
    }

    addExpense(num) {
        const ref = firebase.app().database().ref();
          return ref.push(num);
      }


    render() {
        return (
            <View>
            <TouchableOpacity onPress={() => this.setState({ promptVisible: true })}>
                <EvilIcons name={'plus'} size={125} color={'#fab1a0'} />
            </TouchableOpacity>
            <Prompt
                title={`Add an expense`}
                placeholder="Enter a number"
                visible={ this.state.promptVisible }
                onCancel={ () => this.setState({
                promptVisible: false,
                }) }
                onSubmit={ (value) => {
                    this.addExpense(value)
                    this.setState({
                        promptVisible: false
                    })
                } }/>
            </View>
        )
    }
}

export default AddButton;