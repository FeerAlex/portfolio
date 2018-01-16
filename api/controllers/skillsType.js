const mongoose = require('mongoose');

module.exports = {
  getSkillTypes: (req, res) => {
    const skill = mongoose.model('skillType');

    skill.find().then(items => {
      res.status(200).json({skillTypes: items});
    });
  },

  createSkillsType: (req, res) => {
    const Model = mongoose.model('skillType');

    let item = new Model({
      title: req.body.title,
    });

    item.save().then(item => {
      return res.status(201).json({message: 'Тип скила успешно добавлен'});
    }).catch(err => {
      res.status(400).json({
        message: `При добавлении типа скила произошла ошибка: ${err.message}`,
      });
    });
  },
};