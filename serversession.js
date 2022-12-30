const express =require('express');
const session=require('express-session');
const mongoose=require("mongoose");
const app =express();
const port = 5000;

app.use(session({
    secret:'key this key',
    resave:false,
    saveUninitialized:false
}))

app.get("/",(req,res)=>{
    req.session.isAuth=true;
    req.session.is=false;
    req.session.hello=67;
    console.log(req.session);
    console.log(req.session.id);
    res.send("Hello Session");
});


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
