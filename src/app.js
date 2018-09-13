const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

app.set('port',process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-with,Content-Type,Accept,content-type,application/json');
    if (req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });
//routes
const connection =require('./models/connection');
require('./routes/clientRoutes')(app);
require('./routes/authRoutes')(app);
require('./routes/menuRoutes')(app);
const sessionStore = new MySQLStore({
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 86400000,
    connectionLimit: 1,
    endConnectionOnClose: true
}/* session store options */, connection);
 
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));
// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
app.listen(app.get('port'),()=>{
    console.log('server on port 3000');
})
