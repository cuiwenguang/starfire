/**
 * Created by cui on 16/9/3.
 */
'use strict';

const mongoose = require('mongoose');
const User = mongoose.Model('User');

//本地验证
const local = require('./passport/local');


module.exports = function (passport) {
    passport.serializeUser(function (user, cb) {
        cb(null, user.id);
    });
    passport.deserializeUser(function (id, cb) {
        User.load({
            criteria: {_id: id},
            select: "username name email accessToken"
        }, cb);
    });

    passport.use(local);
};