//middleware function
function loggedOut(req, res, next){
    // check for session if true user is logged in
    if(req.session && req.session.userId){
        return res.redirect('/profile');
    }

    // pass execu to next middleware
    return next();
}

function requiresLogin(req, res, next){
    if(req.session && req.session.userId){
        // pass to the next middleware
        return next();
    }else{
        var err= new Error('You must be logged in to view this page.');
        err.status=401;
        return next(err);
    }
}

module.exports.loggedOut=loggedOut;
module.exports.requiresLogin=requiresLogin;

