const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const keys = require('../../config/keys');
const User = require('../../models/User');

const router = express.Router();

router.get('/test', (req, res) => res.json({ msg: 'This is the users route' }));

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id, handle, email } = req.user;
  res.json({ id, handle, email });
});

router.post('/register', async (req, res) => {
  const emailAlreadyExists = await User.findOne({ email: req.body.email });
  if (emailAlreadyExists) {
    return res.status(400).json({ email: 'A user has already registered with this email address' });
  }

  const { handle, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({ handle, email, password: hashedPassword });
    const payload = { id: newUser.id, handle: newUser.handle };
    const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 });
    res.json({
      success: true,
      token: 'Bearer ' + token,
    });
  } catch (e) {
    console.log(e);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ email: 'This user does not exist' });

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const payload = { id: user.id, handle: user.handle };
    try {
      const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 });
      res.json({
        success: true,
        token: 'Bearer ' + token,
      });
    } catch (e) {
      console.log(e);
    }
  } else return res.status(400).json({ password: 'Incorrect password' });
});

module.exports = router;
