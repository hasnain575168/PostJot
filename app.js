// =================================================
//  IMPORTING MODULES
// =================================================
const express           = require('express'),
      app               = express(),
      path              = require('path'),
      exphbs            = require('express-handlebars'),
      mongoose          = require('mongoose'),
      bodyParser        = require('body-parser');

// =================================================
//  DATABASE CONNECTION
// =================================================
const dburl = (process.env.DATABASEURL || 'mongodb://localhost/postjot');
mongoose.connect(dburl)
.then(db => {
    const info = db.connection;
    console.log(`CONNECTED TO DB mongodb://${info.host}/${info.name}`);
})
.catch(err => {
    console.log('Error while connecting to database!');
    throw err;
});

// =================================================
//  MIDDLEWARES
// =================================================
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

// =================================================
//  ROUTES
// =================================================

app.get('/', (req, res) => {
    res.render('user/register');
});

// =================================================
//  SERVER SETUP
// =================================================
app.listen((process.env.PORT || 3000), () => {
    console.log('Server Started at localhost:3000');
});