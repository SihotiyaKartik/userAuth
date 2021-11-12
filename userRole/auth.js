const {ROLE} = require("./data")

function userPresent(req,res,next){
    //if user is not logged in
    if(req.user == null){
        res.status(403);
        return res.send("Please Sign in First")
    }
    next();
}

//for checking role of user
function userRole(role){
    return (req,res,next) => {
        if(req.user.role !== role){
            res.status(401);
            return res.send("Not allowed")
        }
        next();
    }
}

//admin can view everyone's project
//user can view only their project

function canViewProject(user,project){
return(
    user.role === ROLE.ADMIN || user.id === project.userId
)
}

function canViewAllProject(user,projects){
if(user.role === ROLE.ADMIN)return  projects
return projects.find(project => project.userId === user.id)
}

module.exports = {
userPresent,
userRole,
canViewProject,
canViewAllProject
}