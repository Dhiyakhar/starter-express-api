const User=require('../models/User');

let auth =(req,res,next)=>{
    let token =req.cookies.auth;
    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        if(!user) return res.json({
            error :true
        });

        req.token= token;
        req.User=user;
        console.log(user);
        next();

    })
}

module.exports={auth};