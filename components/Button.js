import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{ children }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        padding: 15,
        width: '50%',
        backgroundColor: '#fab1a0',
        borderWidth: 1,
        borderColor: '#e17055',
        borderRadius: 3,
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 18,
    }
})

export { Button };