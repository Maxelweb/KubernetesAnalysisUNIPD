const validator = require('../utils/validator')

const handleRegister = (req, res, bcrypt, db) => {
    const {name, surname, email, password, certid} = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const params = validator.validation(name, surname, email, password, certid)
    
    if (params) {  
        db.transaction(trx => {
            trx.insert({
                    hash: hash,
                    certid: certid,
                    email: email
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
                        .catch(trx.rollback);
                });
            });
    }
    else {
        return res.status(400).json('incorrect form submission')
    }
}  

module.exports = {
    handleRegister: handleRegister
};