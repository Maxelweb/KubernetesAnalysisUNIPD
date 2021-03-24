const validator = require('../utils/validator')
const jwt = require('jsonwebtoken');


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

const getAuthTokenId = () => {
    console.log('ok')
}

/**
 * sign the token with the email of the user that is attempting to login
 * @param certid
 * @returns the sign for token
 */
const signToken = (email) => {
    const payload = { email }
    return jwt.sign(payload, 'Super_secret_token', {expiresIn: '2 days'})
}

/**
 * Function that after the "first" login create a session that expires in 1 days, after this amount of time the user
 * need to do the signin process again
 * @param user object with all the information about the user that attempt to login
 */
const createSession = (user) => {
    const { certid, email } = user;
    const token = signToken(email)

    console.log(token)
}

/**
 * Handle all the signin process, if a user already signed in and there is a token session 
 * return the actual authorization token. Otherwise, it will return the user from the database and then create the session
 * 
 * @param db 
 * @param bcrypt 
 * @returns the ID of the authorization or create a session
 */
const signinAuthentication = (db, bcrypt) => (req, res) => {
    const { authorization } = req.headers;
    return authorization ? getAuthTokenId() : 
        handleSignin(db, bcrypt, req, res)
            .then(data =>  data.certid && data.email ? createSession(data) : Promise.reject(data))
            .catch(err => res.status(400).json(err))
}

module.exports = {
    signinAuthentication: signinAuthentication
};