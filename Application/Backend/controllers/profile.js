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
                res.status(200).json('success')
            } else {
                res.status(400).json('unable to update')
            }
        })
        .catch(err => res.status(404).json('error during the submission.'))
}

const handleSubmission = (db) => (req, res) => {
    const { certid } = req.body
    db('users')
        .where({certid})
        .update({
            submission: new Date()
        })
        .then(response => {
            if(response) {
                res.status(200).json('success')
            } else {
                res.status(400).json('unable to update')
            }
        })
        .catch(err => res.status(404).json('error during the submission.'))
}

const getRank = (db) => (req, res) => {
    db.select('*')
        .from('users')
        .whereNot('submission', null)
        .orderBy('submission', 'ASC')
        .limit(100)
        .offset(0)
        .then(list => {
            if (list.length) {
                res.json(list)
            } else {
                res.status(404).json('No users have submitted the from!')
            }
        })
        .catch(err => res.status(404).json('Error getting user ranking.'));
}

module.exports = {
    handleProfile: handleProfile,
    handleSubmit: handleSubmit,
    handleSubmission: handleSubmission,
    getRank: getRank
}