const handleProfile = (db) => (req, res) => {
    const { certid } = req.params
    db.select('*')
        .from('users')
        .where({ certid })
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(404).json('Not Found!')
            }
        })
        .catch(err => res.status(404).json('Error getting user.'));
}

module.exports = {
    handleProfile: handleProfile
}