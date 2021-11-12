const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register",(req,res) => {
    User.findOne({email:req.body.email}).then(user => {
        if(user){
            res.status(400).json({email:"Email already exists"});
        }
        else{
            const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            });
            bcrypt.genSalt(10,(err,salt) => {
                bcrypt.hash(newUser.password,salt,(err,hash) => {
                    if(err)throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

router.post("/login", (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then(user => {
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }
        //comapring password with the stored encyrpted password
        bcrypt.compare(password,user.password).then(match => {
            if(match){
                //password matched
                //creating JWT payload
                const payload = {
                    id:user._id,
                    name:user.name
                }

                //signing token
                //token expires in 1 hour
                jwt.sign(payload,process.env.TOKEN_KEY,{expiresIn:3600},(err,token) => {
                    res.json({
                        success:true,
                        token
                    });
                });
            }
            else{
                return res.status(400).json({message:"Password is incorrect"});
            }
        })
    })
})

module.exports = router