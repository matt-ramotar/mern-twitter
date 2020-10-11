const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./config/passport')(passport);

const db = require('./config/keys').mongoURI;
const users = require('./routes/api/users');
const tweets = require('./routes/api/tweets');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use('/api/users', users);
app.use('/api/tweets', tweets);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected successfully'))
  .catch(e => console.log(e));

app.listen(port, () => console.log('Server listening on port', port));
