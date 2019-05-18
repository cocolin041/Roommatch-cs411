module.exports = {
  //you had posted a house => show your house
  YourHouse: (data) => {
    return (
      `<div class="list">
        <div><img src=${data.img}/></div>
        <div>Address: <span>${data.Address}</span></div>
        <div>Price: <span>${data.Price}</span></div>
        <div>Type: <span>${data.Type}</span></div>
        <div>Rooms Available: <span>${data.Availability}</span></div>
        <div>Pet allowed: <span>${data.Pet}</span></div>
        <div>Smoke allowed: <span>${data.Smoke}</span></div>
        <div>Gender accepted: <span>${data.GenderAccept}</span></div>
        <div>
          <button type="button" class="edit" onClick={this.edit}>Edit</button>
          <button type="button" class="del" onClick={this.del}>Delete</button>
        </div>
      </div>`)
  },
  //you had posted roommate information => show your roommate preference
YourInfo: (data) => {
  return (
    `<div class="list">
      <div>Price: <span>${data.PriceLower}~${data.PriceUpper}</span></div>
      <div>Personal Bathroom: <span>${data.Bathroom}</span></div>
      <div>Need:<span>${data.RoomNeed} Rooms</span></div>
      <div>Have Pet: <span>${data.Pet}</span></div>
      <div>Smoke: <span>${data.Smoke}</span></div>
      <div>Gender accepted: <span>${data.GenderAccept}</span></div>
    </div>`)
  },
  del: (name, obj) => {
    fetch('/house/' + name ,{
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        obj.setState({postNum: 0});
      } else {
        obj.setState({postNum: data.length});
      }
    })
  },
  edit: (e, obj) => {
    obj.setState({editing: true});
    let list = e.target.parentElement.parentElement;
    let childs = list.children;
    let house = {
      "img": childs[0].children[0].src,
      "Address": childs[1].children[0].innerHTML,
      "Price": childs[2].children[0].innerHTML,
      "Type": childs[3].children[0].innerHTML,
      "Availability": childs[4].children[0].innerHTML,
      "Pet": childs[5].children[0].innerHTML,
      "Smoke": childs[6].children[0].innerHTML,
      "GenderAccept": childs[7].children[0].innerHTML
    };
    let editing = `
          <div class="list">
            <div>Address: <input type="text" name="edit-address" value="${house.Address}"/></div>
            <div>Price: <input type="number" name="edit-price" value="${house.Price}" /></div>
            <div>Type: <input type="text" name="edit-type"  placeholder="2B1B" value="${house.Type}" /></div>
            <div>Available Spaces: <input type="text" name="edit-available"  placeholder="2b" value="${house.Availability}" /></div>
            <div>Image: <input type="text" name="edit-img" value="${house.img}" /></div>
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
            <div><button type="button" class="done">Done</button></div>
        </div>`;
    document.getElementsByClassName("content")[0].innerHTML = editing;
    let done_button = document.getElementsByClassName("done")[0];
    done_button.addEventListener("click", obj.update);
    obj.setState({oldHouse: house});
  },
  update: (obj) => {
    let newHouse = {
      "Address": document.querySelector("input[name='edit-address']").value,
      "Price": document.querySelector("input[name='edit-price']").value,
      "Type": document.querySelector("input[name='edit-type']").value,
      "Availability": document.querySelector("input[name='edit-available']").value,
      "img": document.querySelector("input[name='edit-img']").value,
      "Pet": document.getElementsByClassName("pet")[0].value,
      "Smoke": document.getElementsByClassName("smoke")[0].value,
      "GenderAccept": document.getElementsByClassName("genderAccept")[0].value,
    }
    let House = {
      "newHouse": newHouse
    };
    fetch('/house/' + obj.props.name ,{
      method: 'PUT',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(House)
    })
    .then(res => res.json())
    .then(data => {
      let result = module.exports.YourHouse(data);
      document.getElementsByClassName("content")[0].innerHTML = result;
      let edit_button = document.getElementsByClassName("edit")[0];
      let del_button = document.getElementsByClassName("del")[0];
      edit_button.addEventListener("click", obj.edit);
      del_button.addEventListener("click", obj.del);
    });
    obj.setState({editing: false});
  }
};