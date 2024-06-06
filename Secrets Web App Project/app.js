const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const encrypt = require('mongoose-encryption');

var app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/secrets");
const trySchema = new mongoose.Schema({
    email: String,
    password: String
});
const secret = "thisissecret";
trySchema.plugin(encrypt,{secret:secret,encryptedFields:["password"]});

const item = mongoose.model("second",trySchema);
app.get("/",function(req,res){
    res.render("home");
});
app.post("/register",function(req,res){
    const newUser = new item({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save()
    .then(() => {
        res.render("secrets");
    })
    .catch(error => {
        console.log(error);
        // Optionally, you can render an error page or send an error response
        res.status(500).send("An error occurred while saving the user.");
    });
});
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    item.findOne({ email: username })
        .then(foundUser => {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render("secrets");
                } else {
                    res.status(401).send("Incorrect password."); // Optionally handle incorrect password
                }
            } else {
                res.status(404).send("User not found."); // Optionally handle user not found
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("An error occurred while finding the user.");
        });
});

app.post("/submit", (req, res) => {
    res.redirect("/success");
});
app.get("/login",function(req,res){
    res.render("login");
});
app.get("/register",function(req,res){
    res.render("register");
});
app.get("/submit",function(req,res){
    res.render("submit");
});
app.get("/success",function(req,res){
    res.render("success");
});
app.listen(9000,function(){
    console.log("Server started");
});
