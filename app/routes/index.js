const router = require('express').Router()
const authRouter = require('./auth')
const userRouter = require('./user')
const companyRouter = require('./company')

router.use('/', authRouter)
router.use('/user', userRouter)
router.use('/company', companyRouter)

//Landing page
router.get('/', (req, res) => res.render('home'))

module.exports = router