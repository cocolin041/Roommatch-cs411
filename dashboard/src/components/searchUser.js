// get user information: check user exist

module.exports = {
  searchUser: (user, component, password) => {
    let warn = document.getElementsByClassName("warn")[0];
    let loginBtn = document.getElementsByClassName("loginBtn")[0];
    let createBtn = document.getElementsByClassName("createBtn")[0];

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
      // if user exist
      if (data.length > 0) {
        if (warn !== undefined) {
          if (data[0].password === password) {
            component.setState({
              isLoggedIn: true,
              username: data[0].UserName,
              post: data[0].Post,
              gender: data[0].Gender
            });
          } else {
            component.setState({
              username: data[0].UserName
            });
            warn.style.display = "block";
          }
        } else {
          component.setState({
            isLoggedIn: true,
            username: data[0].UserName,
            post: data[0].Post,
            gender: data[0].Gender
          });
        }
      } else {
        component.setState({
          isLoggedIn: false,
          username: user
        });
        loginBtn.style.display = "none";
        createBtn.style.display = "block";
      }
    })
  },
  createUser: (user, component, password) => {
    let createBtn = document.getElementsByClassName("createBtn")[0].children[0];
    createBtn.disabled = true;
    let newUser = {
      password: password
    };
    fetch('/user/' + user ,{
      method: 'POST',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(() => {
      component.setState({
        isLoggedIn: true,
        newUser: true
      })
    })
  }
};