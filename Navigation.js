import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, YellowBox } from 'react-native';
import HomeScreen from './App';import SettingScreen from './components/Settings';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

export default class Navigation extends Component {


    render() {
        RootStack = createStackNavigator();
        return (    
            <NavigationContainer>
                <RootStack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                    <RootStack.Screen 
                        name="Home" 
                        component={HomeScreen}   
                        />
                    <RootStack.Screen name="Settings" component={SettingScreen} />
                </RootStack.Navigator>
            </NavigationContainer>

        )
    }
}


