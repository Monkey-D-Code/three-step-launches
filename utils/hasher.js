const bcrypt = require('bcryptjs');

exports.hashPassword  = password =>new Promise((resolve,reject)=>{
    bcrypt.genSalt(10, (err, salt) =>{
        if (err) reject('Salt Generation failed');
        bcrypt.hash(password, salt, function(e, hash) {
            if (e) reject('Hashing failed');
            // Store hash in your password DB.
            resolve(hash);
        });
    });

})


exports.comparePassword = (password,hash) => new Promise((resolve,reject)=>{
    bcrypt.compare(password,hash,(err,result)=>{
        if(err) reject('Hash Comparison failed !');
        if(result){
            resolve('Passwords match')
        }else{
            reject('Passwords dont\'t match')
        }
    })
})