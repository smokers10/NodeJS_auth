const Protected = (req, res, next) => {
    if (req.isAuthenticated()) return next()
    
    res.redirect('/login')
}

const SeekerAccess = (req, res, next) => {
    const { isCompany } = res.locals

    if (req.isAuthenticated() && !isCompany) return next()
    if (req.isAuthenticated() && isCompany) res.redirect('/company')
    res.redirect('/login')
}

const CompanyAccess = (req, res, next) => {
    const { isCompany } = res.locals

    if (req.isAuthenticated() && isCompany) return next()
    if (req.isAuthenticated() && !isCompany) res.redirect('/user')
    res.redirect('/login')
}

module.exports = {
    Protected, SeekerAccess, CompanyAccess
}