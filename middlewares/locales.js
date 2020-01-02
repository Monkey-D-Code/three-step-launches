

module.exports = (req,res,next)=>{
    res.locals.csrfToken = req.csrfToken();
    res.locals.isAuthenticated  = req.session.isAuthenticated;
    res.locals.user = req.session.user;
    next();
}