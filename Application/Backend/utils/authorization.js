const redisClient = require('../controllers/signin').redisClient

const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization) {
        res.status(401).json('Unauthorized')
    }
    return redisClient.get(authorization, (err, replay) => {
        if (err || !replay) {
            res.status(401).json('Unauthorized')
        }
        return next();
    })
    
}

module.exports = {
    requireAuth
}