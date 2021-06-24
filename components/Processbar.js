import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Canvas from 'react-native-canvas'

export default class Processbar extends Component {


    handleCanvas = (canvas) => {
        if(!canvas) return;
        var {width, percentage, lineColor} = this.props;


        canvas.width = width;
        canvas.height = 30;
        const context = canvas.getContext('2d');
        context.beginPath();

        // Background
        context.beginPath();
        context.strokeStyle = "#676767";
        context.lineWidth = 20;
        context.lineCap = "round";
        context.moveTo(50, 20);
        context.lineTo(width-50, 20);
        context.stroke();
        context.restore();

        var percentOfUsageWidth = (width-100) * percentage;
        // Usage not working
        context.beginPath();
        context.strokeStyle = lineColor;
        context.lineWidth = 10;
        context.moveTo(50, 20);
        context.lineTo(percentOfUsageWidth+50, 20);
        context.stroke();
        context.restore();
        this._canvas = canvas;
    }

    componentDidUpdate() {
        this.handleCanvas(this._canvas)
    }

    render() {
        return (
            <Canvas ref={this.handleCanvas} />
        )
    }
}
