const validator = require('../utils/validator')

const handleSignin = (req, res, bcrypt, db) => {
    const {email, password } = req.body;
    
    const params = validator.validation(email, password)
    
    if (params) {
        db.select('email', 'hash').from('login')
            .where('email', '=', email)
            .then(data => {
                const isValid = bcrypt.compareSync(password, data[0].hash);
                if (isValid) {
                    return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0]);
                    }).catch(err => res.status(400).json('Unable to get user'));
                } else {
                    res.status(400).json('Wrong credentials');
                }
            })
    } else {
        res.status(400).json('incorrect form submission');
    } 
}

module.exports = {
    handleSignin: handleSignin
};