/**
 * Created by cui on 16/9/3.
 */
'use strict';

const mongoose = require('mongoose');
const co = require('co');

const User = mongoose.model('User');

exports.create = co.wrap(function* (req, res){
    const user = new User({
        "username": "cwg",
        "password": "123",
        "email": "cuiwenguang@163.com"
    });
    try{
        yield user.save();
        res.json({id:user.id});
    }catch(err){
        res.json({state:403,message:err.message});
    }
});

exports.signup = function(req, res){
    res.render('user/signup.jade');
}