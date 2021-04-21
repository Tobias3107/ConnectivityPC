import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'

export default class Settings extends Component {
    state = {
        ipValue: "172.30.1.35:3000"
    }

    onChangeText(text) {
        this.props.changeIpState(text);
    }
    render() {
        return (
            <View style={this.style.container} >
                <View style={this.style.oneLine}>
                    <Text style={this.style.Text}>PC-IP</Text>
                    <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeText(text)}
                    value={this.state.ipValue}
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
