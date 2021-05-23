

import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Settings extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <View style={this.style.container} >
                <View style={this.style.oneLine}>
                    <Text style={this.style.Text}>PC-IP</Text>
                    <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => {
                        this.props.route.params.setState({pcIp: text}); 
                        AsyncStorage.setItem('pcIP', text);
                    }}
                    defaultValue={this.props.route.params.state.pcIp}
                    />
                </View>
            </View>
        )
    }

    style = StyleSheet.create({
        container: {
            flex:1,
            alignItems: "center",
            height: '100%',
            width: '100%'
        },
        Text: {
            fontSize: 20,
            justifyContent: "center"
        },
        oneLine: {
            flex: 1,
            flexDirection: "row"
        }
    });
}

