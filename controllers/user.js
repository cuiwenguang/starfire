/**
 * Created by cui on 16/9/3.
 */
'use strict';

const mongoose = require('mongoose');
const co = require('co');

const User = mongoose.model('User');

exports.create = co.wrap(function* (req, res){
    const user = new User(req.body);
    try{
        yield user.save();
        res.json({id:user.id});
    }catch(err){
        res.json({state:403,message:err.message});
    }
});

exports.exist = function(req, res){
    const username = req.body.username;
    User.findOne({username: username})
        .then(function(user){
            if(user){
                res.json({valid:false});
            }else{
                res.json({valid:true});
            }
        },function(err){
            res.json({valid:false});
        });
    
}

exports.signup = function(req, res){
    res.render('user/signup');
}
exports.login = function(req, res){
    res.render('user/login');
}