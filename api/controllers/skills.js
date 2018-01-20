const mongoose = require('mongoose');

module.exports = {
  
  getSkills: (req, res) => {
    const skill = mongoose.model('skill');

    skill.find().then(items => {
      res.status(200).json({skills: items});
    });
  },

  createSkill: (req, res) => {
    const Model = mongoose.model('skill');

    let item = new Model({
      skillType: req.body.skillTypeId,
      name: req.body.name,
      percents: req.body.percents,
    });

    item.save().then(() => {
      return res.status(201).json({message: 'Скил успешно добавлен'});
    }).catch(err => {
      res.status(400).json({
        message: `При добавлении скила произошла ошибка: ${err.message}`,
      });
    });
  },

  updateSkills: (req, res) => {
    let skills = req.body;

    const Model = mongoose.model('skill');

    skills.forEach(skill => {
      let data = {
        skillType: skill.skillType,
        name: skill.name,
        percents: skill.percents,
      };

      Model.findByIdAndUpdate(skill._id, { $set: data }).then(item => {
        if (item) {
          res.status(200).json({ message: 'Запись успешно обновлена' });
        } else {
          res.status(404).json({ message: 'Запись в БД не обнаружена' });
        }
      }).catch(err => {
        res.status(400).json({
          message: `При обновлении записи произошла ошибка: ${err.message}`,
        });
      });
    });
  },
};