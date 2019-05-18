import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Posted from '../Posted/posted';
import Post from '../Post/post';
import './login.css';
import UserFun from '../searchUser.js';
// import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: '',
      newUser: false
    };
    this.searchUser = this.searchUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.logout = this.logout.bind(this);
  };

  //check whether user exist
  searchUser = () => {
    let username = document.querySelector("input[name='username']").value;
    let password = document.querySelector("input[name='password']").value;
    UserFun.searchUser(username, this, password);
  }

  createUser = () => {
    let username = document.querySelector("input[name='username']").value;
    let password = document.querySelector("input[name='password']").value;
    UserFun.createUser(username, this, password);
  }
  logout = () => {
    this.setState({isLoggedIn: false});
  }

  render () {
    return (
      <div class="user">
      {/* when username is not entered => enter username */}
        {!this.state.isLoggedIn ? (
          <div>
            <div className="nav">
              <ul>
                <li><Link to="/">House</Link></li>
                <li><Link to="/roommate">Find Roommate</Link></li>
              </ul>
            </div>
            <div className="login">
              <div>Username:<input type="text" name="username"/></div>
              <div>Password:<input type="password" name="password"/></div>
              <div className="warn">Password Wrong</div>
              <div className="loginBtn"><button type="button" onClick={this.searchUser}>Login</button></div>
              <div className="createBtn"><button type="button" onClick={this.createUser}>Create</button></div>
            </div>
          </div>
        ) : (
          <div>
            <div className="nav">
              <ul>
                <li onClick={this.logout}>Logout</li>
                <li><Link to={{pathname: "/", isLoggedIn: true}}>House</Link></li>
                <li><Link to={{pathname: "/roommate", isLoggedIn: true}}>Find Roommate</Link></li>
              </ul>
            </div>
            {/* if this is new user or has no post yet => create post */}
            {this.state.newUser || this.state.post === '' ? (
              <Post name={this.state.username}/>
            ) : (
              // otherwise => show post
              <Posted name={this.state.username} post={this.state.post} gender={this.state.gender}/>
            )}
          </div>
        )}
      </div>
    )
  }
}; 

export default Login;