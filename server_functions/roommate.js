// Roommate Information
// database: roommate
// path: '/roommate'

module.exports = {
  // Method: GET
  // 1. get all roommate information
  roommateAll: function(app, con) {
    app.get('/roommate', (req, res) => {
      con.query("SELECT * FROM roommate", (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    })
  },
  // 2. get certain roommate information
  roommateOne: function(app, con) {
    app.get('/roommate/:username', (req, res) => {
      con.query("SELECT * FROM `roommate` WHERE UserName = '" + req.params.username + "'", (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    })
  },

  // Method: POST
  // 1. post certain user's roommate information
  roommatePost: function(app, con) {
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
  },
};