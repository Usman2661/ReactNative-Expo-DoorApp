import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import axios from 'axios';

export default class Profile extends Component {

    static navigationOptions = {
        title: 'Profile',
      };

    constructor(props){
        super(props);
     
        this.state = {
           name: '',
           email: '',
           usertype: '',
           imageurl: ''
        }
     }

     componentDidMount(){
         
        const id='5ddabbf92a18f0577898f8db';
        const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzbWFuQGRyYXguY29tIiwidXNlcklkIjoiNWRkYWJiZjkyYTE4ZjA1Nzc4OThmOGRiIiwiaWF0IjoxNTc3Njk2MTM3LCJleHAiOjE1Nzc2OTk3Mzd9.SeGmz7Ju0LxO5f4jMJVYZpERlhPUHjapIavP-u6ctPI';
        axios({
            url: 'http://noderestapi-env.dis3ns6znp.us-east-2.elasticbeanstalk.com/api/user/user?id='+id,
            method: 'get',
            headers: {
                'Authorization': 'Bearer '+token,
                'Content-Type': 'application/json'
            }
          })
          .then(res => {
              const users = res.data.users;

              this.setState({name: users.name});
              this.setState({email: users.email });
              this.setState({usertype: users.usertype});
              this.setState({imageurl: users.image});

              // this.setState({ sites });
          })
          .catch (error => {
             console.log(error);  
          })
     }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: this.state.imageurl}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
    <Text style={styles.name}>{this.state.name}</Text>
    <Text style={styles.info}>{this.state.usertype}</Text>
    <Text style={styles.description}>{this.state.email}</Text>
              
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Option 1</Text>  
              </TouchableOpacity>              
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Option 2</Text> 
              </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});
 