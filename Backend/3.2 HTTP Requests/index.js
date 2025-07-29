import express from "express";
const app = express();
const port = 3000;

// app.get('/', (req, res) => {
//     console.log(req.rawHeaders);
// });

// so were sending an response to now

app.get('/',(req, res) => {
    res.send("Hello world!!")
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}.`);
});

