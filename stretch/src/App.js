import React, { Component } from 'react'
import axios from 'axios';

export default class App extends Component {

  state = {
    username: '',
    password: ''
  }

  handleChange(e){
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  login(){
    axios.post('http://localhost:3300/api/auth/login', {
      ...this.state
    }).then(res =>{
      localStorage.setItem('nateToken', res.body.token);
      this.setState({
        username: '',
        password: '',
      })
    }).catch(err =>{
      console.log(err);
    })
  }

  register(){
    axios.post('http://localhost:3300/api/auth/register', {
      ...this.state
    }).then(res =>{
      this.setState({
        username: '',
        password: '',
      })
    }).catch(err =>{
      console.log(err);
    })


  }
  render() {
    console.log(this.state)
    return (
      <div>
        <form>
          Username: 
          <input 
            name='username'
            value={this.state.username}
            onChange={e => this.handleChange(e)}
          />
          password: 
          <input 
            name='password'
            value={this.state.password}
            onChange={e => this.handleChange(e)}
          />
          <button onClick={() => this.login()}> Login </button>
          <button onClick={() => this.register()}> Register </button>
        </form>
      </div>
    )
  }
}
