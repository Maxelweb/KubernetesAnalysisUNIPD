const validator = require('../utils/validator')

/**
 *  register function
 * @param req 
 * @param res 
 * @param bcrypt library for crypt a password
 * @param db reference to the database
 * @returns 
 */
const handleRegister = (bcrypt, db) => (req, res) =>{
    const {name, surname, email, password, confirmPassword, certid} = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const params = validator.validation(name, surname, email, password, certid)
    
    if (params && password === confirmPassword) {  
        db.transaction(trx => {
            trx.insert({
                    hash: hash,
                    certid: certid,
                    email: email,
                    submission: ''
                })
                .into('login')
                .returning('certid')
                .then(cartidLogin => {
                    return trx('users')
                        .returning('*')
                        .insert({
                            email: email,
                            name: name,
                            surname: surname,
                            certid: cartidLogin[0]
                        })
                        .then(user => {
                            res.json(user[0]);
                        })
                        .then(trx.commit)
                        .catch(Promise.reject(trx.rollback));
                })
                .catch(err => Promise.reject(res.status(400).json('something went wrong')));
            });
    }
    else {
        return Promise.reject(res.status(400).json('incorrect form submission'))
    }
}  

module.exports = {
    handleRegister: handleRegister
};