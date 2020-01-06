// importing packages
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const csurf = require('csurf');
const dotenv = require('dotenv');

dotenv.config();
// machine stuff
const chalk = require('chalk');

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// importing database stuff
const db = require('./models/index');

// importing routes
const websiteRoutes = require('./routes/website');
const userRoutes = require('./routes/user');
const methodRoutes = require('./routes/method');
const videoRoutes = require('./routes/video');
const testimonialRoutes = require('./routes/testimonial');
const brandRoutes = require('./routes/brand');

// importing custom middlewares
const localesMiddleWare = require('./middlewares/locales');
const brandMiddleware = require('./middlewares/brand_confirm');
const loggerMiddleware = require('./middlewares/logger');



// important variables
const env = process.env.NODE_ENV;
const port = process.env.PORT;
const static_dir = path.join(__dirname , 'public');
const db_type = process.env.DATABASE;
const session_key = process.env.SESSION_KEY;

const app = express();
const csrfProtection = csurf();



// setting up express session
let sessionStore = null;
if(db_type==='mysql'){
    sessionStore = new SequelizeStore({db : db.sequelize});
}else if(db_type=='mongodb'){

}else{
    console.log(chalk.red('No database defined in env'))
}

app.use(session({
    secret:session_key,
    resave : false,
    saveUninitialized : false,
    store : sessionStore,
}));
sessionStore.sync();


// setting up view engine as handlebars
const exphbs = hbs.create({
    extname : 'hbs',
    helpers : {

    }
});
app.engine('hbs' , exphbs.engine);
app.set('view engine' , 'hbs');

// setting views
app.set('views' , 'views');

// applying middlewares
app.use(bodyParser.urlencoded({extended:true}));
app.use(csrfProtection);
app.use('/static' , express.static(static_dir));

app.use(localesMiddleWare);
app.use(brandMiddleware);
app.use(loggerMiddleware);

// defing routes
app.use('/' , websiteRoutes);
app.use('/user',userRoutes);
app.use('/method',methodRoutes);
app.use('/video',videoRoutes);
app.use('/testimonial',testimonialRoutes);
app.use('/brand',brandRoutes);
app.use((req,res,next)=>{
    res.status(404).render('404',{title:'Page not found'});
});

// starting the express server

if(db_type==='mysql'){
    db.sequelize.sync({force:false})
    .then(()=>{
        app.listen(port , ()=>{
            console.log(chalk.yellowBright(`[${env} MODE]`));
            console.log(chalk.blue(`PORT : ${port}`));
            console.log(chalk.bgYellow(`DATABASE : ${db_type}`));
            console.log(chalk.green('Three step launchers server started'));
        });
    })
    .catch((error)=>{
        console.log(chalk.bgRedBright('ERROR OCCOURED !'))
        console.log(chalk.red(error));
        
    });
}else if(db_type=='mongodb'){


}else{
    console.log('Database defined in environment can\'t be done by programmer !')
}




