const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    about: String,

    address: String,

    website: String,

    field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Field',
    },
})
//schema hooks
companySchema.pre('save', function (next) {
    const company = this
    if (company.isModified('password')) {
        const salt = bcrypt.genSaltSync(10)
        company.password = bcrypt.hashSync(company.password, salt)
    }
    next()
})

const model = mongoose.model('Company', companySchema)
module.exports = model