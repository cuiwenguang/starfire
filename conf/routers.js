/**
 * Created by cui on 16/9/3.
 */
'use strict';

const home = require('../controllers/homeController');
const user = require('../controllers/userController');
const dashboard = require('../controllers/dashboardController');
const file = require('../controllers/fileController');

module.exports = function (app) {

    app.get('/', home.index);

    //----------view----------
    //会员
    app.get('/signup', user.signup);
    app.get('/login',user.login);
    app.get('/signOut', user.signOut);
    
    // 管理中心
    app.get('/dashboard/index', dashboard.index);
    app.get('/dashboard/userSettings', dashboard.settings);

    //----------api------------
    //auth
    app.get('/api/logout',user.logout);
    app.post('/api/login', user.auth);
    
    //user
    app.post('/api/users/exist',user.exist);
    app.post('/api/users/create', user.create);
    app.put('/api/users/update', user.update);

    //image token
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