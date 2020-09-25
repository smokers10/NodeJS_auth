const express = require('express'),
    exphbs = require('express-handlebars'),
    session = require('express-session'),
    dotenv = require('dotenv'),
    DB = require('mongoose'),
    cors = require('cors'),
    passport = require('passport'),
    { Company } = require('./models')

//App
const app = express()

//Dotenv
dotenv.config()

//Serving static file
app.use(express.static('public'))

//View Engine
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

//Passport
require('./config/passport')(passport)

//Using depedencies or modules
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors(require('./config/cors')))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())

//Global variables
app.use(function (req, res, next) {
    let user = {}
    const isAuthenticated = req.user ? true : false
    const prototype = isAuthenticated ? Object.getPrototypeOf(req.user) : false
    const isCompany = prototype === Company.prototype ? true : false

    //set user object based on type of the user
    if (isAuthenticated & isCompany) user = {
        name: req.user.name
    }

    if (isAuthenticated & !isCompany) user = {
        name: req.user.first_name
    }

    //set all necesary data to locals global object
    res.locals.isAuthenticated = isAuthenticated
    res.locals.isCompany = isCompany
    res.locals.user = user
    next()
})

//Router
app.use('/', require('./routes'))

//Connect to mongoDB 
DB.connect(process.env.MONGO_URI, require('./config/mongodb'))
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err))

//Start server
app.listen(process.env.PORT, (err) => {
    if (err) console.log(err)
    else console.log(`server running - http://localhost:${process.env.PORT}`)
})