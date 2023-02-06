const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);
const config = require('config');
const appController = require('./controllers/appController');
const cors=require("cors");
const isAuth = require("./middleware/is-auth");
const dbPg = require('./controllers/queries');
const mongoose = require("mongoose");
const configMy=require('./config/config')
mongoose.set('strictQuery', false);
const app = express();
const port = configMy.Port;
const URI=configMy.URImy;
mongoURI="mongodb://127.0.0.1:27017/sessions";
 console.log(process.env);
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
// app.set("view engine", "ejs");

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
//------------------------------------------------------------
app.post("/login", appController.login_post);
app.post("/logout", appController.logout_post);
app.get("/api/auth",appController.ApiAuth_get);//authentication
app.get('/api/theme', isAuth,dbPg.getQuestionAll);//access to questions
app.get('/api/themesname', dbPg.getQuestionAllName);//access to questions

//------------------------------------------------------------
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})