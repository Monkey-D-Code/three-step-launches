const {validationResult} = require('express-validator');

// importing model
const Video = require('../models').video;


exports.createVideoPage = (req,res,next)=>{
    res.render('video/form',{
        title : 'Add a new Video',
        fromCreate : true,
    })
}

exports.createVideo = (req,res,next)=>{
    const fieldErrors = validationResult(req);
    if(fieldErrors.errors.length >0){
        res.render('video/form',{
            title : 'Add a new Video',
            fromCreate : true,
            fieldErrors,
            video : req.body,
        })

    } else{
        Video.create(req.body)
            .then(video=>res.redirect('/'))
            .catch(err=>{
                res.render('video/form',{
                    title : 'Add a new Video',
                    fromCreate : true,
                    non_field_errors : err,
                    video : req.body,
                })
            })
    }
}

exports.updateVideoPage = (req,res,next)=>{
    Video.findByPk(req.params.id)
        .then(video=>{
            res.render('video/form',{
                title : 'Update Video',
                fromUpdate : true,
                video,
            })
        })
        .catch(err=>{
            res.render('video/form',{
                title : 'Update Video',
                non_field_errors : err,
            })
        })
    
}

exports.updateVideo = (req,res,next)=>{
    const fieldErrors = validationResult(req);

    if(fieldErrors.errors.length > 0){
        res.render('video/form',{
            title : 'Update Video',
            fromUpdate : true,
            fieldErrors,
            video : req.body,
        })

    }else{
        const {
            title,
            video_url,
            description,

        } = req.body;
        Video.findByPk(req.params.id)
        .then(video=>{
            video.title = title;
            video.video_url = video_url;
            video.description = description;
            return video.save();
        })
        .then(result=>res.redirect('/'))
        .catch(err=>{
            res.render('video/form',{
                title : 'Update Video',
                fromUpdate : true,
                non_field_errors : err,
                video : req.body,
            })
        })

    }
    
}

exports.deleteVideoPage = (req,res,next)=>{
    Video.findByPk(req.params.id)
        .then(video=>{
            res.render('video/confirm_delete',{
                title : `Delete ${video.title} ?`,
                video,
                
            })
        })
        .catch(err=>{
            res.render('video/confirm_delete',{
                title : 'Delete Video',
                non_field_errors : err,
                
            })
        })
}

exports.deleteVideo = (req,res,next)=>{
    Video.findByPk(req.params.id)
        .then(video=>video.destroy())
        .then(result=>res.redirect('/'))
        .catch(err=>{
            res.render('video/confirm_delete',{
                title : 'Delete Video',
                non_field_errors : err,
                
            })
        })
}