const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SkillSchema = new Schema({
  skillType: {type: Schema.Types.ObjectId, ref: 'skillType'},
  name: {
    type: String,
    required: [true, 'Укажите заголовок статьи'],
  },
  percents: {
    type: Number,
    default: 0,
    required: [true, 'Укажите процент'],
  },
});

mongoose.model('skill', SkillSchema);