import React, { Component } from 'react';
import Posted from '../Posted/posted';
import Post from '../Post/post';
// import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: '',
      gender: ''
    };
    this.searchUser = this.searchUser.bind(this);
  };

  //check whether user exist
  searchUser() {
    let username = document.querySelector("input[name='username']");
    let user = username.value;
    var component = this;

    fetch('/user/' + user ,{
      method: 'get',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        component.setState({
          isLoggedIn: true,
          username: data[0].UserName,
          post: data[0].Post,
          gender: data[0].Gender
        });
      } else {
        component.setState({
          username: user
        });
      }
    })
  };
  render () {
    return (
      <div class="user">
      {/* when username is not entered => enter username */}
        {this.state.username === '' ? (
          <div>
            Enter Username:<input type="text" name="username"/>
            <button type="button" onClick={this.searchUser}>login</button>
          </div>
        ) : (
          <div>
            {/* if user exist => show post */}
            {this.state.isLoggedIn ? (
              <div>
                <h2>Your Post</h2>
                <Posted name={this.state.username} post={this.state.post} gender={this.state.gender}/>
              </div>
            ) : (
              // otherwise => create post
              <Post name={this.state.username}/>
            )}
          </div>
        )}
      </div>
    )
  }
}; 

export default Login;