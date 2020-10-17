import React, { Component } from "react";
import {
  Button,
  Grid,
  Header,
  Message,
  Segment,
  Container
} from "semantic-ui-react";
import io from "socket.io-client";

import Login from "./Login";

//custom namespace connection
const socket = io.connect("http://localhost:3001");
//default namespace connection
//const socket = io.connect("http://localhost:3001");

class App extends Component {
  constructor() {
    super();
    this.state={message:'deept'}
    socket.on('authenticated', ()=> {
        this.setState({message:'Authenticated'})
      })
      socket .on('unAuthorised', ()=> {
        this.setState({message:'user not found'})
      })
      socket .on('disconnected',()=> {
        this.setState({message:'disconnected'})
      })
      socket .on( 'message', ()=> {
        // var data = JSON.parse(data);
        this.setState({message: Math.random()})
    });
  }

  componentDidMount() {
    socket.on('connect', function () {
      socket
      .emit('authenticate', 'mytoken')
     
    });
  }
 
  handleclick =()=>{
    console.log('clicked')
    socket
    .emit('getmessage', 'mytoken')
  }
  handlereauth =()=>{
    console.log('clicked')
    socket
    .emit('authenticate', 'mytoken')
  }

  render() {
    return (
      <Container>
        <p>{this.state.message}</p>
    <button onClick={this.handleclick} >{this.state.message}</button>
    <button onClick={this.handlereauth} >{this.state.message}</button>
      </Container>
    );
  }
}

export default App;
