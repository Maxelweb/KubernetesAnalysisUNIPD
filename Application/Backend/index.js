// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const knex = require('knex');
require('dotenv').config()


//importing the controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');

//ports
const portEnv = process.env.PORT;
const portFail = 3000;

// defining the Express app
const app = express();

//database settings
const db = knex({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
  }
});

// adding Helmet to enhance API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', (req, res) => {
  res.send("it's working");
});

//main functionalities
app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt))
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))

// starting the server
app.listen(portEnv || portFail, () => {
  console.log(`Server running on http://localhost:${portEnv ? portEnv : portFail}`);
})