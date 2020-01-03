// Homescreen.js
import React, { Component } from 'react';
import {  View , Alert } from 'react-native';
import { Container, Button,Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import axios from 'axios';
import { AsyncStorage } from 'react-native';


export default class Sites extends Component {
    static navigationOptions = {
        title: 'Sites',
      };

    constructor(props){
        super(props);
     
        this.state = {
           sites: []
        }
     }
    componentDidMount(){  

        const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzbWFuQGRyYXguY29tIiwidXNlcklkIjoiNWRkYWJiZjkyYTE4ZjA1Nzc4OThmOGRiIiwiaWF0IjoxNTc3ODA4OTQxLCJleHAiOjE1Nzc4MTI1NDF9.tHBqS1QrdTLl0Z8Tn1iyICsFg5cMipGTMz9pUYJUT-Y';
        console.log('Component is mounted');
        console.log(token);
                    // Getting the sites
                    axios({
                      url: 'http://noderestapi-env.dis3ns6znp.us-east-2.elasticbeanstalk.com/api/sites',
                      method: 'get',
                      headers: {
                          'Authorization': `Bearer ${token}`,
                          'Content-Type': 'application/json'
                      }
                    })
                      .then(res => {
                        const sites = res.data.sites;
                        console.log(sites)
                        this.setState({ sites: sites });
                        console.log(this.state.sites);

                      })
                      .catch (error => {
                        console.log(error);
                      })
          
            //   }
        // }
    //     else{
    //       this.props.navigation.navigate('Login')
    //     }
    //   } catch(e) {

    //     console.log(e);
    // }
    }

    viewSite(site){

        Alert.alert("Alert", site);

    }
   

  render() {
    return (
        <Container>
        <Content>
        <List>
        {this.state.sites.map(site =>  
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: site.Image }} />
              </Left>
              <Body>
                <Text>{site.SiteName}</Text>
                <Text note>{site.SiteAddressLine1}</Text>
              </Body>
              <Right>
              <Right>
                <Button transparent onPress={() => this.viewSite(site.SiteName)}>
                  <Text>View</Text>
                </Button>
              </Right>
              </Right>
            </ListItem>
        )}
          </List>
        </Content>
      </Container>
    )
  }
}




