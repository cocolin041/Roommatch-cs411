import React, { Component } from 'react';
import './posted.css';
import Post from '../Post/post';
import Edit_Delete from '../Edit_Delete.js';
import searchUserFun from '../searchUser.js';



//you had posted roommate information => show you recommended house
function HouseRecommend(props) {

  // Like function on like button
  let like = (e) => {
    let owner = e.target.nextElementSibling.children[0].innerHTML;
    let myFavorate = {
      "UserName": props.name,
      "Owner": owner
    };

    fetch('/myfavorate' ,{
      method: 'POST',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myFavorate)
    })
    .then(res => res.json());
  };

  //get all house information and owner's information
  fetch('/housejoin' ,{
    method: 'GET',
    dataType: 'json',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(house => {
    // filter with your gender and house owner's gender
    let recommendHouse = filter(house, props.data, props.gender);
    let result = `${recommendHouse.map(p => `
        <div>
          <button class="like">Like</button>
          <div>UserName: <span>${p.UserName}</span></div>
          <div>Gender: <span>${p.Gender}</span></div>
          <div>Address: <span>${p.Address}</span></div>
          <div>Price: <span>${p.Price}</span></div>
          <div>Type: <span>${p.Type}</span></div>
          <div>Rooms Available: <span>${p.Availability}</span></div>
          <div>Pet allowed: <span>${p.Pet}</span></div>
          <div>Smoke allowed: <span>${p.Smoke}</span></div>
          <div>Gender accepted: <span>${p.GenderAccept}</span></div>
          <img src=${p.img} height="500" width="500"/>
        </div>`)}`;
    document.getElementsByClassName("house")[0].innerHTML = result;
    document.getElementsByClassName("house")[0].style.display = "flex";
    document.getElementsByClassName("house")[0].style.flexWrap = "wrap";
    let likebutton = document.getElementsByClassName("like");
    Array.prototype.map.call(likebutton, p=>p.addEventListener("click", like));
  });

  return (
    <div class="house"></div>
  );
};

//Help function of 'HouseRecommend'
//filter house recommendation
function filter(house, data, gender) {
  let roomNeed = Number(data.RoomNeed);
  let recommendHouse = [];
  house.map(p=>{
    let room = Number((p.Type).charAt(0));
    let available = Number((p.Availability).charAt(0));
    let fill = room - available;
    let bathroomAvg = Number((p.Type).charAt(2)) / room;

    // check room space and gender
    if (available >= roomNeed) {
      if (p.GenderAccept === 'N' || p.GenderAccept === gender) {
        //no one live inside
        if (fill === 0) {
          p.available = true;
        } else {
          if (data.GenderAccept === 'N' || data.GenderAccept === p.Gender) {
            p.available = true;
          }
        }
      }
    }
    // check bathroom
    if (p.available) {
      //no need personal bathroom
      if (data.Bathroom === 0 || (data.Bathroom === 1 && bathroomAvg >= 1)) {
        p.available = true;
      } else {
        p.available = false;
      }
    }
    //check price range
    if (p.available) {
      if (p.Price <= data.PriceUpper) {
        p.available = true;
      } else {
        p.available = false;
      }
    }
    // check pet and smoke
    if (p.available) {
      if (data.Pet === 0 || data.Pet === p.Pet) {
        if (data.Smoke === 0 || data.Smoke === p.Smoke) {
          p.available = true;
          recommendHouse.push(p);
        } else {
          p.available = false;
        }
      } else {
        p.available = false;
      }
    }
  });
  return recommendHouse;
}

//you had posted house information => show you recommended people
function PersonRecommend(props) {
  fetch('/roommate' ,{
    method: 'GET',
    dataType: 'json',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(roommate => {
    if (roommate.length > 0) {
      let result = `${roommate.map(data => `
          <div>
            <div>UserName: <span>${data.UserName}</span></div>
            <div>Price: <span>${data.PriceLower}~${data.PriceUpper}</span></div>
            <div>Personal Bathroom: <span>${data.Bathroom}</span></div>
            <div>Need:<span>${data.RoomNeed} Rooms</span></div>
            <div>Have Pet: <span>${data.Pet}</span></div>
            <div>Smoke: <span>${data.Smoke}</span></div>
            <div>Gender accepted: <span>${data.GenderAccept}</span></div>
          </div>`)}`;
      document.getElementsByClassName("roommate")[0].innerHTML = result;
    }
  });
  return (
    <div class="roommate"></div>
  );
};

class Posted extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: {},
        renderPost: false,
        editing: false,
        oldHouse: {},
        postNum: 0,
        post: ''
      };
      this.renderPost = this.renderPost.bind(this);
      this.edit = this.edit.bind(this);
      this.update = this.update.bind(this);
      this.del = this.del.bind(this);
    };

    edit = (e) => {
      Edit_Delete.edit(e, this);
    };
    update = () => {
      Edit_Delete.update(this);
    };
    del = () => {
      Edit_Delete.del(this.props.name, this);
    };

    searchUser = () => {
      let username = this.props.name;
      searchUserFun.searchUser(username, this);
    }

    //render your post => house information / roommate information
    renderPost = () => {
      if (!this.state.renderPost) {
        let obj = this;
        let result;

        // fetch user information
        this.searchUser();
        
        //house information
        if (this.state.post === "sublease") {
          fetch('/house/' + this.props.name ,{
            method: 'GET',
            dataType: 'json',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(data => {
            if (data.length > 0) {
              obj.setState({data: data[0], postNum: data.length});
              result = Edit_Delete.YourHouse(data[0]);
              document.getElementsByClassName("content")[0].innerHTML = result;
              let edit_button = document.getElementsByClassName("edit")[0];
              let del_button = document.getElementsByClassName("del")[0];
              edit_button.addEventListener("click", this.edit);
              del_button.addEventListener("click", this.del);
            }
            this.setState({renderPost: true});
          });
        }
        //roommate information
        if (this.state.post === "roommate") {
          fetch('/roommate/' + this.props.name ,{
            method: 'GET',
            dataType: 'json',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(data => {
            obj.setState({data: data[0]});
            result = Edit_Delete.YourInfo(data[0]);
            document.getElementsByClassName("content")[0].innerHTML = result;
            let edit_button = document.getElementsByClassName("edit")[0];
            let del_button = document.getElementsByClassName("del")[0];
            edit_button.addEventListener("click", this.edit);
            del_button.addEventListener("click", this.del);
            this.setState({renderPost: true});
          });
        }
      }
    }

    render() {
      this.renderPost();
      return (
        <div>
          {this.state.postNum > 0 ? (
            <div>
              <h2>Your Post</h2>
              <div class="content"></div>
              <div>
                <h2>Recommendation</h2>
                    {this.state.post === "roommate" ? (
                      <HouseRecommend data={this.state.data} gender={this.props.gender} name={this.props.name}/>
                    ):(
                      <PersonRecommend data={this.state.data} gender={this.props.gender} name={this.props.name}/>
                    )}
              </div>
              <div>
                {/* <h2>myFavorate</h2> */}
                {/* <Favorate name={this.props.name}/> */}
              </div>  
            </div>
          ):(
            <Post name={this.props.name}/>
          )}
          
        </div>
      );
    }
  };

export default Posted;