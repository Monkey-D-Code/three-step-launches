const {checkSchema} = require('express-validator');

exports.create = checkSchema({
    title : {
        notEmpty : {errorMessage : 'A video title is mandetory'},
        isString : {errorMessage : 'Title must be a string'},
        isLength : {
            errorMessage : 'Title must be between 3 & 30 characters',
            options : {min:3,max:30}
        }
    },
    video_url : {
        notEmpty:{errorMessage:'A video link is necessary'},
    },
    description:{
        notEmpty : {errorMessage : 'Write things about the video'},
    }
})