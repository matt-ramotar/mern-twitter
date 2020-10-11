const mongoose = require('mongoose');

const express = require('express');
const app = express();
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected successfully'))
  .catch(e => console.log(e));

const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello world'));

app.listen(port, () => console.log('Server listening on port', port));
