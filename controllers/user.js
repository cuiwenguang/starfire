/**
 * Created by cui on 16/9/3.
 */
'use strict';

const mongoose = require('mongoose');
const co = require('co');
const only = require('only');
const passport = require('passport');

const User = mongoose.model('User');
const apiResult = require('../utils/api'); 

/**
 * -----------------user相关接口-----------------------
 */

//create: post  /users  
exports.create = co.wrap(function* (req, res){
    const user = new User(req.body);
    user.isActive = true;
    user.provider = 'local';
    try{
        yield user.save();
        req.logIn(user,err=>{
            if(err){
                req.json(apiResult.jsonResult(
                    apiResult.METHOD_NOT_ALLOWED,
                    null,
                    "抱歉不允许登录"));
            } 
            return req.json(apiResult.jsonResult(
                apiResult.OK,
                user,
                "success"));
        });
    }catch(err){
        req.json(apiResult.jsonResult(
            apiResult.SERVER_ERROR,
            null,
            err.message));
    }
});

//update: put /users
exports.update = function(req, res){
    const user = User.load({_id:req.user.id});
    Object.assign(user, only(name,email,avatar));
    user.save()
        .then(function(user){
            req.json(apiResult.jsonResult(
                apiResult.OK,user,'success'
            ));
        }).catch(function(err){
            req.json(apiResult.jsonResult(
                apiResult.SERVER_ERROR,null,err.message
            ));
        }); 
};

// exist post /users/exist
exports.exist = function(req, res){
    const username = req.body.username;
    User.findOne({username: username})
        .then(function(user){
            if(user){
                res.json(apiResult.jsonResult(
                    apiResult.NOT_VALIDATE,
                    false,
                    '改用户已存在'
                ));
            }else{
                res.json(apiResult.jsonResult(
                        apiResult.OK,
                        true,
                        '改用户已存在'
                ));
            }
        },function(err){
            res.json(apiResult.jsonResult(
                apiResult.SERVER_ERROR,
                false,
                err.message
            ));
        });    
}

exports.login = function(req, res){
    let strategy = req.body.strategy
    passport.authenticate(strategy, function(err,user,info){
        if (!req.user){
        res.json(apiResult.jsonResult(
                apiResult.NOT_VALIDATE,
                false,
                info
            ));    
        }
        res.json(apiResult.jsonResult(
            apiResult.OK,
            req.user,
            info
        ));
    });
}
exports.logout = function(req, res){
    req.logout();
    res.json(apiResult.jsonResult(
        apiResult.OK,
        true,
        'success'
    ));
}

/*------------------api end------------------------------- */

/**
 * ------------------action---------------------------------
 */
exports.returnUrl = function(req, res){
    res.redirect('/');    
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