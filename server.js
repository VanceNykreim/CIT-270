const express = require ("express");

const app = express();

const port = 3000;

const bodyParser = require ('body-parser');

const redis = require ('redis');

const redisClient = redis.createClient({url:"redis://127.0.0.1:6379"});

const {v4: uuidv4} = require('uuid');//universely unique identifier

app.use(bodyParser.json());//application middleware, looks for incoming data

app.get("/", (req,res) => {
    res.send("Hello Vance");
});

app.post('/login', (req, res) => {
    const loginUser = req.body.userName;
    const loginPassword = req.body.password;
    console.log('Login username:'+loginUser);
    if (loginUser=="FishSticks" && loginPassword=="Tears4Fears?"){
        const loginToken = uuidv4();
        res.send(loginToken);
        res.send("Hello");
    } else {
        res.status(401);//unauthorized
        res.send('Incorrect password for '+loginUser);
    }
});

app.listen(port, () => {
    redisClient.connect();
    console.log("listening");
});