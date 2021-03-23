var validator = require('validator');


const validation = (...params) => {
    for(const param of params) {
        if (typeof(param) != "string") {
            return false
        }
        if(!validator.isAlphanumeric(param) && !validator.isEmail(param)) {
            return false
        }
    }
    return true
}

module.exports = {
    validation
}