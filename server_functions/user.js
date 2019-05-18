// User Information
// database: user
// path: '/user'

module.exports = {
  // Method: GET
  // 1. get all user information
  userAll: function(app, con) {
    app.get('/user', (req, res) => {
      con.query("SELECT * FROM user", (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    })
  },
  // 2. get certain user information
  userOne: function(app, con) {
    app.get('/user/:username', (req, res) => {
      con.query("SELECT * FROM `user` WHERE UserName = '" + req.params.username + "'", (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    })
  },

  // Method: POST
  userPost: function(app, con) {
    app.post('/user/:username', (req, res) => {
      let values = req.body;
      // res.send(values);
      var query = "INSERT INTO `user` (UserName, password) VALUES ('"+ req.params.username + "','" + values.password + "')";
      console.log(query);
      con.query(query, (err, result) => {
        if(err) throw err;
        console.log('1 user created');
        res.send(result);
      });
    })
  }
};