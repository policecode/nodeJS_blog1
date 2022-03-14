const classesRouter = require('./classes');
const siteRouter = require('./site');
const studentRouter = require('./student');
const accountRouter = require('./account');
const auth = require('../app/middlewares/AuthenticationMiddleware');


function route(app) {
    
    app.use('/classes', auth, classesRouter);
    app.use('/students', auth, studentRouter);
    app.use('/account', accountRouter);


    app.use('/', siteRouter);
      
}

module.exports = route;