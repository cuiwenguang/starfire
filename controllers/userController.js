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
                res.json(apiResult.jsonResult(
                    apiResult.METHOD_NOT_ALLOWED,
                    null,
                    "抱歉不允许登录"));
            } 
            return res.json(apiResult.jsonResult(
                apiResult.OK,
                user,
                "success"));
        });
    }catch(err){
        res.json(apiResult.jsonResult(
            apiResult.SERVER_ERROR,
            null,
            err.message));
    }
});

//update: put /users
exports.update = co.wrap(function* (req, res){ 
    const user = yield User.load({criteria:{_id:req.user.id}});
    Object.assign(user, only(req.body, 'name email avatar'));
    user.save()
        .then(function(user){
            res.json(apiResult.jsonResult(
                apiResult.OK,user,'success'
            ));
        }).catch(function(err){
            res.json(apiResult.jsonResult(
                apiResult.SERVER_ERROR,null,err.message
            ));
        }); 
});

// exist post /users/exist
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
            res.json(apiResult.jsonResult(
                apiResult.SERVER_ERROR,
                false,
                err.message
            ));
        });    
}

exports.auth = function(req, res, next){
    let strategy = req.body.strategy
    passport.authenticate(strategy, function(err,user,info){
        if (!user){
            return res.json(apiResult.jsonResult(
                apiResult.NOT_VALIDATE,
                false,
                info.message
            ));    
        }
        req.logIn(user, err=>{
            if(err){
                return res.json(apiResult.jsonResult(
                    apiResult.NOT_VALIDATE,
                    false,
                    err.message
                )); 
            }else{
                return res.json(apiResult.jsonResult(
                    apiResult.OK,
                    user,
                    info
                ));
            }
            
        });
        
    })(req, res, next);
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

exports.setHeader = function(req, res){
    res.render('user/partial_header');
}

exports.signOut = function(req,res){
    req.logout();
    res.redirect('/')
}