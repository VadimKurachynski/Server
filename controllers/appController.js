const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.landing_page = (req, res) => {
    res.render("landing");
};

// ---нажали кнопку Login---------
exports.login_get = (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render("login", {err: error});
};
exports.login_post = async (req, res) => {
    console.log(req.body)
    const {username, password} = req.body;
    const user = await User.findOne({username});
    console.log(user)
    if (!user) {
        req.session.error = "Invalid Credentials";
        // return res.redirect("/login");
        return res.status(200).json({ Auth: 0 })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch) {
        req.session.error = "Invalid Credentials";
        // return res.redirect("/login");
        return res.status(200).json({ Auth: 0 })
    }

    req.session.isAuth = true;
    req.session.username = user.username;
     // res.redirect("/dashboard");
    return res.status(200).json({ Auth: 1 })
};
//--------------------------------------------------
exports.register_get = (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render("register", {err: error});
};

exports.register_post = async (req, res) => {
    const {username, email, password} = req.body;

    let user = await User.findOne({email});

    if (user) {
        req.session.error = "User already exists";
        return res.redirect("/register");
    }

    const hasdPsw = await bcrypt.hash(password, 12);

    user = new User({
        username,
        email,
        password: hasdPsw,
    });

    await user.save();
    res.redirect("/login");
};

exports.dashboard_get = (req, res) => {
    const username = req.session.username;
    res.render("dashboard", {name: username});
};

// удаление сессии-------------------
exports.logout_post = (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        // res.redirect("/login");
         res.status(200).json({ Auth: 0 })
    });
};
//------------------------------------

exports.ApiAuth_get = (req, res) => {
    (req.session.isAuth) ? res.status(200).json({ Auth: 1 }):res.status(200).json({ Auth: 0 });
}
