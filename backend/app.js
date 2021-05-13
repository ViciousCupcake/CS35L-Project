// main running script

const express = require('express');
const connect = require('./database');
const morgan = require('morgan')
const cors = require('cors');
require('dotenv').config()

const submissions = require('./routes/api/submissions');
const app = express();
connect();

// Allow CORS Policy-- This prevents a nasty bug 
app.use(cors());

app.use(express.json());

// Log backend requests
app.use(morgan('tiny'));

app.get('/', (req, res) => res.send('Hello world!'));
app.use('/api/submissions', submissions);
const port = process.env.API_PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
