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
import MemCollection from './components/MemCollection';
import TachoAnzeige from './components/TachoAnzeige';
import TachoCollection from './components/TachoCollection';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.changeIpState = this.changeIpState.bind(this);
  }
  state = {
    window: Dimensions.get("window"),
    screen: Dimensions.get("screen"),
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
  }

  buttonPress = () => {
    this.props.navigation.navigate('Settings', {changeIpState: this.changeIpState});
  }

  render() {
    return (
      <>
        <View style={this.styles.container}>
          <TachoCollection style={this.styles.TachoColl}/>
          <MemCollection style={this.styles.MemColl}/>
        </View>
        <View style={this.styles.SettingButton} props={this.state}>
            <Button
              onPress={this.buttonPress}
              title="Click ME"
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

