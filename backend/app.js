// main running script

const express = require('express');
const connect = require('./database');
const morgan = require('morgan'); // https://stackoverflow.com/a/64668730/14290793
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('dotenv').config()

require('./models/user');
require('./services/passport');

const submissions = require('./routes/api/submissions');
const authentication = require('./routes/api/authentication');

const app = express();
connect();

app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000, // note maxAge is in milliseconds
        keys: [process.env.COOKIE_KEY]
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Allow CORS Policy-- This prevents a nasty bug 
app.use(cors());

app.use(express.json());

// Log backend requests
app.use(morgan('tiny'));

app.get('/', (req, res) => res.send('Hello world!'));
app.use('/api/submissions', submissions);
app.use('/api/authentication', authentication);
const port = process.env.API_PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
