// importing models
const Method = require('../models').method;
const Video = require('../models').video;
const Testimonial = require('../models').testimonial;

exports.home = (req,res,next)=>{
    Promise.all([
        Video.findAll(),
        Method.findAll(),
        Testimonial.findAll(),
    ])
    .then(([videos,methods,testimonials])=>{
        res.render('index',{
            title : 'Welcome To Three Step Launchers',
            videos,
            methods,
            testimonials,
        })
    })
    .catch(err=>{
        res.render('index',{
            title : 'Welcome To Three Step Launchers',
            dataError : err,
        })
    })
    

}
exports.about = (req,res,next)=>{
    res.render('about' , {
        title : 'About Us  | Three Step Launchers',
    })

}
exports.faq = (req,res,next)=>{
    res.send('faq page')

}