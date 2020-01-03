const express = require('express');
const jsonfile = require('jsonfile')
var cors = require('cors');
var bodyParser = require('body-parser');
const fs = require('fs');
const http = require("http");
var qs = require('qs');
const request = require('request');

var app = express();
const corsOptions = {
    origin: [
        '127.0.0.1:4200'
    ],
    methods: 'GET, POST',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials :  true
}
app.use(bodyParser.urlencoded({extended: 'false'}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Max-Age", "86400");
    next();
});
app.use(cors(corsOptions));


const account = "account.json"

var accountDB = {};

jsonfile.readFile(account)
        .then((obj) => {
            obj.users.forEach(element => {
                accountDB[element.userName] = {
                    password: element.password,
                    patient_id: element.patient_id 
                }; 
            });
        })
        .catch(error => console.error(error))

app.use(cors(corsOptions));

app.post('/users', function(req, res, next){
    
    console.log("aaa123", req.body);
    
    // res.send(req);
    console.log("DB", accountDB);
    if(accountDB.hasOwnProperty(req.body.userName)){
        console.log("success");
        if(accountDB[req.body.userName].password == req.body.password)
            res.status(200).json({
                "patient_id": accountDB[req.body.userName].patient_id,
                "userName": req.body.userName
            });
        else
            res.status(404).json({"message": "password error"});
    }else{
        console.log("fail");
        res.status(404);
        res.json({"message":"username error"});
    }
})

app.post('/users/userInfo', (req,res,next)=>{
    console.log("body: ", req.body);
    if(accountDB.hasOwnProperty(req.body.userName) && accountDB[req.body.userName].password == req.body.password){
            res.status(404).json({"message": "password has existed"});
    }else{
        accountDB[req.body.userName] = {
            password: req.body.password,
            patient_id: accountDB[req.body.userName].patient_id
        };
        var obj = {
            "users": []
        }
        for(const property in accountDB){
            obj.users.push({
                "userName": property,
                "password": accountDB[property].password,
                "patient_id": accountDB[property].patient_id
            })
        }
        let data = JSON.stringify(obj);
        fs.writeFileSync('account.json', data);
        res.status(200).json({"message": "update account success"});
    }
})

app.post('/user/create', function(req, res){
    if(accountDB.hasOwnProperty(req.body.userName)){
        res.status(404).json({"message": "username exist"});
    }else{
        console.log("aaa000", req.body);
        var obj = {
            "resourceType": "Patient",
                "name": [{
                    "given": [
                        req.body.name
                    ]
                }
            ]
        }
        request.post({
            headers: {'content-type' : 'application/json'},
            url: "http://hapi.fhir.org/baseR4/Patient?_format=json&_pretty=true",
            body: JSON.stringify(obj)
        }, (error, response, body)=> {
            var patientRes = JSON.parse(body);
            accountDB[req.body.userName] = {
                password: req.body.password,
                patient_id: patientRes.id
            }
            var obj = {
                "users": []
            }
            for(const property in accountDB){
                obj.users.push({
                    "userName": property,
                    "password": accountDB[property].password,
                    "patient_id": accountDB[property].patient_id
                })
            }
            let data = JSON.stringify(obj);
            fs.writeFileSync('account.json', data);
            res.status(200).json({"message": "create account success"});
        })
    }
});

app.delete('/user/delete', function(req, res){
    if(accountDB.hasOwnProperty(req.body.userName)){
        var options = {
            url: "http://hapi.fhir.org/baseR4/Patient/"+ req.body.patient_id + "?_pretty=true",
            hearder: {'content-type' : 'application/json'}
        }
        request.del(options,(err, response, body) =>{
            delete accountDB[req.body.userName];
            var obj = {
                "users": []
            }
            for(const property in accountDB){
                obj.users.push({
                    "userName": property,
                    "password": accountDB[property].password,
                    "patient_id": accountDB[property].patient_id
                })
            }
            let data = JSON.stringify(obj);
            fs.writeFileSync('account.json', data);
            res.status(200).json({"message": "delete account success"});
        });
    }else{
        res.status(404).json({"message": "username doesn't exist"});
    }
}); 

app.get('/test', (req, rest)=>{
    var html = "";
    var obj;
    http.get('http://hapi.fhir.org/baseR4/Patient/56899', (res)=>{
        res.on("data",(data)=>{
            html+=data
        })
        res.on("end",()=>{
            // console.log(html);
            obj = JSON.parse(html);
            rest.json(obj);
        })
    }).on('error', e =>{
        console.log("error", e);
    });
});

app.post('/test2', (req, res)=>{
    var obj = {
        "resourceType": "Patient",
            "name": [{
                "given": [
                    "Hank"
                ]
            }
        ]
    }
    request.post({
        headers: {'content-type' : 'application/json'},
        url: "http://hapi.fhir.org/baseR4/Patient?_format=json&_pretty=true",
        body: JSON.stringify(obj)
    }, (error, response, body)=> {
        console.log(JSON.parse(body));
        res.json(JSON.parse(body));
    })
});

app.post('/users/password', (req,res,next)=>{
    console.log("body: ", req.body);
    if(accountDB.hasOwnProperty(req.body.userName) && accountDB[req.body.userName].password == req.body.oldPassword){
            accountDB[req.body.userName] = {
                password: req.body.newPassword,
                patient_id: accountDB[req.body.userName].patient_id
            };
            var obj = {
                "users": []
            }
            for(const property in accountDB){
                obj.users.push({
                    "userName": property,
                    "password": accountDB[property].password,
                    "patient_id": accountDB[property].patient_id
                })
            }
            let data = JSON.stringify(obj);
            fs.writeFileSync('account.json', data);
            res.status(200).json({"message": "update account success"});
    }else{
        res.status(404).json({"message": "password not match"});
    }
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
