/**
 * Created by cui on 16/9/3.
 */
'use strict';

const home = require('../controllers/home');
const user = require('../controllers/user');

module.exports = function (app, passport) {

    app.get('/', home.index);

    //会员
    app.get('/signup', user.signup);
    app.post('/user/create', user.create);
    app.get('/login',user.login);
    app.post('/user/auth', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login' }));
    app.get('/logout', user.logout);
    

    //api
    app.post('/user/exist',user.exist);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}