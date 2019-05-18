// House Information
// database: house
// path: '/house'

module.exports = {
  // Method: GET
  // 1. get all house information
  houseAll: function(app, con) {
    app.get('/house', (req, res) => {
      con.query("SELECT * FROM house", (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    })
  },
  // 2. get certain user's house information
  houseOne: function(app, con) {
    app.get('/house/:username', (req, res) => {
      con.query("SELECT * FROM `house` WHERE UserName = '" + req.params.username + "'", (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    })
  },

  // Method: POST
  // 1. post certain user's house information
  housePost: function(app, con) {
    app.post('/house/:username', (req, res) => {
      let values;
      values = req.body;
      res.send(values);
      var query1 = "UPDATE user SET Post = 'sublease', Gender = '" + values.Gender + "' WHERE UserName = '" + req.params.username + "'";
      var query2 = "INSERT INTO `house` (\
        Address, Type, Price, img, Availability, Pet, Smoke, GenderAccept, UserName) VALUES ('" +
        values.Address + "','" + values.Type + "'," + values.Price + ",'" + values.img + "','" + 
        values.Availability + "','" + values.Pet + "','" + values.Smoke + "','" + values.Gender + 
        "','" + req.params.username + "')";
      con.query(query1, err => {
        if(err) throw err;
          console.log('user update');
      });
      con.query(query2, err => {
        if(err) throw err;
          console.log('1 house created');
      });
    })
  },

  // Method: PUT
  // 1. update certain user's house information
  houseUpdate: function(app, con) {
    app.put('/house/:username', (req, res) => {
      let updateData = req.body;
      let newHouse = updateData.newHouse;
      let query = "UPDATE house SET Address = '" + newHouse.Address + "', \
      Price = " + newHouse.Price + ", Type = '" + newHouse.Type + "'" + 
      ", Availability = '" + newHouse.Availability + "', img = '" + newHouse.img +
      "', Pet = '" + newHouse.Pet + "', Smoke = '" + newHouse.Smoke + "', GenderAccept = '" + newHouse.GenderAccept + 
      "' WHERE UserName = '" + req.params.username + "'";
    
      con.query(query, (err, result) => {
        if(err) throw err;
        res.send(newHouse);
      });
    })
  },

  // Method: DELETE
  // delete certain house information
  houseDelete: function(app, con) {
    app.delete('/house/:username', (req, res) => {
      deleteResult = req.body;
      var query = "DELETE FROM `house` WHERE UserName = '" + req.params.username + "'";
      con.query(query, (err, result) => {
        if(err) throw err;
      });
      con.query("SELECT * FROM `house` WHERE UserName = '" + req.params.username + "'", (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    });
  },
};