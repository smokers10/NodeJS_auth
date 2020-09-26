const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const educationSchema = mongoose.Schema({
    institute: {
        type: String,
        required: true
    },

    predicate: {
        type: Number,
        min: 1,
        max: 6,
        default: 1,
        /**
         *  1. SMA/SMK
         *  2. DIPLOMA
         *  3. SARJANA
         *  4. MAGISTER
         *  5. DOKTORAL
         *  6. DLL
         */
    },

    first_year: {
        type: String,
        required: true
    },

    end_year: {
        type: String,
        required: true
    },

    still_active: {
        type: Boolean,
        default: false
    }
})

const experienceSchema = mongoose.Schema({
    company: {
        type: String,
        required: true
    },

    position: {
        type: String,
        required: true
    },

    first_year: {
        type: String,
        required: true
    },

    end_year: {
        type: String,
        required: true
    },

    descriptive: {
        type: String,
        required: true
    }
})

const skillSchema = mongoose.Schema({
    skill_name: {
        type: String
    },

    skill_score: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    }
})

const documentSchema = mongoose.Schema({
    label: {
        type: String,
        required: true
    },

    file_location: {
        type: String,
        required: true
    },
})

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },

    last_name: {
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

    address: String,

    handphone: String,

    birth: Date,

    gender: {
        type: Number,
        min: 1,
        max: 3,
        default: 3,
        /**
         * 1. male
         * 2. female
         * 3. not chossed
         */
    },

    is_employed:{
        type:Boolean,
        default:false
    },

    educations: [educationSchema],

    experiences: [experienceSchema],

    skills: [skillSchema],

    documents: [documentSchema]
})

//schema hooks
userSchema.pre('save',function(next){
    const user = this
    if (user.isModified('password')) {
        const salt = bcrypt.genSaltSync(10)
        user.password = bcrypt.hashSync(user.password, salt)
    }
    next()
})

//module export
const model = mongoose.model('User', userSchema)
module.exports = model
