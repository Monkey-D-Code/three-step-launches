const {checkSchema} = require('express-validator');

// importing model
const user = require('../models').user;

// importing utils
const hasher = require('../utils/hasher');

exports.register = checkSchema({
    first_name : {
        isAlpha : {errorMessage:'Letters only'},
        isLength:{
            errorMessage:'First Name Must be between 2 & 20 characters',
            options : {
                min : 2,
                max : 20,
            }
        }
    },
    last_name : {
        isAlpha : {errorMessage:'Letters only'},
        notEmpty:{
            errorMessage : 'Must enter your last name'
        },
        isLength:{
            errorMessage:'Last Name Must be between 2 & 20 characters',
            options : {
                min : 2,
                max : 20,
            }
        }

    },
    email : {
        notEmpty : {errorMessage : 'Email is required for loggin in'},
        isEmail : {errorMessage : 'Please enter a valid email'},
        
        custom :  {
            options : value => {
                return user.findOne({where : {email : value}})
                    .then(user=>{
                        console.log(user)
                        if(user){
                            return Promise.reject('Email already registered')
                        }
                        return true;
                    })
            }
        }
    },
    phone : {
        notEmpty : {errorMessage : 'We need a phone number'},
        isLength : {
            errorMessage : 'Phone Number must be 10 digits',
            options : {max : 10,min:10}
        },
        custom :  {
            options : value => {
                return user.findOne({where:{phone:value,}})
                    .then(user=>{
                        if(user){
                            return Promise.reject(`${user.phone} already registered`);
                        }
                        return true;
                    })
            }
        }
    },
    display_image_url : {
        notEmpty : {errorMessage : 'Must Provide a image link'},
        isURL : {errorMessage : 'Enter a valid url'}
    },
    password : {
        notEmpty : {errorMessage : 'Please choose a password'},
        isLength : {
            errorMessage : 'Password must be between 8 & 20 characters',
            options : {min:8,max:20}
        },
        isAlphanumeric : {errorMessage : 'Numbers & letters only'}
    },
    confirm_password : {
        custom : {
            options : (value,{req}) =>{
                if(req.body.password !== value){
                    return Promise.reject('Passwords don\'t match !');
                }
                return true;
            }
        }
        
    }
})

exports.login = checkSchema({
    email : {
        notEmpty : {errorMessage : 'Email is required for loggin in'},
        isEmail : {errorMessage : 'Please enter a valid email'},
        custom :  {
            options : value => {
                return user.findOne({where : {email : value},})
                    .then(user=>{
                        if(!user){
                            return Promise.reject('Email not registered')
                        }
                        return true;
                    })

            }
        }
    },
    password : {
        notEmpty : {errorMessage : 'Please choose a password'},
        isLength : {
            errorMessage : 'Password must be between 8 & 20 characters',
            options : {min:8,max:20}
        },
        isAlphanumeric : {errorMessage : 'Numbers & letters only'},
        custom : {
            options : (value,{req})=>{
                return user.findOne({where : {email : req.body.email,},})
                    .then(user=>{
                        return hasher.comparePassword(value,user.password)
                            .then(result=>{
                                return true;
                            })
                            .catch(err=>{
                                return Promise.reject('Password is messed up !')
                            })
                    })
                        
                 
            }
        }

    }
})

exports.update = checkSchema({
    first_name : {
        isAlpha : {errorMessage:'Letters only'},
        isLength:{
            errorMessage:'First Name Must be between 2 & 20 characters',
            options : {
                min : 2,
                max : 20,
            }
        }
    },
    last_name : {
        isAlpha : {errorMessage:'Letters only'},
        notEmpty:{
            errorMessage : 'Must enter your last name'
        },
        isLength:{
            errorMessage:'Last Name Must be between 2 & 20 characters',
            options : {
                min : 2,
                max : 20,
            }
        }

    },
    email : {
        notEmpty : {errorMessage : 'Email is required for loggin in'},
        isEmail : {errorMessage : 'Please enter a valid email'},
        
        
    },
    phone : {
        notEmpty : {errorMessage : 'We need a phone number'},
        isLength : {
            errorMessage : 'Phone Number must be 10 digits',
            options : {max : 10,min:10}
        },
        
    },
    display_image_url : {
        notEmpty : {errorMessage : 'Must Provide a image link'},
        isURL : {errorMessage : 'Enter a valid url'}
    },
    
})