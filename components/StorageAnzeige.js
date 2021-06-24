import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, Alert } from 'react-native'
import Canvas from 'react-native-canvas'
import Progressbar from './Processbar'
export default class StorageAnzeige extends Component {
    style = StyleSheet.create({
        memPerce: {
            textAlign: "center"
        },
        subtitle: {
            flex: 1,
            flexDirection:"row",
            width: "75%",
            height: 200,
            alignItems: "center",
            margin: 10
        }
    })

    render() {
        var percentOfUsage = this.props.fsDisk.use / 100;
        return (
            <View>
                <Text style={this.style.memPerce}>{this.props.fsDisk?.fs} Usage</Text>
                <Progressbar width={this.props.width} percentage={percentOfUsage} lineColor={"#00ff00"} /> 
                <View style={{alignItems:"center"}}>
                    <View style={this.style.subtitle}>
                        <Text style={{width: "50%",textAlign: "left"}}>{Math.floor(this.props.fsDisk.use*100)/100}%</Text>
                        <Text style={{ width: "50%",textAlign: "right"}}>{Math.floor(this.props.fsDisk.used * 0.00000009313226)/100}
                        / {Math.floor(this.props.fsDisk.size * 0.00000009313226)*0.01} GiB</Text>
                    </View>
                </View>
            </View>
        )
    }
}
