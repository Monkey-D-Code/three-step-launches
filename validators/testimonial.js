const {checkSchema} = require('express-validator');

exports.create = checkSchema({
    full_name : {
        notEmpty : {errorMessage : 'A name for user is required'},
        isLength : {
            errorMessage : 'Must be between 4 & 30 characters',
            options : {min:4,max:30}
        }
    },
    display_image_url : {
        notEmpty : {errorMessage : 'An image for user is also required'},
        isURL:{errorMessage : 'Enter a proper image link'},
    },
    text : {
        notEmpty : {errorMessage : 'The user have to say something'},
        
    }
})