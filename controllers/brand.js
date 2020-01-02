const {validationResult} = require('express-validator');

// importing model
const Brand = require('../models').brand;

exports.createPage = (req,res,next)=>{
    res.render('brand/form',{
        title : 'Create New Brand',
        fromCreate : true,
    })
}

exports.create = (req,res,next)=>{
    const fieldErrors = validationResult(req);
    if(fieldErrors.errors.length >0 ){
        res.render('brand/form',{
            title : 'Create New Brand',
            fromCreate : true,
            fieldErrors,
            brand : req.body,
        })
    }else{
        Brand.create(req.body)
            .then(result=>res.redirect('/'))
            .catch(err=>{
                res.render('brand/form',{
                    title : 'Create New Brand',
                    fromCreate : true,
                    non_field_errors : err,
                    brand : req.body,
                })
            })

    }
}

exports.updatePage = (req,res,next)=>{
    Brand.findByPk(req.params.id)
        .then(brand=>{
            res.render('brand/form',{
                title : 'Update Brand',
                fromUpdate : true,
                brand,
            })
        })
        .catch(err=>{
            res.render('brand/form',{
                title : 'Update Brand',
                fromUpdate : true,
                non_field_errors : err,
                
            })
        })
}

exports.update = (req,res,next)=>{
    const fieldErrors = validationResult(req);
    if(fieldErrors.errors.length > 0){
        res.render('brand/form',{
            title : 'Update Brand',
            fromUpdate : true,
            brand : req.body,
            fieldErrors,
        })

    }else{
        const {
            full_name,
            short_name,
            logo_url,
            about,
            facebook_link,
            twitter_link,
            instagram_link,

        } = req.body;
        Brand.findByPk(req.params.id)
            .then(brand => {
                brand.full_name = full_name;
                brand.short_name = short_name;
                brand.logo_url = logo_url;
                brand.about = about;
                brand.facebook_link = facebook_link;
                brand.twitter_link = twitter_link;
                brand.instagram_link = instagram_link;
                return brand.save();
            })
            .then(result=>res.redirect('/'))
            .catch(err=>{
                res.render('brand/form',{
                    title : 'Update Brand',
                    fromUpdate : true,
                    brand,
                    non_field_errors : err,
                })
            })
    }
}