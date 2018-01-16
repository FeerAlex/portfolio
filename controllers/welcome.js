const http = require('request');
const config = require('../config/config.json');

module.exports = {
  getPage: (req, res) => {
    res.render('index');
  },

  auth: (req, res) => {
    if(!req.body.login || !req.body.password) {
      return res.json({status: 'error', message: 'Вы заполнили не все поля'});
    }

    const pathApi = '/api/user';
    const requestOptions = {
      url: config.server.site + pathApi,
      method: 'POST',
      json: {
        login: req.body.login,
        password: req.body.password,
      },
    };
    http(requestOptions, function(error, response, body) {
      if(body.status === 'err') {
        return res.json({status: 'error', message: body.message});
      }
      req.session.isAdmin = true;
      res.redirect('/admin');
    });
  },
};