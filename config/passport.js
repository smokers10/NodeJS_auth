const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const { User, Company } = require('../models')

function SessionContruct(userID, model) {
    this.userID = userID
    this.model = model
}

module.exports = function (passport) {
    //Strategy
    passport.use(
        'user',
        new localStrategy({ usernameField: 'email' }, (email, password, done) => {
            User.findOne({ email })
                .then(user => {
                    if (!user) return done(null, false, { message: 'User not found' })
                    const isMatch = bcrypt.compareSync(password, user.password)
                    if (!isMatch) return done(null, false, { message: 'Password is wrong' })
                    return done(null, user)
                })
                .catch(err => console.log(err))
        })
    )

    passport.use(
        'company',
        new localStrategy({ usernameField: 'email' }, (email, password, done) => {
            Company.findOne({ email })
                .then(user => {
                    if (!user) return done(null, false, { message: 'Company not found' })
                    const isMatch = bcrypt.compareSync(password, user.password)
                    if (!isMatch) return done(null, false, { message: 'Password is wrong' })
                    return done(null, user)
                })
        })
    )

    //Serialize and deserialize user
    passport.serializeUser(function (user, done) {
        let model = 'user'
        const protoType = Object.getPrototypeOf(user)
        protoType === User.prototype ? model = 'user' : model = 'company'
        const sescon = new SessionContruct(user.id, model)

        done(null, sescon)
    })

    passport.deserializeUser(function (sescon, done) {
        if (sescon.model == 'user') {
            User.findOne({ _id: sescon.userID })
                .select(['_id', 'first_name'])
                .then(user => done(null, user))
                .catch(err => done(err, false))
        }
        
        else if (sescon.model = 'company') {
            Company.findOne({ _id: sescon.userID })
                .select(['_id', 'name'])
                .then(user => done(null, user))
                .catch(err => done(err, false))
        }
    })
}