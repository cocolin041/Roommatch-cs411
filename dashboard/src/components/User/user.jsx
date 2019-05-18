import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from '../Login/login';
import './user.css';

function Nav() {
  return (
    <div class="nav">
      <ul>
        <li><Link to="/">House</Link></li>
        <li><Link to="/user">Logout</Link></li>
      </ul>
    </div>
  )
};

class User extends Component {
  render() {
    return (
      <div>
        {/* <Nav /> */}
        <Login/>
      </div>
    )
  }

}

export default User;