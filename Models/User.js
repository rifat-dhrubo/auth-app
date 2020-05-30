const mongoose = require('mongoose');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  email: {},
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  session: false,
});
module.exports = mongoose.model('User', userSchema);
