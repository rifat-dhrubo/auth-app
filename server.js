/* eslint-disable no-underscore-dangle */
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const router = require('./routes/routes');
const User = require('./Models/User');

const app = express();

// registering global middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

passport.use(User.createStrategy());
passport.use(
  new passportJwt.Strategy(
    {
      jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    },
    (payload, done) => {
      User.findById(payload._id)
        .lean()
        .exec()
        .then((user) => {
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        })
        .catch((error) => {
          done(error, false);
        });
    }
  )
);

app.use('/', router);

module.exports = app;
