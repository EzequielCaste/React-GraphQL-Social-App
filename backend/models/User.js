const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
  photoURL: { type: String, default: '' },
  isAdmin: Boolean
});

module.exports = model('User', userSchema);