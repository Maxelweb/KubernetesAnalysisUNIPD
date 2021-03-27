const validator = require('../utils/validator')
const jwt = require('jsonwebtoken');
const redis = require("redis");
const redisClient = redis.createClient((process.env.REDIS_PORT ? process.env.REDIS_PORT : 6379), (process.env.REDIS_HOST ? process.env.REDIS_HOST : '127.0.0.1'));

/**
 * Check in the databse if a user exist
 * @param req 
 * @param res 
 * @param bcrypt library for crypt a password
 * @param db reference to the database
 * @returns Promise
 */
const handleSignin = (bcrypt, db, req, res) => {
    const {email, password } = req.body;
    
    const params = validator.validation(email, password)
    
    if (params) {
        return db.select('email', 'hash').from('login')
            .where('email', '=', email)
            .then(data => {
                const isValid = bcrypt.compareSync(password, data[0].hash);
                if (isValid) {
                    return db.select('*').from('users')
                        .where('email', '=', email)
                        .then(user => user[0])
                        .catch(err => Promise.reject('Unable to get user'));
                } else {
                    Promise.reject('Wrong credentials');
                }
            })
    } else {
        return Promise.reject(res.status(400).json('incorrect form submission'));
    } 
}

/**
 * Retrieve the certid form the token for profile managing
 * @param req 
 * @param res 
 * @returns 
 */
const getAuthTokenCertid = (req, res) => {
    const { authorization } = req.headers;
    return redisClient.get(authorization, (err, reply) => {
        console.log(reply)
        if(err || !reply) {
            return res.status(400).json('Unauthorized');
        }
        return res.json({certid: reply});
    })
}

/**
 * sign the token with the C.F. of the user that is attempting to login
 * @param certid
 * @returns the sign for token
 */
const signToken = (certid) => {
    const payload = { certid }
    return jwt.sign(payload, 'supersecretyouneverknow', { expiresIn: '2 days' })
}

/**
 * store the token into redis database
 * @param key 
 * @param value 
 * @returns 
 */
const setToken = (key, value) => {
    return Promise.resolve(redisClient.set(key, value))
}

/**
 * Function that after the "first" login create a session that expires in 1 days, after this amount of time the user
 * need to do the signin process again
 * @param user object with all the information about the user that attempt to login
 * @returns object with C.F. to use in the get request for the profile
 */
const createSession = (user) => {
    const { certid } = user;
    const token = signToken(certid)
    return setToken( token, certid ).then(() => {
        return {
            certid,
            token
        }
    }).catch(err => console.error(err))
}

/**
 * Handle all the signin process, if a user already signed in and there is a token session 
 * return the actual authorization token. Otherwise, it will return the user from the database and then create the session
 * N.B.: set into the frontend header the authorization field with the token created as value.
 * @param db 
 * @param bcrypt 
 * @returns the ID of the authorization or create a session
 */
const signinAuthentication = (db, bcrypt) => (req, res) => {
    const { authorization } = req.headers;
    return authorization ? getAuthTokenCertid(req, res) : 
        handleSignin(db, bcrypt, req, res)
            .then(data =>  data.certid && data.email ? createSession(data) : Promise.reject(data))
            .then(session => res.json(session))
            .catch(err => res.status(400).json(err))
}

module.exports = {
    signinAuthentication: signinAuthentication,
    redisClient
};