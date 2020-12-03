import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import TachoAnzeige from './TachoAnzeige'

export default class TachoCollection extends Component {

    styles = StyleSheet.create({
        Collection: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 20,
            flexWrap: "wrap",
            height: "100%"
        },
        Tacho: {
        }
    })

    state = {
        Tachos: [
            {
                cpuid: -1,
                temp: 200,
                usage: 2
            }
        ]
    }

    componentDidMount() {
        fetch('http://172.30.1.35:3000/api/temp').then((res) => {
            return res.json();
        }).then((data) => {
            arr = [];
            data.map?.((data, index) => {
                arr.push({
                    cpuid: index,
                    usage: data.usage,
                    temp: data.temp
                });
            })
            this.setState({ Tachos: arr });
        })
    }

    render() {
        return (
            <ScrollView style={{ height: "100%" }}>
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
