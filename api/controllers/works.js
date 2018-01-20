const mongoose = require('mongoose');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

module.exports = {
  getWorks: (req, res) => {
    const work = mongoose.model('work');

    work.find().then(items => {
      res.status(200).json({works: items});
    });
  },

  createWork: (req, res) => {
    let form = new formidable.IncomingForm();
    let upload = 'upload';
    let filename;

    if(!fs.existsSync(upload)) {
      fs.mkdirSync(upload);
    }

    form.uploadDir = path.join(process.cwd(), upload);

    form.parse(req, function(err, fields, files) {
      if(err) {
        console.log('Не удалось загрузить картинку');
        // return res.redirect('/admin?msgfile=Не удалось загрузить картинку');
      }
      if(!fields.name || !fields.tech || !fields.link) {
        fs.unlink(files.image.path);
        console.log('Заполнены не все поля');
      // return res.redirect('/admin?msgfile=Заполнены не все поля');
      }

      // filename = path.join(upload, files.image.name);
      filename = files.image.name;

      fs.rename(files.image.path, filename, function(err) {
        if(err) {
          console.log(err);
          fs.unlink(filename);
          fs.rename(files.image.path, filename);
        }
      });

      const Model = mongoose.model('work');

      let item = new Model({
        name: fields.name,
        tech: fields.tech,
        link: fields.link,
        picture: filename,
      });

      item.save().then(item => {
        return res.status(201).json({message: 'Запись успешно добавлена'});
      }).catch(err => {
        console.log('При добавлении записи произошла ошибка');
        res.status(400).json({
          message: `При добавлении записи произошла ошибка: ${err.message}`,
        });
      });
    });
  },
};