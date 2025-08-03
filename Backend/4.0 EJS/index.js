import express from "express";
import morgan, { format } from "morgan";

const app = express();
const port = 3000;
const today = new Date();
const weekday = today.getDay();

var logger = app.use(morgan('common'));

app.get("/", (req, res) => {
    if (weekday == 0){
        res.render("index.ejs",{
        DayType : "a weekend",
        advice : "it's time have fun!"
    })
    }else{
        res.render("index.ejs",{
        DayType : "a weekday",
        advice : "it's time to work hard!"
    });
    }
});

app.listen(port,()=>{
    console.log(`Listening to port : ${port}`);
});

