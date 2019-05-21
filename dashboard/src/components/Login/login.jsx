import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Posted from '../Posted/posted';
import Post from '../Post/post';
import './login.css';
import UserFun from '../searchUser.js';
import logo from '../../logo.png';

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
              <div>
                <img src={logo} alt="logo"/>
              </div>
              <div>
                <Link to="/" className="link">House</Link>
                <Link to="/roommate" className="link">Find Roommate</Link>
              </div>
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
              <div>
                <img src={logo} alt="logo"/>
              </div>
              <div>
                <span className="link" onClick={this.logout}>Logout</span>
                <Link className="link" to={{pathname: "/", isLoggedIn: true}}>House</Link>
                <Link className="link" to={{pathname: "/roommate", isLoggedIn: true}}>Find Roommate</Link>
              </div>
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