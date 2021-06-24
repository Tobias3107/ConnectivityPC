import React, { PureComponent } from 'react'
import { Text, StyleSheet, View, Dimensions, Alert } from 'react-native'
import Canvas from 'react-native-canvas'
import Processbar from './Processbar'

export default class MemCollection extends PureComponent {

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

    state = {
        loaded: false,
        memUsage: 0,
        memMax: 0,
        memPercentence: 0
    }

    render() {
        var memUsage = this.props.apiAll.mem?.used;
        var memMax = this.props.apiAll.mem?.total;
        var percentOfUsage = memUsage / memMax
        return (
            <View>
                <Text style={this.style.memPerce}>Memory Usage</Text>
                <Processbar width={this.props.width} percentage={percentOfUsage} lineColor={"#00ffff"} />
                <View style={{alignItems:"center"}}>
                    <View style={this.style.subtitle}>
                        <Text style={{width: "50%",textAlign: "left"}}>{Math.floor((this.props.apiAll.mem.used / this.props.apiAll.mem.total)*10000) /100}%</Text>
                        <Text style={{ width: "50%",textAlign: "right"}}>{Math.floor(this.props.apiAll.mem.used * 0.00000009313226)/100}
                        / {Math.floor(this.props.apiAll.mem.total * 0.00000009313226)*0.01} GiB</Text>
                    </View>
                </View>
            </View>
        )
    }
}