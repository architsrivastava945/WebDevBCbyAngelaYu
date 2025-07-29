import express from 'express'
const app = express();
const port = 3000;

app.listen(port, ()=>{
    console.log(`the server is running on the port : ${port}`);
})

app.get('/',(req,res)=>{
    res.send("<h1>this is the main page<\h1>")
})

// app.get('/contact',(req,res)=>{
//     res.send("<h1>Phone : 7355547481<\h1>")
// })

// app.get('/about',(req,res)=>{
//     res.send("<h1>this is the about section page. welcome here<\h1>")
// })

app.post('/register', (req, res) => {
    res.sendStatus(201);
})

app.put('/user/archit', (req,res) => {
    res.sendStatus(200);
})

app.patch('/user/archit', (req,res) => {
    res.sendStatus(200);
})

app.delete('/user/archit', (req,res) => {
    res.sendStatus(200);
})