const express = require('express');
const bodyParser = require ('body-parser');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function(){
    console.log("Server started on Port: 3000.");
});

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var email = req.body.email;

});

