// Search function
// database: house
// path: '/search', '/searchGender'

module.exports = {
  // Method: POST
  // 1. get all house within price range
  searchPrice: function(app, con) {
    app.post('/search', (req, res) => {
      let searchResult = req.body;
      var query = "SELECT * FROM `house` WHERE Price >= " +
      searchResult.from + " AND Price <= " + searchResult.to;
    
      con.query(query, (err, result) => {
        if(err) throw err;
        res.send(result);
      });
    })
  },
  // 2. get all roommate fit gender search
  searchGender: function(app, con) {
    app.post('/searchGender', (req, res) => {
      let searchResult = req.body;
      var query = "SELECT * FROM roommate LEFT JOIN user ON roommate.UserName = user.UserName WHERE Gender = '" +
      searchResult.gender + "' AND GenderAccept = '" + searchResult.genderAccept + "'";
    
      con.query(query, (err, result) => {
        if(err) throw err;
        res.send(result);
      });
    })
  }
};