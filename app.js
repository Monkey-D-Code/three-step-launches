// importing packages
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const csurf = require('csurf');
const {Handlebars} = require('express-handlebars');

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// importing database stuff
const sequelize = require('./utils/database');
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

// important variables
const port = process.env.PORT || 8000;
const static_dir = path.join(__dirname , 'public');


const app = express();
const csrfProtection = csurf();



// setting up express sessions
const sessionStore = new SequelizeStore({db : sequelize});
app.use(session({
    secret:"blablahblahbluhbluh",
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
db.sequelize.sync({force:true})
    .then(()=>{
        app.listen(port , ()=>{
            console.log(`Three step launchers server started at port ${port}`);
        });
    })
    .catch((error)=>console.log(error));



