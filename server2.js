const express = require("express")
require("dotenv").config();
const mongoose = require("mongoose")
const userRoute = require("./routes/users")
const passport = require("passport")
const app = express();

mongoose.connect(process.env.mongo_url,{
    useNewUrlParser:true,useUnifiedTopology:true}
)
.then(() => console.log("connected to mongoDB"))
.catch(err => console.log(err))

//middleware
app.use(express.json())
app.use(passport.initialize());
require("./routes/passport")(passport)

app.use("/api",userRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=> {console.log("server is running")})