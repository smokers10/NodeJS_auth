const router = require('express').Router()

router.get('/', async (req, res) => {
    res.json({msg:'hello user'})
})

module.exports = router