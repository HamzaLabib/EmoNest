const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  parentName: { type: String, required: true },
  childName: { type: String, required: true },
  age: {type: Number, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  parentId: { type: String },
  childId: { type: String },
});

module.exports = mongoose.model('User', userSchema);
