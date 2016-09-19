/**
 * Created by cui on 16/9/3.
 */
'use strict';

const home = require('../controllers/home');
const user = require('../controllers/user');
const file = require('../controllers/file');

module.exports = function (app) {

    app.get('/', home.index);

    //会员
    app.get('/signup', user.signup);
    app.get('/login',user.login);
    app.get('/users/center', user.center);
    app.get('/users/setHeader', user.setHeader);
    app.get('/users/settings', user.settings);
    //-------api------------
    //auth
    app.get('api/logout',user.logout);
    app.post('api/login', user.login);
    //user
    app.post('/user/exist',user.exist);
    app.post('/api/users/create', user.create);
    app.put('users/update/:id', user.update);
    app.get('/api/file/token',file.token);


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