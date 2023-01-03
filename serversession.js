const express = require("express");
const bodyParser = require('body-parser');
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const config = require("config");
const appController = require("./controllers/appController");
const isAuth = require("./middleware/is-auth");
const connectDB = require("./config/dbMn");
const dbPg = require('./controllers/queries');
const mongoURI = config.get("mongoURI");
const app = express();
const port = 5000;
connectDB();
const store = new MongoDBStore({
    uri: mongoURI,
    collection: "mySessions",
});

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

//=================== Routes
// Landing Page
app.get("/", appController.landing_page);

// Login Page
app.get("/login", appController.login_get);
app.post("/login", appController.login_post);

// Register Page
app.get("/register", appController.register_get);
app.post("/register", appController.register_post);

// Dashboard Page
app.get("/dashboard", isAuth, appController.dashboard_get);
app.post("/logout", appController.logout_post);

//------------------------------------------------------------
app.get("/api/auth",appController.ApiAuth_get);//authentication
app.get('/api/nom/:id',isAuth, dbPg.getQuestion);//access to questions
//------------------------------------------------------------

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})