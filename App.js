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
import axios from 'react-native-axios'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.changeIpState = this.changeIpState.bind(this);

    this.AllInterval = setInterval(() => {
            axios.get('http://'+ this.state.pcIp +'/api/ALL')
            .then(res => {
                data = res.data;
                this.setState({ apiAll: data, fsDisks: data.fsSize});
            }).catch(function(error) {
                console.log(error);
                clearInterval(this.tachoInterval);
            });
    }, 3000);
}

  state = {
    window: Dimensions.get("window"),
    screen: Dimensions.get("screen"),
    apiAll: {},
    fsDisks: [],
    pcIp: "192.168.2.117:3000"
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
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.onChangeDimension);
    clearInterval();
  }

  buttonPress = () => {
    this.props.navigation.navigate('Settings', {setState:state => this.setState(state), state: this.state});
  }

  render() {
    return (
      <>
        <View style={this.styles.container}>
          <TachoCollection style={this.styles.TachoColl} pcIp={this.state.pcIp} state={this.state}/>
          <MemAnzeige style={this.styles.MemColl} pcIp={this.state.pcIp} apiAll={this.state.apiAll}/>
          <StorageCollection style={this.styles.StorColl} pcIp={this.state.pcIp} state={this.state}/>
        </View>
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
    }
  });

}
/*
const App = () => {
  return (
    <>
        <View style={styles.container}>
          <TachoCollection style={{width: '100%'}} />
        </View>
    </>
  );
};


            <Button icon={
              <Icon
              name="fa-cog"
              size={15}
              color="white"
            />
            } title="Settings"  />
import { 
  Button
} from 'react-native-element';
import {
  Icon
} from 'react-native-vector-icons/FontAwesome';




*/

