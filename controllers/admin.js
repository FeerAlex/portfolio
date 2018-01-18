const path = require('path');

module.exports = {
  getPage: (req, res) => {
    console.log('GET ADMIN');
    res.render('admin');
  },
};