const path = require('path');

module.exports = {
  getPage: (req, res) => {
    console.log('GET ADMIN');
    console.log(path.resolve(__dirname, '../../admin', 'index.html'));
    res.sendFile(path.resolve(__dirname, '../../admin', 'index.html'));
  },
};