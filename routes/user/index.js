const router = require('express').Router()
const { Protected } = require('../../config/guard')

router.get('/', Protected, (req, res) => res.render('user/home'))

module.exports = router