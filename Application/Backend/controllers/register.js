const handleRegister = (req, res, bcrypt, db) => {
    const {name, surname, email, password, certid} = req.body;
  
    console.log(name, surname, email, password, certid)

    //const hash = bcrypt.hashSync(password)
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
            name,
            surname,
            certid,
            email: loginEmail[0]
          })
          .then(user => {
            res.json(user[0]);
          })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register'));
    
}  

module.exports = {
    handleRegister: handleRegister
  };