/**
 * Created by cui on 16/9/3.
 */
'use strict';

const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

/**
 * 本地认证
 */

module.exports = new LocalStrategy(
    function (username, password, done) {
        const options = {
            criteria:{username: username},
            select:'name, username, email, hash_password salt'
        };
        User.load(options, function (err, user) {
            if(err) return done(err);
            if(!user){
                return done(null, false, {message:'用户名不正确'});
            }

            if(!user.authenticate(password)){
                return done(null, false, {message:'密码错误'});
            }
            return done(null, user);
        });
    }
);