const express = require("express");
const jwt = require("jsonwebtoken")
const app = express();
require("dotenv").config();
app.use(express.json());
const posts = [
    {
        username:"Kartik",
        title:"post 1"
    },
    {
        username:"John",
        title:"post 2"
    }
]

app.get('/posts', authenticateToken, (req,res) => {
    jwt.verify(req.token,process.env.token_key,(err,data) => {
        
        if(err){res.sendStatus(403)}
        else{
            console.log(data)
            res.json(posts.filter(post => post.username === data.user.name));
        }
    })
    
})

app.post('/login',(req,res)=> {
    const username = req.body.username
    const user = {name:username}
    //serializing user with secret key present in .env file
    jwt.sign({user},process.env.token_key,(err,token) => {
        res.json({token});
    });
    
});

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if(token == null) return res.sendStatus(401)
    
    req.token = token;
    next();
    
}

app.listen(8000, ()=> {
    console.log("server is  running");
})