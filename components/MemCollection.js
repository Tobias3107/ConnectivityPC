import React, { PureComponent } from 'react'
import { Text, StyleSheet, View, Dimensions, Alert } from 'react-native'
import Canvas from 'react-native-canvas'
import axios from 'react-native-axios'

export default class MemCollection extends PureComponent {

    style = StyleSheet.create({
          memPerce: {
              textAlign: "center"
          }
    })

    state = {
        loaded: false,
        memUsage: 0,
        memMax: 0,
        memPercentence: 0
    }

    handleCanvas = (canvas) => {
        canvas.width = Dimensions.get('screen').width;
        canvas.height = 70;
        const context = canvas.getContext('2d');
        context.beginPath();

        // Background
        context.beginPath();
        context.strokeStyle = "#676767";
        context.lineWidth = 20;
        context.lineCap = "round";
        context.moveTo(50, 50);
        context.lineTo(Dimensions.get('screen').width-50, 50);
        context.stroke();
        context.restore();

        percentOfUsage = this.state.memUsage / this.state.memMax
        percentOfUsageWidth = (Dimensions.get('screen').width-100) * percentOfUsage;
        // Usage not working
        context.beginPath();
        context.strokeStyle = "#00ffff";
        context.lineWidth = 10;
        context.moveTo(50, 50);
        context.lineTo(percentOfUsageWidth+50, 50);
        context.stroke();
        context.restore();
        this._canvas = canvas;
    }

    constructor(props) {
        super(props)
        this.tachoInterval = setInterval(() => {
                axios.get('http://172.30.1.35:3000/api/ALL')
                .then(res => {
                    data = res.data;
                    arr = [];
                    this.setState({ memUsage: data.mem.used, memMax: data.mem.total, loaded: true });
                    
                }).catch(function(error) {
                    console.log(error);
                    clearInterval(this.tachoInterval);
                });    
                this.setState({ memPercentence: Math.floor((this.state.memUsage / this.state.memMax)*10000) /100 });
        }, 3000);

    }

    componentDidUpdate() {
        this.handleCanvas(this._canvas);
    }

    render() {
        return (
            <View>
                <Canvas ref={this.handleCanvas}/>
                <Text style={this.style.memPerce}>{this.state.memPercentence}%</Text>
            </View>
        )
    }
}
