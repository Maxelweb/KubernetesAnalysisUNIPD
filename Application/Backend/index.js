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
const profile = require('./controllers/profile');

//importing utils
const auth = require('./utils/authorization')

//hosts and ports
const portEnv = process.env.PORT;
const portFail = 3000;
const hostPostgresEnv = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';

// defining the Express app
const app = express();

//database settings
const db = knex({
  client: 'pg',
  connection: {
    host : hostPostgresEnv,
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

// endpoints
app.get('/', (req, res) => {
  res.json("it's working");
});

app.post('/signin', signin.signinAuthentication(bcrypt, db))

app.post('/register', register.handleRegister(bcrypt, db))

app.get('/profile/:certid', auth.requireAuth, profile.handleProfile(db))

app.post('/profile/:certid', auth.requireAuth, profile.handleSubmit(db))

// starting the server
app.listen(portEnv || portFail, () => {
  console.log(`Server running on http://localhost:${portEnv ? portEnv : portFail}`);
})