import React, { Component } from 'react'
import { Text, View } from 'react-native'
import StorageAnzeige from './StorageAnzeige';

export default class StorageCollection extends Component {
    state = {
        loaded: false,
        fsDisks: []
    }
    
    render() {
        return (
            <View>
                {
                    this.props.state.fsDisks.map((disk, index) => 
                    <StorageAnzeige fsDisk={disk} key={index}/>)
                }
            </View>
        )
    }
}
