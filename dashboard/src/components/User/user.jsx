import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from '../Login/login';
import './user.css';
// import logo from '../../logo.png';

// function Nav() {
//   return (
//     <div className="nav">
//       <div>
//         <img src={logo} alt="logo"/>
//       </div>
//       <div>
//         <Link to="/" className="link">House</Link>
//         <Link to="/user" className="link">Logout</Link>
//       </div>
//     </div>
//   )
// };

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