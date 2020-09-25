const router = require('express').Router()
const { CompanyAccess } = require('../../config/guard')

router.get('/', CompanyAccess, (req, res) => res.render('company/home'))

module.exports = router