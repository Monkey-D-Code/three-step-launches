const chalk = require('chalk');

module.exports = (req,res,next)=>{
    console.log(chalk.blue(`A request recieved from ip : ${req.ip} at ${Date.now()}`))

    next();
}