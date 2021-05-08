const validator = require('../utils/validator')

/**
 *  register function
 * @param req 
 * @param res 
 * @param bcrypt library for crypt a password
 * @param db reference to the database
 * @returns 
 */
const handleRegister = (bcrypt, db) => async (req, res) =>{
    const {name, surname, email, password, confirmPassword, certid} = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const params = validator.validation(name, surname, email, password, certid)
    
    if (params && password === confirmPassword) {  
        try{
            await db.transaction(async trx => {
                await trx.insert({
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
                    })
                    .catch(err => res.status(400).json('something in the connection with database went wrong'));
                });
        } catch {
            res.status(400).json('somthing went wrong in the process of registring went wrong')
        }
    }
    else {
        return res.status(400).json('incorrect form submission, check your datas');
    }
}  

module.exports = {
    handleRegister: handleRegister
};