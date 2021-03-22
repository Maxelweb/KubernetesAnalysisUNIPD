const handleSignin = (req, res, database, bcrypt) => {
    const {email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json('incorrect form submission')
    }
    database.select('email', 'hash')
}