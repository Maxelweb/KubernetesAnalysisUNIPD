const handleSubmit = (db) => (req, res) => {
    const { certid } = req.params
    const { cf, code } = req.body

    if(certid === cf) {
        /**
         * TODO: create timestamp field on users table to update on every form submited 
         *  timestamp is used to order the ranking, only the firste 100 people achieve the bonus for istance. 
        */
    } else {
        return Promise.reject(res.status(400).json('incorrect form submission'));
    }
}

module.exports = {
    handleSubmit: handleSubmit
}