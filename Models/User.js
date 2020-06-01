const mongoose = require('mongoose');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Email address is invalid'],
      required: 'Please provide an email address',
    },
    name: {
      type: String,
      required: 'Please provide a name',
      trim: true,
      minlength: 3,
    },
    phone: {
      type: Number,
      minlength: 7,
      maxlength: 11,
      required: 'Please provide a phone number',
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  session: false,
});
module.exports = mongoose.model('User', userSchema);
