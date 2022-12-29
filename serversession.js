const express =require('express');
const session=require('express-session');
const app =express();
const port = 5000;

app.use(session({
    secret:'key this key',
    resave:false,
    saveUninitialized:false
}))

app.get("/",(req,res)=>{
    console.log(req.session);
    res.send("Hello Session");
});


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
