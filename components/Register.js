import React, { Component, Fragment, } from 'react';

import { View, Text, KeyboardAvoidingView, Alert} from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { Container, Header, Content, Form, Item, Input, Icon,Button,Picker  } from 'native-base';
import axios from 'axios';
import { AsyncStorage } from 'react-native';


export default class Register extends Component {

  static navigationOptions = {
    title: 'Sign Up',
  };

  constructor(props) {
    super(props);
    state = {
      name: '',
      email   : '',
      password: '', 
      usertype: undefined
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

  onValueChange2(value) {
    this.setState({
      usertype: value
    });
  }

  register(){
    axios.post('http://noderestapi-env.dis3ns6znp.us-east-2.elasticbeanstalk.com/api/user/register', { 
      name: this.state.name, 
      email: this.state.email,
      password: this.state.password, 
      usertype: this.state.usertype
     })
    .then(res => {
      console.log(res);
      console.log(res.data.message);
      Alert.alert("Alert", "User Created Successfully"); 
    })
    .catch(error => {
      console.log(error);
      console.log(error.message);
      Alert.alert("Alert", "There has been an error email may already be in use!!");
    })
  }
  render() {
    return (
      <Fragment>
<View >
<Form>
<Item>
            <Icon active name='user' />
            <Input placeholder='Name'  
             onChangeText={(name) => this.setState({name})}/>
          </Item>
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

          <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select User Type"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Engineer" value="Engineer" />
                <Picker.Item label="Manager" value="Manager" />
              </Picker>
            </Item>

          <Button rounded block primary onPress={() => this.register()} style={{color:'white'}}><Text> Register </Text></Button>
          <Button transparent onPress={() => this.props.navigation.navigate('Login')}>
                  <Text>Login Here</Text>
                </Button>
                </Form>
      </View>
      </Fragment>
    )
  }
}