const express = require("express");
const app = express();

const posts = [
    {
        username:'Kartik',
        title:'post 1'
    },
    {
        username:'Jonh',
        title:'post 2'
    }
]

app.get('/posts',(req,res) => {
res.json(posts);
})

app.listen(8000)