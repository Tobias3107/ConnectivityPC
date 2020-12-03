import React, { Component } from 'react'
import { Text,StyleSheet, View } from 'react-native'
import Canvas from 'react-native-canvas'

export default class TachoAnzeigeCanvas extends Component {
    
    lineWidth = 10;

    styles = StyleSheet.create({
        card: {
            backgroundColor: "#eaeaea",
            borderWidth: 5,
            borderColor: "#202325",
            borderRadius: 6,
            marginTop: 16,
            paddingVertical: 8,
            width: 160,
            height: 160
        },
        line: {
            flex: 1,
            flexDirection: "row",
            width: "100%",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center"
        }, 
    })

    handleCanvas = (canvas) => {
        size = {
            x: 160,
            y: 70,
            r: 60
        }
        canvas.width = size.x;
        canvas.height = size.y;
        const context = canvas.getContext('2d');

        // Background Line
        context.beginPath();
        context.strokeStyle = "#676767";
        context.lineWidth = this.lineWidth;
        context.arc((size.x /2), ((size.y-10)+this.lineWidth), size.r, 1*Math.PI, (2)*Math.PI);
        context.stroke();
        context.restore();

        // Usage Line
        context.beginPath();
        //      CenterX, CenterY,Scale Start, End
        context.strokeStyle = "#00ffff";
        context.lineWidth = this.lineWidth;
        context.arc((size.x /2), ((size.y-10)+this.lineWidth), size.r,1*Math.PI,(1 + this.props.usage )*Math.PI);
        context.stroke();
        context.restore();

        // USAGE TEXT 

        context.font = "20px Arial";
        var txt = (this.props.usage*100) + "%";
        context.fillText(txt, (size.x /2)-20, ((size.y-10)+this.lineWidth));

    }

    render() {
        return (
            <View style={this.styles.card}>
                <Canvas ref={this.handleCanvas} />
                <View style={this.styles.line}>
                    <Text style={{ textAlign:"center", width: "50%" }} >Temp</Text>
                    <Text style={{ textAlign:"center", width: "50%" }}>{this.props.temp}°C</Text>
                </View>
                <Text style={{ textAlign:"center" }}>CPU-{this.props.cpuid}</Text>
            </View>
        )
    }
}
