const mongoose = require('mongoose')

const jobVacancySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    salary: Number,

    show_salary: {
        type: Boolean,
        default: false
    },

    description: {
        type: String,
        required: true
    },

    min_experience: {
        type: Number,
        required: true
    },

    schedule_type: {
        type: Number,
        min: 1,
        max: 3,
        required: true
        /**
         * 1.full time
         * 2.part time/freelance
         * 3.internship
         */
    },

    end_date: {
        type: Date,
        required: true
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },

    field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Field',
        required: true
    }
})

const model = mongoose.model('jobVacancy', jobVacancySchema)
module.exports = model