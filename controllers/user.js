/**
 * Created by cui on 16/9/3.
 */
'use strict';

const mongoose = require('mongoose');
const co = require('co');
const only = require('only');

const User = mongoose.model('User');
const passport = require('passport');

exports.create = co.wrap(function* (req, res){
    const user = new User(req.body);
    user.isActive = true;
    user.provider = 'local';
    try{
        yield user.save();
        req.logIn(user,err=>{
            if(err) req.flash('info', '抱歉不允许登陆');
            return res.redirect('/');
        });
    }catch(err){
        res.render('/signup',{
            err, 
            user
        });
    }
});

exports.update = function(req, res){
    const user = User.load({_id:req.user.id});
    Object.assign(user, only(name,email,avatar));
    user.save()
        .then(function(user){
            req.json({success:true});
        }); 
};

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

exports.returnUrl = function(req, res){
    res.redirect('/');    
} 

exports.logout = function(req, res){
    req.logout();
    res.redirect('/login');
}

exports.signup = function(req, res){
    res.render('user/signup');
}
exports.login = function(req, res){
    res.render('user/login');
}

exports.center = function(req, res){
    res.render('user/center');
}

exports.setHeader = function(req, res){
    res.render('user/partial_header');
}

exports.settings = function(req, res){
    res.render('user/settings');
}