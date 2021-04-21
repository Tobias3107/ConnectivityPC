import React, { Component } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import TachoAnzeige from './TachoAnzeige'
import axios from 'react-native-axios'

export default class TachoCollection extends Component {

    styles = StyleSheet.create({
        Collection: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 20,
            flexWrap: "wrap",
        },
        Tacho: {
        }
    })

    state = {
        loaded: false,
        Tachos: [
        ]
    }
    constructor(props) {
        super(props)
        this.tachoInterval = setInterval(() => {
                axios.get('http://172.30.1.35:3000/api/cpuData')
                .then(res => {
                    data = res.data;
                    arr = [];
                    data.temp.cores.map?.((tempa, index) => {
                        arr.push({
                            cpuid: index,
                            usage: data.usage,
                            temp: tempa
                        });
                    });
                    this.setState({ Tachos: arr, loaded: true });
                }).catch(function(error) {
                    Alert.alert(error);
                    console.log(error);
                    clearInterval(this.tachoInterval);
                });    
        }, 3000);
    }

    componentWillUnmount() {
        clearInterval();
    }

    render() {
        return (
            <ScrollView style={{ height: "50%" }}>
                <View style={this.styles.Collection}>
                    {
                        this.state.Tachos.map((Tacho, index) => 
                        <TachoAnzeige style={this.styles.Tacho} key={Tacho.cpuid} cpuid={Tacho.cpuid} usage={ Tacho.usage } temp={ Tacho.temp}/>)
                    }
                </View>
            </ScrollView>
        )
    }
}
