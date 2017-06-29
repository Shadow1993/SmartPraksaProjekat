'use strict';
/*-~- Packages -~-*/
var cors = require('cors'),
    express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    favicon = require('serve-favicon'),
    path = require('path'),
    app = express(),
    expressSession = require('express-session'),
    passport = require('passport');
// Config
var serverConfig = require('./config/server.config');
require('./config/mongoose.config')(serverConfig);
require('./config/passport.config')(passport);
// Routes
var userRouter = require('./routes/user.route'),
    decisionRouter = require('./routes/decision.route'),
    commentRouter = require('./routes/comment.route'),
    voteRouter = require('./routes/vote.route');
/*-~- Server Setup -~-*/
// Cross-origin
app.use(cors());
app.use(favicon((path.normalize(__dirname + serverConfig.PUBLIC + '/favicon.ico'))));
app.use(logger('dev')); //Enable if needed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.normalize(__dirname + serverConfig.PUBLIC)));
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
console.log(process.argv[2]);
// Passport session and middlware initialization
app.use(passport.initialize());
app.use(passport.session());
// Routes configuration
require('./routes/auth.route')(app, passport);
app.use('/users', userRouter);
app.use('/decisions', decisionRouter);
app.use('/comments', commentRouter);
app.use('/votes', voteRouter);
// Angular HTML5 Mode
app.get('*', function (req, res) {
    res.sendFile(path.normalize(__dirname + serverConfig.PUBLIC + serverConfig.HOMEFILE));
});
// Catch wrong url and send response
app.all('*', function (req, res) {
    res.status(404).send('404 Not found, proceed to homepage');
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
/*-~- Error Handlers -~- */
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 418);
        res.send({ message: err.message});
    });
}
/*-~- Server Start -~-*/
//Set port
app.set('port', process.env.PORT || serverConfig.PORT);
//Start server on port
var server = app.listen(app.get('port'), function () {
    console.log(__dirname + serverConfig.PUBLIC);
    console.log('Server is listening on port: ' + server.address().port);
});

module.exports = app;