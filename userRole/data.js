const ROLE = {
    ADMIN:'admin',
    USER:'user'
}

module.exports = {
    ROLE:ROLE,
    users:[
        //only User1 is admin
        {
            id:1,name:'User1',role:ROLE.ADMIN
        },
        {
            id:2,name:'User2',role:ROLE.USER
        },
        {
            id:3,name:'User3',role:ROLE.USER
        }
    ],

    //here id is unique_id of every project
    //and userId tells about owner of project 
    projects:[
        {
            id:1,name:'User1 Project',userId:1
        },
        {
            id:2,name:'User2 Project',userId:2
        },
        {
            id:3,name:'User3 Project',userId:3
        }
    ]
}