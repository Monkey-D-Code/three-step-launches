module.exports = (req,res,next)=>{
    const user = req.session.user;
    if(user.isSuperUser){
        next();
    }else{
        res.send('<h1>Permission Denied.</h1>');
    }
    
}