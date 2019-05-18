const express = require('express');
var mysql = require('mysql');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

var user = require('./server_functions/user.js');
var house = require('./server_functions/house.js');
var roommate = require('./server_functions/roommate.js');
var search = require('./server_functions/search.js');

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

// user
user.userAll(app, con);
user.userOne(app, con);
user.userPost(app, con);
// house
house.houseAll(app, con);
house.houseOne(app, con);
house.housePost(app, con);
house.houseUpdate(app, con);
house.houseDelete(app, con);
// roommate
roommate.roommateAll(app, con);
roommate.roommateOne(app, con);
roommate.roommatePost(app, con);
// house.roommateDelete(app, con);

// search
search.searchPrice(app, con);
search.searchGender(app, con);

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


//get/housejoin
app.get('/housejoin', (req, res) => {
  con.query("SELECT * FROM house LEFT JOIN user ON house.UserName = user.UserName", (err, result) => {
    if (err) throw err;
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
  var query = "DELETE FROM myFavorate WHERE UserName = '" + deleteResult.UserName + "' AND OwnerName = '" + deleteResult.Owner + "'";
  con.query(query, (err, result) => {
    if(err) throw err;
    console.log('delete: ', result);
  });

  con.query("SELECT * FROM myFavorate LEFT JOIN house ON myFavorate.OwnerName = house.UserName LEFT JOIN user ON user.UserName = house.UserName WHERE myFavorate.UserName = '" + 
  req.params.username + "'", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
})

//start server
app.listen(port, (req, res) => {
  console.log( `server listening on port: ${port}`);
})