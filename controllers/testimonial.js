const {validationResult} = require('express-validator');

// importing model
const Testimonial = require('../models').testimonial;

exports.createPage  = (req,res,next)=>{
    res.render('testimonial/form',{
        title : 'Create testimonial',
        fromCreate : true,
    })
}


exports.create = (req,res,next)=>{
    const fieldErrors = validationResult(req);
    if(fieldErrors.errors.length > 0){
        res.render('testimonial/form',{
            title : 'Create testimonial',
            fromCreate : true,
            fieldErrors,
            testimonial : req.body,
        })

    }else{
        Testimonial.create(req.body)
            .then(result=>res.redirect('/'))
            .catch(err=>{
                res.render('testimonial/form',{
                    title : 'Create testimonial',
                    fromCreate : true,
                    non_field_errors:err,
                    testimonial : req.body,
                })
            })


    }
}

exports.updatePage = (req,res,next)=>{
    Testimonial.findByPk(req.params.id)
        .then(testimonial=>{
            res.render('testimonial/form',{
                title : 'Update testimonial',
                fromUpdate : true,
                testimonial,
            })
        })
        .catch(err=>{
            res.render('testimonial/form',{
                title : 'Create testimonial',
                fromUpdate : true,
                non_field_errors:err,
            })
        })
}

exports.update = (req,res,next)=>{
    const fieldErrors = validationResult(req);
    if(fieldErrors.errors.length > 0){
        res.render('testimonial/form',{
            title : 'Update testimonial',
            fromUpdate : true,
            fieldErrors,
            testimonial : req.body,
        })

    }else{
        const {
            full_name ,
            display_image_url,
            text,

        } = req.body;
        Testimonial.findByPk(req.params.id)
            .then(testimonial => {
                testimonial.full_name = full_name;
                testimonial.display_image_url = display_image_url;
                testimonial.text = text;
                return testimonial.save();
            })
            .then(result=>res.redirect('/'))
            .catch(err=>{
                res.render('testimonial/form',{
                    title : 'Create testimonial',
                    fromUpdate : true,
                    testimonial : req.body,
                    non_field_errors:err,
                })
            })

    }
}

exports.deletePage = (req,res,next)=>{
    Testimonial.findByPk(req.params.id)
        .then(testimonial=>{
            res.render('testimonial/confirm_delete',{
                title : `${testimonial.full_name} confirm delete ?`,
                testimonial,
            })
        })
        .catch(err=>{
            res.render('testimonial/confirm_delete',{
                title : 'confirm delete ?',
                non_field_errors : err,
            })
        })
}

exports.delete = (req,res,next)=>{
    Testimonial.findByPk(req.params.id)
        .then(testimonial=>testimonial.destroy())
        .then(result=>res.redirect('/'))
        .catch(err=>{
            res.render('testimonial/confirm_delete',{
                title : `${testimonial.full_name} confirm delete ?`,
                testimonial,
                non_field_errors : err,
            })
        })
}