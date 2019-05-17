import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from '../Login/login';

function Nav() {
  return (
    <div class="nav">
      <ul>
        <li><Link to="/">House</Link></li>
        <li>User</li>
      </ul>
    </div>
  )
};

class User extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Login />
      </div>
    )
  }

}

export default User;