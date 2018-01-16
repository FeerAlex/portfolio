const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SkillTypeSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Укажите название типа скила'],
  },
});

mongoose.model('skillType', SkillTypeSchema);