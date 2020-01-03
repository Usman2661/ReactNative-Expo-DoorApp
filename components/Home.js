// Homescreen.js
import React, { Component, useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { Button } from 'native-base';
import { AsyncStorage } from 'react-native';


export default class Home extends Component {

  static navigationOptions = {
    title: 'Home',
  };


  componentDidMount(){

    try {
      const loggedIn = AsyncStorage.getItem('loggedIn')
      if(loggedIn) {

      }
      else{
        this.props.navigation.navigate('Login')
      }
    } catch(e) {

    }

  }
  render() {
    return (
      <View>
          <Button rounded block primary onPress={() => this.props.navigation.navigate('Sites')}><Text> Sites </Text></Button>
          <Button rounded block primary onPress={() => this.props.navigation.navigate('Doors')}><Text> Doors </Text></Button>
          <Button rounded block primary ><Text> Scan  </Text></Button>
          <Button rounded block primary onPress={() => this.props.navigation.navigate('Profile')} ><Text> My Profile  </Text></Button>


      </View>
    )
  }
}




