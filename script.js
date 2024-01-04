const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");


dotenv.config({path:'./env'});
const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE,
    port:'3308'
});


const publicDir = path.join(__dirname, './public');
app.use(express.static(publicDir));


// use the data sent by any form in the html
app.use(express.urlencoded({
    extended:false
}))
// this statement parses the data sent by the form json format  (obj key would be the name parameter in the HTML form)
app.use(express.json())

// set the render engine to handlebars
app.set('view engine','hbs');
db.connect((error)=>{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log("mysql server started succesfully:");

    }
})

//Routes are here 
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));

app.get("/auth/login.html",(req,res)=>{
    res.render("login");
});
app.get("/auth/register",(req,res)=>{
    res.render("login");
});

app.listen(5000, ()=>{
    console.log("server started at 5000");
})