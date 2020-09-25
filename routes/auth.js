const router = require('express').Router()
const passport = require('passport')
const { User, Company } = require('../models')

//Page
router.get('/login', (req, res) => res.render('auth/login'))
router.get('/register', (req, res) => res.render('auth/register'))
router.get('/company/register', (req, res) => { res.render('auth/register_company') })

//Action for user
router.post('/login', (req, res, next) => {
    if (req.body.login_as_company == 'on') {
        passport.authenticate(
            'company', {
            failureRedirect: '/login',
            successRedirect: '/company'
        })(req, res, next)
    } else {
        passport.authenticate(
            'user', {
            failureRedirect: '/login',
            successRedirect: '/user'
        })(req, res, next)
    }
})

router.post('/register', async (req, res) => {
    const user = new User({ ...req.body })
    await user.save()
        .then(() => res.redirect('/login'))
        .catch(err => console.log(err))
})

router.post('/company/register', async (req, res) => {
    const company = new Company({ ...req.body })
    await company.save()
        .then(() => res.redirect('/login'))
        .catch(err => console.log(err))
})

//For both type of user
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router