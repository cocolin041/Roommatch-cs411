import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './house.css';
import logo from '../../logo.png';

class House extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upperPrice: 1000,
      allHouse: []
    };
    this.slider = this.slider.bind(this);
  };

  //get all house information
  listAll = () => {
    //only fetch house once
    if (this.state.allHouse.length === 0) {
      fetch('/house' ,{
        method: 'get',
        dataType: 'json',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
          let result = `${data.map(p => `
            <div class="list">
              <img src=${p.img}/>
              <div>Address: <span>${p.Address}</span></div>
              <div>Price: <span>${p.Price}</span></div>
              <div>Type: <span>${p.Type}</span></div>
              <div>Rooms Available: <span>${p.Availability}</span></div>
              <div>Pet allowed: <span>${p.Pet}</span></div>
              <div>Smoke allowed: <span>${p.Smoke}</span></div>
              <div>Gender accepted: <span>${p.GenderAccept}</span></div>
            </div>`)}`;
          document.getElementById("resultAll").innerHTML = result;
          document.getElementById("resultAll").style.display = "flex";
          document.getElementById("resultAll").style.flexWrap = "wrap";
          this.setState({allHouse: data});
      });
    }
  };

  //search house in price range
  search = (upperPrice) => {
    //filter out houses fit the price range
    let priceInRange = this.state.allHouse.filter(house => 
      house.Price <= upperPrice
    );
    let result = `${priceInRange.map(p => `
      <div class="list">
        <img src=${p.img}/>
        <div>Address: <span>${p.Address}</span></div>
        <div>Price: <span>${p.Price}</span></div>
        <div>Type: <span>${p.Type}</span></div>
        <div>Rooms Available: <span>${p.Availability}</span></div>
        <div>Pet allowed: <span>${p.Pet}</span></div>
        <div>Smoke allowed: <span>${p.Smoke}</span></div>
        <div>Gender accepted: <span>${p.GenderAccept}</span></div>
      </div>`)}`;
    document.getElementById("resultAll").innerHTML = result;
    document.getElementById("resultAll").style.display = "flex";
    document.getElementById("resultAll").style.flexWrap = "wrap";
  };

  // price slider
  slider = () => {
    // let lowerPrice = document.getElementById("lowerPrice").value;
    let upperPrice = document.getElementById("upperPrice").value;
    this.search(upperPrice);
    this.setState({upperPrice: upperPrice});
  }
  priceFilter = () => {
    let price_filter = document.getElementsByClassName("price-filter")[0];
    if (price_filter.style.display !== "block") {
      price_filter.style.display = "block";
    } else {
      price_filter.style.display = "none";
    }
  }
  
  render() {
    this.listAll();
    return (
      <div className="House">
      {!this.props.location.isLoggedIn ? (
        <div className="nav">
          <div>
            <img src={logo} alt="logo"/>
          </div>
          <div>
            <Link to="/user" className="link">Login</Link>
            <Link to="/roommate" className="link">Find Roommate</Link>
          </div>
        </div>
      ):(
        <div className="nav">
          <div>
            <img src={logo} alt="logo"/>
          </div>
          <div>
            <Link to={{pathname: "/", isLoggedIn: false}} >Logout</Link>
            <Link to={{pathname: "/roommate", isLoggedIn: false}}>Find Roommate</Link>
          </div>
        </div>
      )}
        
        <div className="content">

          {/* search house by price */}
          <div className="search-price">
            <button onClick={this.priceFilter}>Price Filter</button>
            <div className="price-filter">
              <div>price upper:{this.state.upperPrice}</div>
              <input type="range" min="100" max="1000" defaultValue="1000" class="slider" id="upperPrice" onChange={this.slider}/>
            </div>
          </div>
          <div id="resultAll"></div>

        </div>
      </div>
    )
  }

}

export default House
