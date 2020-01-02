const {checkSchema} = require('express-validator');

exports.create = checkSchema({
    title : {
        notEmpty:{errorMessage : 'Must Enter a title'},
        
        isLength:{
            errorMessage : 'Title must be between 4 & 30 characters',
            options:{min : 4 , max : 30},
        }
    },
    image_url : {
        notEmpty : {errorMessage : 'An Image is necessary'},
        isURL : {errorMessage : "Enter a valid imge link"},
    },
    description : {
        notEmpty : {errorMessage : 'Write something about the item'},
        
    }
})