import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Roommate extends Component {
  //search roommate by gender
  searchGender = () => {
    let gender = document.getElementsByClassName("gender")[0];
    let genderAccept = document.getElementsByClassName("gender-accept")[0];
    let searchGender = {
      "gender": gender.value, 
      "genderAccept": genderAccept.value
    };

    fetch('/searchGender' ,{
      method: 'POST',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(searchGender)
    })
    .then(res => res.json())
    .then(data => {
      let result = `${data.map(p => `
          <div class="result">
            <div>UserName: <span>${p.UserName}</span></div>
            <div>Gender: <span>${p.Gender}</span></div>
            <div>GenderAccepted: <span>${p.GenderAccept}</span></div>
            <div>Price: <span>${p.PriceLower}~${p.PriceUpper}</span></div>
            <div>Require Private BathRoom: <span>${p.Bathroom}</span></div>
            <div>RoomNeed: <span>${p.RoomNeed}</span></div>
            <div>Smoke: <span>${p.Smoke}</span></div>
            <div>Pet: <span>${p.Pet}</span></div>
          </div>`)}`;
        document.getElementById("genderresult").innerHTML = result;
        document.getElementById("genderresult").style.display = "flex";
        document.getElementById("genderresult").style.flexWrap = "wrap";
    });
  };
  
  render() {
    return (
      <div class="search-gender">
        {!this.props.location.isLoggedIn ? (
          <div className="nav">
            <ul>
              <li><Link to="/user">Login</Link></li>
              <li><Link to={{pathname: "/", isLoggedIn: true}}>House</Link></li>
            </ul>
          </div>
        ):(
          <div className="nav">
            <ul>
              <li><Link to={{pathname: "/user", isLoggedIn: false}} >Logout</Link></li>
              <li><Link to={{pathname: "/", isLoggedIn: false}}>House</Link></li>
            </ul>
          </div>
        )}
        {/* <h2>Search roommate by Gender...</h2> */}
        <select class="gender">
          <div>Roommate Gender</div>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        <select class="gender-accept">
          <div>His/Her Accept Gender</div>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="N">Male/Female</option>
        </select>
        <button type="button" onClick={this.searchGender}>Search!</button>
        <div id="genderresult"></div>
      </div>
    )
  }

}

export default Roommate;