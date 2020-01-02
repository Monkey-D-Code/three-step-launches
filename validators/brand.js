const {checkSchema} = require('express-validator');

exports.create = checkSchema({
    full_name : {
        notEmpty : {errorMessage : 'Your company must have a full name'},
        isLength : {
            errorMessage : 'Full name must be between 4 & 50 characters',
            options : {min : 4,max : 50},
        }
    },
    short_name:{
        isAlphanumeric : {errorMessage : 'Numbers & Letters only'}
    },
    logo_url : {
        notEmpty : {errorMessage : 'Company logo link is required'},
        isURL:{errorMessage : 'Provide a valid logo url'},
    },
    about : {
        notEmpty : {errorMessage : 'Write something about the company'}
    }
})