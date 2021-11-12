//FOR userRole like admin/user
const express = require("express")
const app = express()
const {ROLE,users,projects} = require("./userRole/data")
const {userPresent, userRole,canViewProject, canViewAllProject} = require("./userRole/auth")

//middleware
app.use(express.json())
app.use(setUser)

//routes
app.get("/", (req,res) => {
    res.send("Home Page")
})

//only logged in user can access
app.get("/dashboard", userPresent, (req,res) => {
    res.send("Dashboard  Page")
})

//only admin can access
app.get("/admin", userPresent, userRole(ROLE.ADMIN), (req,res) => {
    res.send("Admin Page")
})

//for getting all projects
//all projects can only viewed by admin
app.get("/projects", (req,res) => {
    res.json(canViewAllProject(req.user,projects))
})

//for getting a particular project
app.get("/project/:projectId", setProject, setUser, getProject, (req,res) => {
    res.json(req.project)
})

//checking if user is logged in or not
function setUser(req,res,next){
    const userId = req.body.userId;
    if(userId){
        req.user = users.find(user => user.id === userId)
    }
    next()
}


function setProject(req,res,next){
const projectId = parseInt(req.params.projectId);
req.project = projects.find(project => project.id === projectId)

if(req.project == null){
    res.status(404)
    return res.send("Project not found")
}
next()
}

function getProject(req,res,next){
if(!canViewProject(req.user, req.project)){
    res.status(401)
    return res.send("Not allowed")
}
next()
}



app.listen(8000, ()=>{
    console.log("server is running");
})