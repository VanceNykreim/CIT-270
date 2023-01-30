const express = require ("express");

const app = express();

const port = 3000;

const bodyParser = require ('body-parser');

const redis = require ('redis');

const redisClient = redis.createClient({url:"redis://127.0.0.1:6379"});

const {v4: uuidv4} = require('uuid');//universely unique identifier

app.use(bodyParser.json());//application middleware, looks for incoming data

app.use(express.static("public")); //tells frontend where to go (public folder)

app.get("/validate/:loginToken", async(req,res) => {
    res.send("Hello Vance");
    const loginToken =req.params.loginToken;
    const loginUser = await redisClient.hGet('TokenMap',loginToken,loginToken); 
    res.send(loginUser);
});

app.post('/login', async(req, res) => {
    const loginUser = req.body.userName;
    const loginPassword = req.body.password;
    console.log('Login username:'+loginUser);
    const correctPassword = await redisClient.hGet('UserMap', loginUser);
    if (loginPassword==correctPassword){
        const loginToken = uuidv4();
        await redisClient.hSet('TokenMap',loginToken,loginUser);//add token to map
        res.send(loginToken);
    } 
    else {
        res.status(401);//unauthorized
        res.send('Incorrect password for '+loginUser);
    }
});

app.listen(port, () => {
    redisClient.connect();
    console.log("listening");
});