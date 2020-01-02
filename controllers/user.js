const {validationResult } = require('express-validator');

// importing models
const user = require('../models').user;

// importing utils
const {hashPassword} = require('../utils/hasher');

exports.login = (req,res,next)=>{
    
        res.render('user/login',{
            title : 'Login To Three Step Launchers',
        })
    
    
}
exports.post_login = (req,res,next)=>{
    const fieldErrors = validationResult(req);
    if(fieldErrors.errors.length > 0){
        res.render('user/login',{
            title : 'Login To Three Step Launchers',
            fieldErrors,
            user : req.body,
        })
    }else{
        user.findOne({where:{email : req.body.email}})
            .then(user=>{
                req.session.isAuthenticated = true;
                req.session.user = user;
                res.redirect('/user/profile');
            })
            .catch(err=>{
                console.log(err);
            })
        
    }
}

exports.profile = (req,res,next)=>{
    res.render('user/profile',{
        title : 'Profile Page'
    })
}

exports.register = (req,res,next)=>{
    if(req.session.isAuthenticated) {
        res.redirect('/user/profile');
    }else{
        res.render('user/register',{
            title : 'Join Us | Three Step Launchers',
        })
    }
    
}

exports.post_register = (req,res,next)=>{
    const fieldErrors = validationResult(req);
    console.log(fieldErrors)
    const {
        first_name,
        last_name,
        email,
        phone,
        display_image_url,
        password,
        
    } = req.body;
    
    if(fieldErrors.errors.length > 0){
        res.render('user/register',{
            title : 'Join Us | Three Step Launchers',
            fieldErrors,
            user : req.body,
        })
            
    }else{
        
        hashPassword(password)
            .then(hash=>{
                user.create({
                    first_name,
                    last_name,
                    email,
                    phone,
                    display_image_url,
                    isActive : true,
                    isStaff:false,
                    isSuperUser : false,
                    password : hash,
                })
                .then(r=>res.redirect('/user/login'))
                .catch(err=>console.log(err));
            })
            .catch(err=>console.log(err));
    }
}

exports.update = (req,res,next)=>{
    const user = req.session.user;
    res.render('user/update',{
        title : `${user.first_name} ${user.last_name} | Update`,
    })
}

exports.post_update = (req,res,next)=>{
    const {
        first_name,
        last_name,
        email,
        phone,
        display_image_url,


    } = req.body;
    const activeUser = req.session.user;
    const fieldErrors = validationResult(req);

    if(fieldErrors.errors.length > 0){
        res.render('user/update',{
            title : `${user.first_name} ${user.last_name} | Update`,
            fieldErrors,
        })
    }else{
        user.findByPk(activeUser.id)
            .then(user=>{
                user.first_name = first_name;
                user.last_name = last_name;
                user.email = email;
                user.phone =  phone;
                user.display_image_url = display_image_url;
                user.save()
                    .then(result=>{
                        
                        req.session.user = user;
                        res.redirect('/user/profile')
                    })
                    .catch(e=>{
                        res.render('user/update',{
                            title : `${user.first_name} ${user.last_name} | Update`,
                            non_field_errors : e,
                        })
                    })

            })
            .catch(err=>{
                res.render('user/update',{
                    title : `${user.first_name} ${user.last_name} | Update`,
                    non_field_errors : err,
                })
            })

    }
    
    
}

exports.logout = (req,res,next)=>{
    if(!req.session.isAuthenticated){
        res.redirect('/user/login');
    }
    req.session.destroy(()=>res.redirect('/user/login'));
}