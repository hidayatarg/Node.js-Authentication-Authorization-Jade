//middleware function
function loggedOut(req, res, next){
    // check for session if true user is logged in
    if(req.session && req.session.userId){
        return res.redirect('/profile');
    }

    // pass execu to next middleware
    return next();
}

module.exports.loggedOut=loggedOut;

