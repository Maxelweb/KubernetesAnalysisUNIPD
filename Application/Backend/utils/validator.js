var validator = require('validator');

/**
 * Check if the params provided during the form submission are strings, alphanumeric or email. 
 * @param  {...any} params 
 * @returns true or false
 */
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