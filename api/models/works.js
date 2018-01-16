const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WorkShema = new Schema({
  name: {
    type: String,
    required: [true, 'Укажите описание работы'],
  },
  tech: {
    type: String,
    required: [true, 'Укажите используемые технологии'],
  },
  link: {
    type: String,
    required: [true, 'Укажите скилы'],
  },
  picture: {
    type: String,
    required: [true, 'Загрузите картинку'],
  },
});

mongoose.model('work', WorkShema);