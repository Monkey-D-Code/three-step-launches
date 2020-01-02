// importing model
const Brand = require('../models').brand;


module.exports = (req,res,next)=>{
    Brand.findByPk(1)
        .then(brand=>{  
            
            res.locals.brand = brand;
                
            
            next();

        })
        .catch(err=>{
            console.log(err);
            res.redirect('/brand/create');
            
        })
}