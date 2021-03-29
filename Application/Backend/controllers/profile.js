const { response } = require("express");

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

const handleSubmit = (db) => (req, res) => {
    const { certid } = req.params
    db('users')
        .where({certid})
        .update({
            submission: new Date()
        })
        .then(response => {
            if(response) {
                res.status(200).json('succes')
            } else {
                res.status(400).json('unable to update')
            }
        })
        .catch(err => res.status(404).json('error during the submission.'))
}

module.exports = {
    handleProfile: handleProfile
}