const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Tweet = require('../../models/Tweet');
const validateTweetInput = require('../../validation/tweets');

router.get('/', async (req, res) => {
  const tweets = await Tweet.find().sort({ date: -1 });
  if (!tweets) res.status(404).json({ notweetsfound: 'No tweets found' });
  else res.json(tweets);
});

router.get('/user/:userId', async (req, res) => {
  const tweets = await Tweet.find({ user: req.params.userId });
  if (!tweets) res.status(404).json({ notweetsfound: 'No tweets found' });
  else res.json(tweets);
});

router.get('/:id', async (req, res) => {
  const tweet = await Tweet.findById(req.params.id);
  if (!tweet) res.status(404).json({ notweetfound: 'No tweet found with that ID' });
  else res.json(tweets);
});

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { text } = req.body;
  const { errors, isValid } = validateTweetInput(text);

  if (!isValid) return res.status(400).json(errors);

  const newTweet = new Tweet({
    text,
    user: req.user.id,
  });

  await newTweet.save();

  res.json(newTweet);
});

module.exports = router;
