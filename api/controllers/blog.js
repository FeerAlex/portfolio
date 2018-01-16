const mongoose = require('mongoose');

module.exports = {
  
  getArticles: (req, res) => {
    const blog = mongoose.model('blog');

    blog.find().then(items => {
      res.status(200).json({articles: items});
    });
  },

  createArticle: (req, res) => {
    const Model = mongoose.model('blog');

    let date = req.body.date.split('.');
    let newDate = `${date[1]}/${date[0]}/${date[2]}`;

    let item = new Model({
      title: req.body.title,
      date: new Date(newDate),
      desc: req.body.desc,
    });

    console.log(item);

    item.save().then(item => {
      return res.status(201).json({message: 'Запись успешно добавлена'});
    }).catch(err => {
      res.status(400).json({
        message: `При добавлении записи произошла ошибка: ${err.message}`,
      });
    });
  },

  editArticle: (req, res) => {
    const id = req.params.id;
    
    let data = {
      title: req.body.title,
      date: new Date(req.body.date),
      desc: req.body.desc,
    };
    
    const Model = mongoose.model('blog');
    
    Model.findByIdAndUpdate(id, { $set: data }).then(item => {
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
  },

  deleteArticle: (req, res) => {
    const id = req.params.id;
    const Model = mongoose.model('blog');
    
    Model.findByIdAndRemove(id).then(item => {
      if (item) {
        res.status(200).json({ message: 'Запись успешно удалена' });
      } else {
        res.status(404).json({ message: 'Запись в БД не обнаружена' });
      }
    }).catch(err => {
      res.status(400).json({
        message: `При удалении записи произошла ошибка: ${err.message}`,
      });
    });
  },
};