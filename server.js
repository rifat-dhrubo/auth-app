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

module.exports = app;

app.use('/', router);
