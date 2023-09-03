const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SECRET, NODE_PRODUCTION } = require('../utils/Constans');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === NODE_PRODUCTION ? JWT_SECRET : SECRET,
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch(next);
};
