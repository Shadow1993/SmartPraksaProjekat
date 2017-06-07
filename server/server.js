/*-~- Packages -~-*/
var cors = require('cors'),
    express = require('express'),
    bodyParser = require('body-parser'),
    // logger = require('morgan'),
    favicon = require('serve-favicon'),
    path = require('path'),
    app = express(),
    serverConfig = require('./config/server.config');
require('./config/mongoose.config')(serverConfig);

var userRouter = require('./routes/user.route');
var decisionRouter = require('./routes/decision.route');

/*-~- Server Setup -~-*/
    //Cross-origin
app.use(cors());
    //Favicon location
app.use(favicon((path.normalize(__dirname + serverConfig.PUBLIC + '/favicon.ico'))));
    //Logger(Morgan)
//app.use(logger('dev')); //Enable if needed
    //Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

    //Express
app.use(express.static(path.normalize(__dirname + serverConfig.PUBLIC)));

app.use('/users', userRouter);
app.use('/decisions', decisionRouter);

    //Angular HTML5 Mode
app.get('*', function(req, res) {
    res.sendFile(path.normalize(__dirname + serverConfig.PUBLIC + serverConfig.HOMEFILE));
});

/* Handlers */

    // catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/*-~- Error Handlers -~- */

    // development error handler
    // will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

    // production error handler
    // no stacktraces leaked to user
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/*-~- Server Start -~-*/
    //Set port
app.set('port', process.env.PORT || serverConfig.PORT);
    //Start server on port
var server = app.listen(app.get('port'), function() {
    console.log(__dirname + serverConfig.PUBLIC);
    console.log('Server is listening on port: ' + server.address().port);
});

module.exports = app;
