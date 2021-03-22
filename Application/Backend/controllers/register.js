const handleRegister = (req, res, bcrypt, db) => {
    const {name, surname, email, password, certid} = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    db.transaction(trx => {
        trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        surname: surname,
                        certid: certid
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
                    .then(trx.commit)
                    .catch(trx.rollback);
            });
        }).catch(err => res.status(400).json('Unable to register'));
}  

module.exports = {
    handleRegister: handleRegister
};