var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./app/config/db');

var app = express();
app.use(cors());

if (!process.env.NODE_ENV || process.env.NODE_ENV == undefined) {
    process.env.NODE_ENV = 'local';
}
const config = require('./app/config/config.js').get(process.env.NODE_ENV);


app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 1000000
}));

// All api requests
app.use(function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,If-Modified-Since,Authorization,multipart/form-data');

    if (req.method == 'OPTIONS' || (req.method == 'GET' && req.path.includes("/uploads"))) {
        res.status(200).end();
    } else {
        next();
        //res.status(200).end();
    }
});

app.use('/api', require('./app/routes')(express));

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});



var port = process.env.NODE_ENV.PORT || config.port;
var server = app.listen(port);
server.setTimeout(3000000);


module.exports = app;



// NODE_ENV=staging npm start