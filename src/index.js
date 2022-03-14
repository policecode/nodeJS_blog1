const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const methodOverride = require('method-override')
const handlebars = require('express-handlebars');
const port = process.env.PORT || 3000;
const db = require('./config/db/index');
const route = require('./routes');
var cookieParser = require('cookie-parser');
const helpersHBS = require('./app/helperhbs/helpersHandlebars');
const sortMiddlware = require('./app/middlewares/SortMiddleware');
const pageMiddleware = require('./app/middlewares/PageMiddleware');
const hbs = handlebars.create({ 
  extname: '.hbs',
  helpers: helpersHBS,
});


app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));


app.use(methodOverride('_method'));
app.use(sortMiddlware);
app.use(pageMiddleware);

app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());
app.use(cookieParser('conduognkiaxalamkhongconloivenua'));

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
// Connect databased
db.connect();

// Route init
route(app);


app.listen(port, () => {
  console.log(`Ứng dụng đang được chạy`)
})