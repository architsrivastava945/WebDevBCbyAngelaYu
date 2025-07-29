//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";
import { checkPrime } from "crypto";

const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({extended:true}));

function passCheck(pass){
    if(pass == "Archit"){
        return true;
    }else {
        return false;
    }
    next();
};

app.post("/check",(req, res) => {
    if(passCheck(req.body['password'])){
        res.sendFile(__dirname + "/public/secret.html");
    }else{
        res.sendFile(__dirname + "/public/index.html");
        // res.redirect("/");
    }
});

app.get("/",(req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, ()=>{
    console.log(`server is listening on port : ${port}`);
    console.log(__dirname);
});