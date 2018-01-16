const mongoose = require('mongoose');

module.exports = {
  auth: (req, res) => {
    const Model = mongoose.model('user');

    Model.findOne({login: req.body.login}).then(user => {
      if(!user) {
        return res.status(404).json({status: 'err', message: 'Пользователя не существует'});
      }
      if(!user.validPassword(req.body.password)) {
        return res.status(400).json({status: 'err', message: 'Пароль неверный'});
      } else {
        res.status(200).json({status: 'ok', message: 'Авторизация успешна'});
      }
    }).catch(e => {
      res.status(400).json({
        status: 'err', message: 'Произошла ошибка: ' + e.message,
      });
    });
  },
};
