

import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import VersionNumber from 'react-native-version-number';

export default class Settings extends Component {
    constructor() {
        super();
    }
    
    render() {

        return (
            <View style={this.style.container} >
                <View style={this.style.oneLine, {marginBottom: 10}}>
                    <Text style={this.style.TextMoreLine}>Settings</Text>
                </View>
                <View style={this.style.oneLine}>
                    <Text style={this.style.Text}>PC-IP</Text>
                    <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "50%", textAlign: "center" }}
                    onChangeText={text => {
                        this.props.route.params.setState({pcIp: text}); 
                        AsyncStorage.setItem('pcIP', text);
                    }}
                    defaultValue={this.props.route.params.state.pcIp}
                    />
                </View>
                <View>
                    <View style={this.style.oneLine, {marginTop: 10}}>
                        <Text style={this.style.TextMoreLine}>About</Text>
                    </View>
                    <View style={this.style.oneLine}>
                        <Text style={this.style.Text}>Version</Text>
                        <Text style={this.style.Text}>{VersionNumber.appVersion}</Text>
                    </View>
                </View>
            </View>
        )
    }

    style = StyleSheet.create({
        container: {
            alignItems: "center",
            height: '100%',
            margin: 10
        },
        Text: {
            fontSize: 20,
            textAlignVertical: "center",
            textAlign: "center",
            justifyContent: "center",
            height: 40,
            marginRight: 10,
            width: "50%"
        },
        TextMoreLine: {
            fontSize: 20,
            textAlignVertical: "center",
            textAlign: "center",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
            width: "100%"
        },
        oneLine: {
            flexDirection: "row"
        }
    });
}

