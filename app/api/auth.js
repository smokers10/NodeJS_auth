const router = require('express').Router()
const { Issuetoken } = require('../lib/utils')
const { User, Company } = require('../models')
const bcrypt = require('bcryptjs')

/**
 * User authentication end-points
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)

    await User.findOne({ email })
        .then(user => {
            if (!user) res.json({ success: false, msg: 'no user found' })

            const matchPassword = bcrypt.compareSync(password, user.password)
            if (!matchPassword) res.json({ success: false, msg: 'wrong password' })
            else {
                const token = Issuetoken(user)
                res.json({ success: true, token, user })
            }
        })
        .catch(err => console.log(err))
})

router.post('/register', async (req, res) => {
    const user = new User({ ...req.body })

    await user.save()
        .then(user => {
            const token = Issuetoken(user)
            res.json({ success: true, token, user })
        })
        .catch(err => res.json({ success: false, error: err.message }))
})

/**
 * Company authentication end-points
 */
router.post('/company/login', async (req, res) => {

})

router.post('/company/register', async (req, res) => {
    const user = new Company({ ...req.body })
    await user.save()
        .then(user => {
            const token = Issuetoken(user)
            res.json({ success: true, token, user })
        })
        .catch(err => res.json({ success: false, error: err.message }))
})

module.exports = router