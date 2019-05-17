import React, { Component } from 'react';

//you had posted a house => show your house
function YourHouse(data) {
  return (
    `<div class="list">
      <div>Address: <span>${data.Address}</span></div>
      <div>Price: <span>${data.Price}</span></div>
      <div>Type: <span>${data.Type}</span></div>
      <div>Rooms Available: <span>${data.Availability}</span></div>
      <div><img src=${data.img}/></div>
      <div>Pet allowed: <span>${data.Pet}</span></div>
      <div>Smoke allowed: <span>${data.Smoke}</span></div>
      <div>Gender accepted: <span>${data.GenderAccept}</span></div>
    </div>`)
};

//you had posted roommate information => show your roommate preference
function YourInfo(data) {
  return (
    `<div class="list">
      <div>Price: <span>${data.PriceLower}~${data.PriceUpper}</span></div>
      <div>Personal Bathroom: <span>${data.Bathroom}</span></div>
      <div>Need:<span>${data.RoomNeed} Rooms</span></div>
      <div>Have Pet: <span>${data.Pet}</span></div>
      <div>Smoke: <span>${data.Smoke}</span></div>
      <div>Gender accepted: <span>${data.GenderAccept}</span></div>
    </div>`)
};

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
    let result = `${roommate.map(data => `
        <div>
          <div>UserName: <span>${data.UserName}</span></div>
          <div>Price: <span>${data.PriceLower}~${data.PriceUpper}</span></div>
          <div>Personal Bathroom: <span>${data.Bathroom}</span></div>
          <div>Need:<span>${data.RoomNeed} Rooms</span></div>
          <div>Have Pet: <span>${data.Pet}</span></div>
          <div>Smoke: <span>${data.Smoke}</span></div>
          <div>Gender accepted: <span>${data.GenderAccept}</span></div>
          <button type="button" onClick={edit}>Edit</button>
          <button type="button" onclick="del(event)">Delete</button>
        </div>`)}`;
    document.getElementsByClassName("roommate")[0].innerHTML = result;
  });
  return (
    <div class="roommate"></div>
  );
};

// if you had select favorate
function Favorate(props) {
  let dislike = (e) => {
    let owner = e.target.nextElementSibling.children[0].innerHTML;
    let myFavorate = {
      "UserName": props.name,
      "Owner": owner
    };

    fetch('/myfavorate/' + props.name ,{
      method: 'delete',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myFavorate)
    })
    .then(res => res.json())
    .then(data => {
      let result = `${data.map(p => `
          <div>
            <button class="dislike">DisLike</button>
            <div>UserName: <span>${p.OwnerName}</span></div>
            <div>Owner Gender: <span>${p.Gender}</span></div>
            <div>Address: <span>${p.Address}</span></div>
            <div>Price: <span>${p.Price}</span></div>
            <div>Type: <span>${p.Type}</span></div>
            <div>Rooms Available: <span>${p.Availability}</span></div>
            <div>Pet allowed: <span>${p.Pet}</span></div>
            <div>Smoke allowed: <span>${p.Smoke}</span></div>
            <div>Gender accepted: <span>${p.GenderAccept}</span></div>
            <img src=${p.img} height="500" width="500"/>
          </div>`)}`;
      document.getElementsByClassName("myfavorate")[0].innerHTML = result;
      document.getElementsByClassName("myfavorate")[0].style.display = "flex";
      document.getElementsByClassName("myfavorate")[0].style.flexWrap = "wrap";
      let dislikebutton = document.getElementsByClassName("dislike");
      Array.prototype.map.call(dislikebutton, p=>p.addEventListener("click", dislike));
    });
  };
  return (
    <div class="myfavorate"></div>
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
        test: false
      };
      this.renderPost = this.renderPost.bind(this);
      this.edit = this.edit.bind(this);
      this.update = this.update.bind(this);
      this.del = this.del.bind(this);
      
    };
    // edit function
    edit = e => {
      this.setState({editing: true});
      let list = e.target.parentElement.parentElement.parentElement;
      let childs = list.children[1].children[0].children[0];
      let house = {
        "Address": childs.children[0].children[0].innerHTML,
        "Price": childs.children[1].children[0].innerHTML,
        "Type": childs.children[2].children[0].innerHTML,
        "Availability": childs.children[3].children[0].innerHTML,
        "img": childs.children[4].children[0].src,
        "Pet": childs.children[5].children[0].innerHTML,
        "Smoke": childs.children[6].children[0].innerHTML,
        "GenderAccept": childs.children[7].children[0].innerHTML
      };
      var editing = `
            <div class="list">
              <div>Address: <input type="text" name="edit-address" value="${house.Address}"/></div>
              <div>Price: <input type="number" name="edit-price" value="${house.Price}" /></div>
              <div>Type: <input type="text" name="edit-type"  placeholder="2B1B" value="${house.Type}" /></div>
              <div>Available Spaces: <input type="text" name="edit-available"  placeholder="2b" value="${house.Availability}" /></div>
              <div>Image: <input type="text" name="edit-img" value="${house.img}" /></div>
          </div>`;
      list.children[1].children[0].innerHTML = editing;
      this.setState({oldHouse: house});
    };
    //update
    done = () => {
      let house = {
        "Address": document.querySelector("input[name='edit-address']").value,
        "Price": document.querySelector("input[name='edit-price']").value,
        "Type": document.querySelector("input[name='edit-type']").value
      }
      return house;
    };
  
    update = () => {
      let newHouse = this.done();
      let House = {
        "newHouse": newHouse
      };
      fetch('/update/' + this.props.name ,{
        method: 'POST',
        dataType: 'json',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(House)
      })
      .then(res => res.json());
      this.setState({editing: false});
    }
  
    //delete
    del = () => {
      fetch('/delete/' + this.props.name ,{
        method: 'delete'
      })
      .then(res => res.json());
    };
  
    //render your post => house information / roommate information
    renderPost = () => {
      if (!this.state.renderPost) {
        let obj = this;
        let result;
  
        //house information
        if (this.props.post === "sublease") {
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
            obj.setState({data: data[0]});
            result = YourHouse(data[0]);
            document.getElementsByClassName("list")[0].innerHTML = result;
            this.setState({renderPost: true});
          });
        }
        //roommate information
        if (this.props.post === "roommate") {
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
            result = YourInfo(data[0]);
            document.getElementsByClassName("list")[0].innerHTML = result;
            this.setState({renderPost: true});
          });
        }
      }
    }

    render() {
      // this.renderPost();
  
      return (
        <div>
          <div class="list">{this.renderPost()}</div>
          {!this.state.editing ? (
            <div>
              <button type="button" onClick={this.edit}>Edit</button>
              <button type="button" onClick={this.del}>Delete</button>
            </div>
          ) : (
            <div>
              <button type="button" onClick={this.update}>Done</button>
            </div>
          )}
          <div>
            <h2>Recommendation</h2>
                {this.props.post === "roommate" ? (
                  <HouseRecommend data={this.state.data} gender={this.props.gender} name={this.props.name}/>
                ):(
                  <PersonRecommend data={this.state.data} gender={this.props.gender} name={this.props.name}/>
                )}
          </div>
          <div>
            <h2>myFavorate</h2>
            <Favorate name={this.props.name}/>
          </div>
        </div>
      );
    }
  };

export default Posted;