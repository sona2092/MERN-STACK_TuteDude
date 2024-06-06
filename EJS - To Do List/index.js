const express = require("express");
const bodyparser = require("body-parser");

//for express
var app = express();
//for ejs
app.set("view engine","ejs");
//for describing the express that all the static files are in this public folder
app.use(express.static('public'));
//for body-parser
app.use(express.urlencoded({extended: true}));

//empty array
var items = [];
var example = "working";
app.get("/",function(req,res){
    //passing the values of items into ejes
    res.render("list",{ejes: items});
});

app.post("/",function(req,res){
    var item = req.body.e1;
    //adding values to array items
    items.push(item);
    //redirecting user to home page
    res.redirect("/");
});

app.listen(8000,function(){
    console.log("Server started");
});