'use strict';

const express = require('express');
const app = express();
const passport = require('passport');
const fs = require('fs');
const join = require('path').join;

module.exports = app;


// model 引导注册
const models = join(__dirname, 'models');
fs.readdirSync(models)
    .filter(function (file) {
        return ~file.search(/^[^\.].*\.js$/);
    })
    .forEach(function (file) {
        require(join(models, file));
    });

require('./conf/express')(app, passport);
require('./conf/passport')(passport);
require('./conf/routers')(app);