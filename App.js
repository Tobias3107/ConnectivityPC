/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button
} from 'react-native';
import MemAnzeige from './components/MemAnzeige';
import StorageCollection from './components/StorageCollection';
import TachoAnzeige from './components/TachoAnzeige';
import TachoCollection from './components/TachoCollection';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.changeIpState = this.changeIpState.bind(this);

    this.AllInterval = setInterval(() => {
      try {
            rtnData = axios('http://'+ this.state.pcIp +'/api/ALL')
            .then(res => {
                data = res.data;
                this.setState({ apiAll: data, fsDisks: data.fsSize, loadedData: true});
                return true;
            }).catch(error => {
                console.log("No Connection");
                this.setState({loadedData: false});
                return;
            });
      } catch (error) {

      }
    }, 3000);
}

  state = {
    window: Dimensions.get("window"),
    screen: Dimensions.get("screen"),
    loadedData: false,
    apiAll: {},
    fsDisks: [],
    pcIp: ""
  }

  changeIpState = (ip) => {
    this.setState({
      pcIp: ip
    });
  }

  onChangeDimension = ({window, screen}) => {
    this.setState({ window, screen });
  }
  componentDidMount() {
    Dimensions.addEventListener("change", this.onChangeDimension);
    this.setupConfigData();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.onChangeDimension);
    clearInterval();
  }

  buttonPress = () => {
    this.props.navigation.navigate('Settings', {setState:state => this.setState(state), state: this.state});
  }

  setupConfigData = async () => {
    try {
      const pcIPValue = await AsyncStorage.getItem('pcIP')
      if(pcIPValue !== null) {
        this.setState({pcIp: pcIPValue})
      }
    } catch(e) {
      // error reading value
    }
  }

  render() {
    return (
      <>
      {this.state.loadedData ? (
        <View style={this.styles.container}>
          <TachoCollection style={this.styles.TachoColl} pcIp={this.state.pcIp} state={this.state}/>
          <MemAnzeige style={this.styles.MemColl} pcIp={this.state.pcIp} apiAll={this.state.apiAll}/>
          <StorageCollection style={this.styles.StorColl} pcIp={this.state.pcIp} state={this.state}/>
        </View>
      ) : 
          (
            <Text style={this.styles.noConText}>No Connection Found</Text>
          )}
        <View style={this.styles.SettingButton}>
            <Button
              onPress={this.buttonPress}
              title="Options"
              color="blue"
              />
          </View>
      </>
      )
  }
//<TachoCollection style={{width: '100%'}} />
  styles = StyleSheet.create({
    container: {
      width: '100%'
    },
    TachoColl: {

    },
    MemColl: {

    },
    SettingButton: {
      position: 'absolute',
      fontSize: 50,
      right:     10,
      bottom:      10,
    },
    noConText: {
      textAlign: "center",
      textAlignVertical: "center",
      height: "100%"
    }
  });

}