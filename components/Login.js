// Homescreen.js
import React, { Component } from 'react';
import { View, Alert, Text,KeyboardAvoidingView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Container, Header, Form, Item, Input, Icon, Button } from 'native-base';
import axios from 'axios';
export default class Login extends Component {

  static navigationOptions = {
    title: 'Login',
  };
  
  constructor(props) {
    super(props);
    state = {
      email   : '',
      password: ''
    }
  }
  componentDidMount(){

    try {
      const loggedIn = AsyncStorage.getItem('loggedIn')
      if(loggedIn) {
        this.props.navigation.navigate('Home')
      }
      else{
      }
    } catch(e) {
      // error reading value
    }
  }

  remember = async () => {
    try {
      await SecureStore.setItemAsync(
        'token',
        this.state.token
      );
    } catch (e) {
      console.log(e);
    }
  };

  read = async () => {
    try {
      const credentials = await SecureStore.getItemAsync('token');
      console.log('value of credentials: ', credentials);

   
    } catch (e) {
      console.log(e);
    }
  };


  login (){

    
    var currentDateTime = new Date();
    var date = currentDateTime.getFullYear() + '-' + (currentDateTime.getMonth()+1) + '-' + currentDateTime.getDate() +' '+ currentDateTime.getHours()+':'+ currentDateTime.getMinutes()+':'+ currentDateTime.getSeconds();
    var d = new Date(date);
    d.setHours(d.getHours() + 1);


    axios.post('http://noderestapi-env.dis3ns6znp.us-east-2.elasticbeanstalk.com/api/user/login', { 
      email: this.state.email,
      password: this.state.password
     })
    .then(res => {

      console.log(res.data);

      var email = res.data.email;
      var usertype = res.data.usertype;
      var name = res.data.name;
      var userId = res.data.userId;
      var token = res.data.token;

      this.setState({
        token: token
      });

      // console.log(this.state.token);

      this.remember;
      
      this.read;

    })
    .catch(error => {
      console.log(error);
      console.log(error.message);
      Alert.alert("Alert", "Invalid Credentials: Email or Password may be wrong !!");
 
    })



  }

  render() {
    return (
      <View >
      {/* <KeyboardAvoidingView behavior='position' style = {{backgroundColor: 'white', flex: 1}}> */}
      <Form>
      <Item>
            <Icon active name='email-outline' />
            <Input placeholder='Email'  
             onChangeText={(email) => this.setState({email})}/>
          </Item>
          <Item>
            <Icon active name='lock' />
            <Input secureTextEntry={true} type='password' placeholder='Password'  
             onChangeText={(password) => this.setState({password})}/>        
          </Item>
          <Button rounded block primary onPress={() => this.login()}><Text> Login </Text></Button>
          <Button rounded block primary onPress={() => this.read}><Text> View Token </Text></Button>
          <Button transparent onPress={() => this.props.navigation.navigate('Register')}>
                  <Text>Sign Up Here</Text>
                </Button>
                </Form>

      </View>
    )
  }
}