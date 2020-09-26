const passport = require('passport')

function seekerAccess(req, res, next) {
    passport.authenticate('jwt-user', { session: false }, (err, user, info) => {
        if (!user) return res.status(401).json('Unauthorized')

        req.user = user
        next()
    })(req, res, next)
}

function companyAccess(req, res, next) {
    passport.authenticate('jwt-company', { session: false }, (err, user, info) => {
        if (!user) return res.status(401).json('Unauthorized')

        req.user = user
        next()
    })(req, res, next)
}

module.exports = {
    seekerAccess, companyAccess
}