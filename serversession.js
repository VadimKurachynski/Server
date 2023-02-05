const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);
const config = require('config');
const appController = require('./controllers/appController');
const cors=require("cors");
const isAuth = require("./middleware/is-auth");
// const connectDB = require('./config/dbMn');
const dbPg = require('./controllers/queries');
const mongoose = require("mongoose");
// const mongoURI = config.get('mongoURI');
mongoURI="mongodb://127.0.0.1:27017/sessions";
// const dbMn = config.get('mongoURI')
mongoose.set('strictQuery', false);
const app = express();
const port = 5001;
console.log("тут1")

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



 connectDB();





console.log("тут2")
const store = new MongoDBStore({
    uri: mongoURI,
    collection: "mySessions",
});
app.use(cors({credentials: true, origin: 'http://localhost:3001'}));
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
// app.get('/api/theme', isAuth,dbPg.getQuestionAll);//access to questions
app.get('/api/themesname', dbPg.getQuestionAllName);//access to questions

//------------------------------------------------------------
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})