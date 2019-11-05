const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');

const app = express();

app.use(bodyParser.json());

//access mongoDB URI
const db = require('./config/keys.js').mongoURI;

//use routes
app.use('./routes/api/items.js');

//connect to mongo
//.then because connect() allows promise, we can catch errors with .catch 
mongoose.connect(db)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

//it could be on an external server, or port 5000
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));