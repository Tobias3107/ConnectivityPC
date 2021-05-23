import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, Alert } from 'react-native'
import Canvas from 'react-native-canvas'

export default class StorageAnzeige extends Component {
    style = StyleSheet.create({
        memPerce: {
            textAlign: "center"
        },
        subtitle: {
            width: "75%",
            flex: 1,
            flexDirection:"row",
            alignItems: "center",
            margin: 10
        }
    })

    handleCanvas = (canvas) => {
        if(!canvas) return;
        canvas.width = Dimensions.get('screen').width;
        canvas.height = 30;
        const context = canvas.getContext('2d');
        context.beginPath();

        // Background
        context.beginPath();
        context.strokeStyle = "#676767";
        context.lineWidth = 20;
        context.lineCap = "round";
        context.moveTo(50, 20);
        context.lineTo(Dimensions.get('screen').width-50, 20);
        context.stroke();
        context.restore();

        percentOfUsage = this.props.fsDisk.use / 100;
        percentOfUsageWidth = (Dimensions.get('screen').width-100) * percentOfUsage;
        // Usage not working
        context.beginPath();
        context.strokeStyle = "#00ff00";
        context.lineWidth = 10;
        context.moveTo(50, 20);
        context.lineTo(percentOfUsageWidth+50, 20);
        context.stroke();
        context.restore();
        this._canvas = canvas;
    }

    componentDidUpdate() {
        this.handleCanvas(this._canvas);
    }

    render() {
        return (
            <View>
                <Text style={this.style.memPerce}>{this.props.fsDisk.fs} Usage</Text>
                <Canvas ref={this.handleCanvas}/>
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
