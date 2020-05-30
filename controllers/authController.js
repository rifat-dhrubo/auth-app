const passport = require('passport');
const Jwt = require('jsonwebtoken');

const localVerify = passport.authenticate('local', { session: false });
const jwtVerify = passport.authenticate('jwt', { session: false });

const generateJwtToken = (user) => {
  const { name, email, phone, _id } = user;

  return `Bearer ${Jwt.sign({ name, email, phone, _id }, process.env.SECRET, {
    expiresIn: 86400,
  })}`;
};
const generateAndSendJwtToken = (req, res) => {
  const token = generateJwtToken(req.user);

  res.json({
    isLoggedIn: true,
    token,
  });
};

module.exports = {
  localVerify,
  jwtVerify,
  generateJwtToken,
  generateAndSendJwtToken,
};
