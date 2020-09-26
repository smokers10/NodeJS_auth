const router = require('express').Router()
const authRoute = require('./auth')
const { seekerAccess, companyAccess } = require('../config/apiGuard')

router.use('/auth', authRoute)

router.get('/user', seekerAccess, (req, res) => res.json({ msg: 'hallo user', user: req.user }))
router.get('/company', companyAccess, (req, res) => res.json({ msg: 'hallo company', user: req.user }))

module.exports = router