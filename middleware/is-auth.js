module.exports = (req, res, next) => {
    console.log("net")
    console.log(req.session)
    if (req.session.isAuth) {
        console.log(req.session)
        next();
    } else {
       req.session.error = "You have to Login first";
        res.redirect("/login");
    }
};

