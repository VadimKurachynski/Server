const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);
const config = require('config');
const appController = require('./controllers/appController');
const cors = require("cors");
const isAuth = require("./middleware/is-auth");
const dbPg = require('./controllers/queries');
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const app = express();
const configMy = require('./config/config')
const port = configMy.Port;
const URI = configMy.URImy;
mongoURI = "mongodb://127.0.0.1:27017/sessions";
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Something went wrong with Database connection");
        process.exit(1);
    }
};
const store = new MongoDBStore({
    uri: mongoURI,
    collection: "mySessions",
});
connectDB();
app.use(cors({credentials: true, origin: `${URI}`}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);
//------------------------------------------------------------
app.post("/api/login", appController.login_post);
app.post("/api/logout", appController.logout_post);
app.get("/api/auth", appController.ApiAuth_get);//authentication
app.get('/api/theme', isAuth, dbPg.getQuestionAll);//access to questions
app.get('/api/themesname', dbPg.getQuestionAllName);//access to questions

//------------------------------------------------------------
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})