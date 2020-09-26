const jwt = require('jsonwebtoken')
/**
 * 
 * @param {*} user  user is required to set JWT payload
 */
function Issuetoken(user) {
    const { _id } = user
    const payload = {
        sub: _id,
        iat: Date.now()
    }
    const signToken = jwt.sign(payload, process.env.SECRET)
    const token = `Bearer ${signToken}`
    return token
}


module.exports = {
    Issuetoken
}