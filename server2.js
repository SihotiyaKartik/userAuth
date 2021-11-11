const express = require("express")
require("dotenv").config();
const mongoose = require("mongoose")
const app = express();

mongoose.connect(process.env.mongo_url,{
    useNewUrlParser:true,useUnifiedTopology:true}
)
.then(() => console.log("connected to mongoDB"))
.catch(err => console.log(err))

//middleware
app.use(express.json())

const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=> {console.log("server is running")})