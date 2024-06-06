const express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

const mongoose = require("mongoose");

//name of the database
mongoose.connect("mongodb://localhost:27017/todo");
const trySchema = new mongoose.Schema({
    name: String
});

const item = mongoose.model("task",trySchema);
const todo = new item({
    name: "Create some videos"
});
const todo2 = new item({
    name: "Learn DSA"
});
const todo3 = new item({
    name: "Learn React"
});
const todo4 = new item({
    name: "Take a break"
});
// todo2.save();
// todo3.save();
// todo4.save();
app.get("/",function(req,res){
    item.find().then(result => {
        // Handle the result here
        //console.log(result);
        res.render("list",{ejes: result});
    })
    .catch(error => {
        // Handle any errors here
        console.log(error);
    });
});

app.post("/",function(req,res){
    const itemName = req.body.e1;
    const todo5 = new item({
        name: itemName
    });
    todo5.save();
    res.redirect("/");
});
app.post("/delete",function(req,res){
    const checked = req.body.cb;
    item.findByIdAndDelete(checked).then(removedItem => {
        console.log('Item removed:', removedItem);
    })
    .catch(err => {
        console.error('Error occurred:', err);
    });
});
app.listen("3000",function(){
    console.log("Server is running")
});