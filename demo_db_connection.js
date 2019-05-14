const express = require('express');
// var moment = require('moment');
var mysql = require('mysql');
var multer = require('multer');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
// const app = express.Router();

let bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//connect to mysql
var con = mysql.createPool({
  host: "us-cdbr-iron-east-02.cleardb.net",
  database: "heroku_b4c2490803a0411",
  user: "bec78dfb179f6c",
  password: "3add20d4",
  connectionLimit : 10
});

//open the cross access
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(express.static(path.join(__dirname, 'dashboard/build')));

//get/
app.get('/', (req, res) => {
  res.send("hello");
})

//get/house
app.get('/house', (req, res) => {
  con.query("SELECT * FROM house", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
})

//get/housejoin
app.get('/housejoin', (req, res) => {
  con.query("SELECT * FROM house LEFT JOIN user ON house.UserName = user.UserName", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
})

//get/house/usernmae
app.get('/house/:username', (req, res) => {
  con.query("SELECT * FROM `house` WHERE UserName = '" + req.params.username + "'", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
})

//get/roommate
app.get('/roommate', (req, res) => {
  con.query("SELECT * FROM roommate", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
})

//get/roommate/usernmae
app.get('/roommate/:username', (req, res) => {
  con.query("SELECT * FROM `roommate` WHERE UserName = '" + req.params.username + "'", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
})

//get/user
app.get('/user', (req, res) => {
  con.query("SELECT * FROM user", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
})

//get/user/usernmae
app.get('/user/:username', (req, res) => {
  con.query("SELECT * FROM `user` WHERE UserName = '" + req.params.username + "'", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
})

//post/house
app.post('/house/:username', (req, res) => {
  let values;
  values = req.body;
  res.send(values);
  var query1 = "INSERT INTO `user` (\
    Post, Gender, UserName) VALUES ('sublease','" + values.Gender + "','"+ req.params.username + "')";
  var query2 = "INSERT INTO `house` (\
    Address, Type, Price, img, Availability, Pet, Smoke, GenderAccept, UserName) VALUES ('" +
    values.Address + "','" + values.Type + "'," + values.Price + ",'" + values.img + "','" + 
    values.Availability + "','" + values.Pet + "','" + values.Smoke + "','" + values.Gender + 
    "','" + req.params.username + "')";
  con.query(query1, err => {
    if(err) throw err;
      console.log('1 record inserted');
  });
  con.query(query2, err => {
    if(err) throw err;
      console.log('1 record inserted');
  });
})
// post/roommate
app.post('/roommate/:username', (req, res) => {
  let values;
  values = req.body;
  res.send(values);

  var query1 = "INSERT INTO `user` (\
    Post, Gender, UserName) VALUES ('roommate', '" + values.Gender + "','" + req.params.username + "')";

  var query2 = "INSERT INTO `roommate` (\
    Bathroom, PriceUpper, PriceLower, RoomNeed, Pet, Smoke, GenderAccept, UserName) VALUES ('" +
    values.Bathroom + "'," + values.PriceUpper + "," + values.PriceLower + "," +
    values.RoomNeed + ",'" + values.Pet + "','" + values.Smoke + "','" + values.GenderAccept + 
    "','" + req.params.username + "')";
  con.query(query1, err => {
    if(err) throw err;
      console.log('1 record inserted');
  });
  con.query(query2, err => {
    if(err) throw err;
      console.log('1 record inserted');
  });
})

//search
var searchResult;
app.post('/search', (req, res) => {
  searchResult = req.body;
  var query = "SELECT * FROM `house` WHERE Price >= " +
  searchResult.from + " AND Price <= " + searchResult.to;

  con.query(query, (err, result) => {
    if(err) throw err;
    console.log('search: ' + searchResult.from + '~' + searchResult.to);
    res.send(result);
  });
})

//searchGender
app.post('/searchGender', (req, res) => {
  searchResult = req.body;
  console.log(searchResult);

  var query = "SELECT * FROM roommate LEFT JOIN user ON roommate.UserName = user.UserName WHERE Gender = '" +
  searchResult.gender + "' AND GenderAccept = '" + searchResult.genderAccept + "'";

  con.query(query, (err, result) => {
    if(err) throw err;
    res.send(result);
  });
})

//delete
app.delete('/delete/:username', (req, res) => {
  deleteResult = req.body;
  var query = "DELETE FROM `house` WHERE UserName = '" + req.params.username + "'";
  con.query(query, (err, result) => {
    if(err) throw err;
    console.log('delete: ', result);
  });
})
//update
var updateData;
app.post('/update/:username', (req, res) => {
  updateData = req.body;
  // let oldHouse = updateData.oldHouse;
  let newHouse = updateData.newHouse;
  var query = "UPDATE house SET Address = '" + newHouse.Address + "', \
  Price = " + newHouse.Price + ", Type = '" + newHouse.Type + "'" + 
  " WHERE UserName = '" + req.params.username + "'";

  con.query(query, (err, result) => {
    if(err) throw err;
    console.log('update: ', newHouse);
    res.send(result);
  });
})

//myFavorate
//get
app.get('/myfavorate/:username', (req, res) => {
  con.query("SELECT * FROM myFavorate LEFT JOIN house ON myFavorate.OwnerName = house.UserName LEFT JOIN user ON user.UserName = house.UserName WHERE myFavorate.UserName = '" + 
  req.params.username + "'", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
})
//insert
app.post('/myfavorate', (req, res) => {
  let values = req.body;
  // console.log(values);
  // res.send(values);
  var query = "INSERT INTO `myFavorate` (UserName, OwnerName) VALUES ('" + values.UserName + "','" + values.Owner + "')";
  console.log(query);
  con.query(query, err => {
    if(err) throw err;
      console.log('1 record inserted');
  });
})
//delete
app.delete('/myfavorate/:username', (req, res) => {
  deleteResult = req.body;
  console.log(deleteResult);
  var query = "DELETE FROM myFavorate WHERE UserName = '" + deleteResult.UserName + "' AND OwnerName = '" + 
  deleteResult.Owner + "'";
  con.query(query, (err, result) => {
    if(err) throw err;
    console.log('delete: ', result);
  });
})

//start server
app.listen(port, (req, res) => {
  console.log( `server listening on port: ${port}`);
})