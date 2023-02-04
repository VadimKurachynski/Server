const bcrypt = require("bcryptjs");
// const User = require("../models/User");


// ---нажали кнопку Login---------

exports.login_post = async (req, res) => {
      const {username, password} = req.body;
    const user = await User.findOne({username});
    if (!user) {
        req.session.error = "Invalid Credentials";
        return res.status(200).json({Auth: 0})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch) {
        req.session.error = "Invalid Credentials";
        return res.status(200).json({Auth: 0})
    }
    req.session.isAuth = true;
    req.session.username = user.username;
    return res.status(200).json({Auth: 1})
};
//--------------------------------------------------
// удаление сессии-------------------
exports.logout_post = (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.status(200).json({Auth: 0})
    });
};
//------------------------------------
exports.ApiAuth_get = (req, res) => {
    (req.session.isAuth) ? res.status(200).json({Auth: 1}) : res.status(200).json({Auth: 0});
}
