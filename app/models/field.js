const mongoose = require('mongoose')

const fieldSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const model = mongoose.model('Field',fieldSchema)
module.exports = model