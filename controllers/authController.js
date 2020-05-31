const passport = require('passport');
const Jwt = require('jsonwebtoken');

const localVerify = passport.authenticate('local', { session: false });
const jwtVerify = passport.authenticate('jwt', { session: false });
const jwtVerifyWithResponse = (req, res) => {
  passport.authenticate(
    'jwt',
    {
      session: false,
      failWithError: true,
    },
    (err, user) => {
      if (err === null && !user) {
        return res.json({ isLoggedIn: false });
      }
      return res.json({ isLoggedIn: true, user });
    }
  )(req, res);
};

const generateJwtToken = (_id) => {
  return `Bearer ${Jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: 86400,
  })}`;
};
const generateAndSendJwtToken = (req, res) => {
  const { _id, name, email, phone } = req.user;
  const user = { _id, name, email, phone };

  const token = generateJwtToken(_id);

  res.json({
    isLoggedIn: true,
    token,
    data: user,
  });
};

module.exports = {
  jwtVerify,
  localVerify,
  jwtVerifyWithResponse,
  generateJwtToken,
  generateAndSendJwtToken,
};
