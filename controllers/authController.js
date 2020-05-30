const passport = require('passport');
const Jwt = require('jsonwebtoken');

const localVerify = passport.authenticate('local', { session: false });
const jwtVerify = passport.authenticate('jwt', { session: false });

const generateJwtToken = (req, res) => {
  const { name, email, phone, _id: id } = req.user;

  const token = `Bearer ${Jwt.sign(
    { name, email, phone, id },
    process.env.SECRET,
    {
      expiresIn: 86400,
    }
  )}`;

  res.json({
    isLoggedIn: true,
    token,
  });
};

module.exports = { localVerify, jwtVerify, generateJwtToken };
