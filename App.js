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
  Dimensions
} from 'react-native';
import TachoAnzeige from './components/TachoAnzeige';
import TachoCollection from './components/TachoCollection';

export default class App extends Component {

  state = {
    window: Dimensions.get("window"),
    screen: Dimensions.get("screen")
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

  render() {
    return (
      <>
        <View style={this.styles.container}>
          <TachoCollection style={{width: '100%'}} />
        </View>
      </>
      )
  }

  styles = StyleSheet.create({
    container: {
      flex:1,
      height: '100%',
      width: '100%'
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
};*/