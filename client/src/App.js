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
    this.state = { message: '', status: '' }
    socket.on('authenticated', () => {
      this.setState({ status: 'Authenticated' })
    })
    socket.on('unAuthorised', () => {
      this.setState({ status: 'user not found' })
    })
    socket.on('disconnected', () => {
      this.setState({ status: 'disconnected' })
    })
    socket.on('message', (data) => {
      // var data = JSON.parse(data);
      this.setState({ message: data })
    });
  }

  componentDidMount() {
    // socket.on('connect', function () {
    //   socket
    //     .emit('authenticate', 'mytoken')

    // });
  }

  handleclick = () => {
    console.log('clicked')
    socket
      .emit('getmessage', this.state.userId)
  }
  handlereauth = () => {
    console.log('clicked')
    socket
      .emit('authenticate', this.state.userId)
  }

  render() {
    return (
      <Container>
        <p>userid :{this.state.userId}</p>
        <p>message :{this.state.message}</p>
        <p>Status :{this.state.status}</p>
        <input type="text" placeholder="Enter login id" value={this.state.userId} onChange={(ev) => this.setState({ userId: ev.target.value })}></input>
        <div>
        {this.state.status === 'Authenticated' && <button onClick={this.handleclick} disabled={!this.state.userId} >Get Data</button>}
        </div>
        <div>
        <button onClick={() => this.handlereauth()} disabled={!this.state.userId} >Login </button>
        </div>
      </Container>
    );
  }
}

export default App;
