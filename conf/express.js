/**
 * Created by cui on 16/9/3.
 * express 配置内容
 */
'use strict';

/**
 * 依赖的模块
 */
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieSession = require('cookie-session');
const flash = require('connect-flash');
const viewHelper = require('view-helpers');
const compression = require('compression');
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo')(session);

const pkg = require('../package.json');
const env = process.env.NODE_ENV || 'development';

const db = {
    address: '127.0.0.1',
    name: 'sf_db',
    port: 27017,
    username: '',
    password: ''
}

module.exports = function (app, passport) {
    //mongodb
    mongoose.connect(db.address, db.name);

    // 压缩静态文件,必须放在导入static前
    app.use(compression());
    app.use(express.static(path.join(__dirname, '../public')));

    // 跨域
    app.use(cors());

    // 模版引擎
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '../public/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    //CookieParser 必须在 session之前
    app.use(cookieParser());
    app.use(cookieSession({secret: 'secret'}));
    app.use(session({
        resave: false,
        saveUninitialized: true,
        secret: pkg.name,
        store: new mongoStore({ mongooseConnection: mongoose.connection })
    }));

    // passport 设置
    app.use(passport.initialize());
    app.use(passport.session());

    // connect-flash:缓存信息到跳转页面, 必须放在session清除 docs: https://www.npmjs.com/package/connect-flash
    app.use(flash());

    //视图辅助类,详细见:https://github.com/madhums/node-view-helpers
    app.use(viewHelper(pkg.name));
    /*
    if(env !== 'test'){
        // csrf 攻击
        app.use(csrf());

        app.use(function (req, res, next) {
            res.locals.csrf_token = req.csrfToken();
            next();
        });
    }
    */
    //开发阶段,输出格式友好的客户端html
    if(env === 'development') app.locals.pretty = true;
}