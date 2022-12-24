const express = require('express');
const bodyParser = require ('body-parser');
const https = require('https');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on Port: 3000.");
});

app.get("/failure",function(req,res){
    res.redirect("/");
});

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var email = req.body.email;

    var data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/13--------";
    const options = {
        method: "POST",
        auth:"root-user-7789657:05ed###bde2859ce80-us8"
    }

    const request = https.request(url, options, function(response){
        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", function(params) {
            console.log(JSON.parse(params));
        });
    });

    request.write(jsonData);
    request.end();

});

