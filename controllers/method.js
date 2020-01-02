const {validationResult} = require('express-validator');

// importing model
const Method = require('../models').method;

exports.createMethodPage = (req,res,next)=>{
    
    res.render('method/form',{
        title : 'Create New Item | How it works',
        fromCreate : true,
    })

}

exports.createMethod = (req,res,next)=>{
    const fieldErrors = validationResult(req);
    if(fieldErrors.errors.length >0){
        res.render('method/form',{
            title : 'Create New Item | How it works',
            fromCreate : true,
            fieldErrors,
            method : req.body,
        })
    }else{
        Method.create(req.body)
            .then(newMethod => {
                res.redirect('/');
            })
            .catch((error=>{
                res.render('method/form',{
                    title : 'Create New Item | How it works',
                    fromCreate : true,
                    non_field_errors : error,
                    method : req.body,
                })
            }))
    }

}

exports.updateMethodPage = (req,res,next)=>{
    Method.findByPk(req.params.id)
        .then(method => {
            res.render('method/form' ,{
                title : 'Update Item | How it works',
                fromUpdate : true,
                method,
            })

        })
        .catch(err=>{
            res.render('method/form',{
                title : 'Update Item | How it works',
                fromUpdate : true,
                non_field_errors : err,
               
            })
        })
}

exports.updateMethod = (req,res,next)=>{
    const fieldErrors = validationResult(req);
    if(fieldErrors.errors.length > 0){
        res.render('method/form' ,{
            title : 'Update Item | How it works',
            fromUpdate : true,
            method : req.body,
            fieldErrors,
        })
    }else{
        const {
            title,
            image_url,
            description,
        } = req.body;
        Method.findByPk(req.params.id)
            .then(method=>{
                method.title = title;
                method.image_url = image_url;
                method.description = description;
                return method.save();
            })
            .then(result=>res.redirect('/'))
            .catch(err=>{
                res.render('method/form',{
                    title : 'Update Item | How it works',
                    fromUpdate : true,
                    method : req.body,
                    non_field_errors : err,
                   
                })
            })
    }
}

exports.deleteMethodPage = (req,res,next)=>{
    Method.findByPk(req.params.id)
        .then(method=>{
            res.render('method/confirm_delete' ,{
                title : `Delete ${method.title}`,
                
                method,
            })
        })
        .catch(err=>{
            res.render('method/confirm_delete' ,{
                title : `Delete ${method.title}`,
                
                non_field_errors : err,
            })
        })
}

exports.deleteMethod = (req,res,next)=>{
    Method.findByPk(req.params.id)
        .then(method=>{
            return method.destroy();
        })
        .then(result=>{
            res.redirect('/')
        })
        .catch(err=>{
            res.render('method/confirm_delete' ,{
                title : `Delete ${method.title}`,
                method,
                non_field_errors : err,
            })
        })
}