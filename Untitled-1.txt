const express = require('express');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const mongoose = require("mongoose");
const app = express();
const UserModel=require("./models/User");

const port = 5000;
const mongoURI = 'mongodb://localhost:27017/sessions'

mongoose.set("strictQuery", false);
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
}).then((res) => {
    console.log("MongoDB Connected");
});
const store = new MongoDBSession({
    uri: mongoURI,
    collection: 'mySessions',
})
app.use(session({
    secret: 'key this key',
    resave: false,
    saveUninitialized: false,
    store: store,
}))
app.get("/", (req, res) => {
    req.session.isAuth = true;
    req.session.is = false;
    req.session.hello = 67;
    console.log(req.session);
    console.log(req.session.id);
    res.send("Hello Session");
});
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
