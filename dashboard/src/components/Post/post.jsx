import React, { Component } from 'react';

//if user not exist => create post
//use in login.jsx
class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      houseAns: undefined
    };
    this.myFunction = this.myFunction.bind(this);
  };

  //show you house form / roommate form
  myFunction = () => {
    let houseYes = document.getElementById("houseYes").checked;
    let houseNo = document.getElementById("houseNo").checked;

    // if you have a house
    if (houseYes) {
      this.setState({houseAns: true});
      if (houseNo) {
        document.getElementById("houseYes").checked = false;
        this.setState({houseAns: false});
      }
    }
    // if you are looking for a roommate
    if (houseNo) {
      this.setState({houseAns: false});
      if (houseYes) {
        document.getElementById("houseNo").checked = false;
        this.setState({houseAns: true});
      }
    } 
  }

  //if you have a house => posting house information
  posthouse = () => {
    let newHouse = {
      "Address": document.querySelector("input[name='address']").value, 
      "Price": document.querySelector("input[name='price']").value,
      "Type": document.querySelector("input[name='type']").value,
      "Gender": document.getElementsByClassName("gender")[0].value,
      "Availability": document.querySelector("input[name='available']").value,
      "img": document.querySelector("input[name='img']").value,
      "Pet": document.getElementById("pet").value, 
      "Smoke": document.getElementById("smoke").value, 
      "GenderAccept": document.getElementById("genderAccept").value, 
      "UserName": this.props.name
    };

    //post house to database
    fetch('/house/' + this.props.name ,{
      method: 'POST',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newHouse)
    })
    .then(res => res.json())
    .then(data => {
      var posted = `
          <div class="list">
            <div>Your Gender: <span>${data.Gender}</span></div> 
            <div>Address: <span>${data.Address}</span></div>
            <div>Price: <span>${data.Price}</span></div>
            <div>Type: <span>${data.Type}</span></div>
            <div>Rooms Available: <span>${data.Availability}</span></div>
            <div><img src=${data.img}/></div>
            <div>Pet allowed: <span>${data.Pet}</span></div>
            <div>Smoke allowed: <span>${data.Smoke}</span></div>
            <div>Gender accepted: <span>${data.GenderAccept}</span></div>
            <button type="button" onClick={edit(event)">Edit</button>
            <button type="button" onclick="del(event)">Delete</button>
          </div>`;
        document.getElementsByClassName("insert")[0].innerHTML = posted;
    });
  };

  //if you're looking for a roommate => create roommate information
  findhouse = () => {
    let newPerson = {
      "Gender": document.getElementsByClassName("gender")[0].value, 
      "Bathroom": document.getElementsByClassName("bathroom")[0].value, 
      "PriceLower": document.querySelector("input[name='priceLower']").value,
      "PriceUpper": document.querySelector("input[name='PriceUpper']").value,
      "Pet": document.getElementsByClassName("pet")[0].value, 
      "Smoke": document.getElementsByClassName("smoke")[0].value, 
      "RoomNeed": document.querySelector("input[name='roomNeed']").value,
      "GenderAccept": document.getElementsByClassName("genderAccept")[0].value, 
      "UserName": this.props.name
    };
    
    //post roommate to database
    fetch('/roommate/' + this.props.name ,{
      method: 'POST',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPerson)
    })
    .then(res => res.json())
    .then(data => {
      var posted = `
          <div class="list">
            <div>Your Gender: <span>${data.Gender}</span></div>
            <div>Price: <span>${data.PriceLower}~${data.PriceUpper}</span></div>
            <div>Personal Bathroom: <span>${data.Bathroom}</span></div>
            <div>Need:<span>${data.RoomNeed} Rooms</span></div>
            <div>Have Pet: <span>${data.Pet}</span></div>
            <div>Smoke: <span>${data.Smoke}</span></div>
            <div>Gender accepted: <span>${data.GenderAccept}</span></div>
            <button type="button" onClick={edit(event)">Edit</button>
            <button type="button" onclick="del(event)">Delete</button>
          </div>`;
        document.getElementsByClassName("insert")[0].innerHTML = posted;
    });
  };

  render() {
    return (
      <div class="insert">
        <h2>Hello {this.props.name}</h2>
        {this.state.houseAns === undefined ? (
        // ask if you have a house
        <div>
          Do you have a house? 
          Yes<input type="checkbox" id="houseYes" onClick={this.myFunction}/>
          No<input type="checkbox" id="houseNo" onClick={this.myFunction}/>
        </div>
        ) : (
          <div>
            <div>
              Do you have a house? 
              Yes<input type="checkbox" id="houseYes" onClick={this.myFunction}/>
              No<input type="checkbox" id="houseNo" onClick={this.myFunction}/>
            </div>
          {this.state.houseAns ? (
            //subleasing house
            <div>
              <div>
                <span>Your gender</span>
                <select class="gender">
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              <div>Address: <input type="text" name="address"/></div>
              <div>Price: <input type="number" name="price"/></div>
              <div>Type: <input type="text" name="type"  placeholder="2B1B"/></div>
              <div>Available Spaces: <input type="text" name="available"  placeholder="2b"/></div>
              <div>Image: <input type="text" name="img"/></div>
              <div>
                <span>Pet Allowed?</span>
                <select id="pet">
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div>
                <span>Smoke Allowed?</span>
                <select id="smoke">
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div>
                <span>Gender Acceptance</span>
                <select id="genderAccept">
                  <option value="N">Male/Female</option>
                  <option value="F">Female Only</option>
                  <option value="M">Male Only</option>
                </select>
              </div>
              <button type="button" onClick={this.posthouse}>Post!</button>
            </div>
          ) : (
            //looking for house
            <div>
              <div>
                <span>Your gender</span>
                <select class="gender">
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              <div>PriceRange:<input type="number" name="priceLower"/>~<input type="number" name="PriceUpper"/></div>
              <div>
                <span>Do you need personal bathroom?</span>
                <select class="bathroom">
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div>Room Needed: <input type="number" name="roomNeed"/></div>
              <div>
                <span>Have Pet?</span>
                <select class="pet">
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div>
                <span>Smoke?</span>
                <select class="smoke">
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div>
                <span>roommates' gender accepted</span>
                <select class="genderAccept">
                  <option value="M">Male Only</option>
                  <option value="F">Female Only</option>
                  <option value="N">Male/Female</option>
                </select>
              </div>
              <button type="button" onClick={this.findhouse}>Post!</button>
            </div>
          )}
          </div>
        )}
        
      </div>
      )
    }
};

export default Post;