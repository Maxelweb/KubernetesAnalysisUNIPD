const validator = require('../utils/validator')

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

const signinAuthentication = (db, bcrypt) => (req, res) => {
    const { authorization } = req.headers;
    return authorization ? getAuthTokenId() : 
    handleSignin(db, bcrypt, req, res)
        .then(data => res.json(data))
        .catch(err => res.status(400).json(err))
}

module.exports = {
    signinAuthentication: signinAuthentication
};