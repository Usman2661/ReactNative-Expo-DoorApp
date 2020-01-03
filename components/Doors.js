import React, { Component, Fragment } from 'react';
import {  View, Image, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import axios from 'axios';
export default class Doors extends Component {

    static navigationOptions = {
        title: 'Doors',
      };

      constructor(props){
        super(props);
     
        this.state = {
           doors: []
        }
     }

     componentDidMount(){  

        const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzbWFuQGRyYXguY29tIiwidXNlcklkIjoiNWRkYWJiZjkyYTE4ZjA1Nzc4OThmOGRiIiwiaWF0IjoxNTc3ODA4OTQxLCJleHAiOjE1Nzc4MTI1NDF9.tHBqS1QrdTLl0Z8Tn1iyICsFg5cMipGTMz9pUYJUT-Y';
                    // Getting the sites
                    axios({
                      url: 'http://noderestapi-env.dis3ns6znp.us-east-2.elasticbeanstalk.com/api/doors',
                      method: 'get',
                      headers: {
                          'Authorization': `Bearer ${token}`,
                          'Content-Type': 'application/json'
                      }
                    })
                      .then(res => {
                        const doors = res.data.doors;
                        this.setState({ doors: doors });
                        console.log(this.state.doors);
                      })
                      .catch (error => {
                        console.log(error);
                      })
                }


  render() {
    return (
        <Fragment>
      <ScrollView >
      { this.state.doors.map(door =>  

   <Card>
            <CardItem>
            {door.Door_Site.map(Door_Site => 
              <Left>

                <Thumbnail source={{uri: Door_Site.Image}} />
                <Body>
                  <Text>{door.DoorName}</Text>
                  <Text note>{Door_Site.SiteName}</Text>
                  <Text note>{door.DoorLocation}</Text>
                </Body>
              </Left>
              )}

            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: door.Image}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="eye" />
                  <Text>View</Text>
                </Button>
              </Left>
              <Right>
            <Text>{door.DateTimeCreated}</Text>
              </Right>
            </CardItem>
          </Card>
             )}
      </ScrollView>
      </Fragment>
    )
  }
}