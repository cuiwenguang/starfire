/**
 * Created by cui on 16/9/2.
 */
'use strict'

const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;
const  oAuthTypes = [
    'qq',
    'wechat',
    'weibo'
]

const UserSchema = new Schema({
    username: {type: String, default: ''},
    email: {type:String, default:''},
    hash_password: {type:String, default: ''},
    name: {type:String, default:''},
    provider:{type:String, default:''},
    salt: {type:String, default: ''},
    accessToken:{type:String, default: ''},
    avatar: {type:String, default :'/images/user.png'},
    isActive: {type: Boolean, default: false},
    level: {type: Number, default: 0},
    integral: {type: Number, default:0},
    qq: {},
    wechat: {},
    weibo: {}
});

UserSchema.virtual('password')
    .set(function (password) {
        this._password=password;
        this.salt = this.makeSalt();
        this.hash_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password
    });

UserSchema.path('username').validate(function (username) {
    if(this.skipValidation()) return true;
    return username.length;
}, '用户名不允许为空');

UserSchema.path('username').validate(function (username, fn) {
    if(this.skipValidation()) fn;
    const User = mongoose.model('User');
    if(this.isNew){
        User.find({username: username}).exec(function (err, users) {
            fn(!err && users.length===0);
        });
    }else fn(true);
}, '用户名已存在');

UserSchema.path('hash_password').validate(function (pwd) {
    if (this.skipValidation()) return true;
    return pwd.length && this._password.length;
}, '密码不能为空');


UserSchema.methods = {
    encrptPassword:function (pwd) {
        if(!pwd) return '';
        try{
            return crypto
                .createHmac('sha1', this.salt)
                .update(pwd)
                .digest('hex');
        }catch (err){
            console.log(err.message);
            return '';
        }
    },
    makeSalt:function () {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },
    encryptPassword:function(password){
        if(!password) return '';
        try{
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        }catch(err){
            return '';
        }
    },
    authenticate: function (plainText) {
        return this.encrptPassword(plainText) === this.hash_password
    },

    /**
     * 验证 通过OAuth授权, 非空的字段
     * @return {number}
     */
    skipValidation: function () {
        return ~oAuthTypes.indexOf(this.provider);
    }
};

UserSchema.statics = {
    load: function (options, cb) {
        options.select = options.select || 'id username name email avatar';
        return this.findOne(options.criteria)
            .select(options.select)
            .exec(cb);
    }
};

mongoose.model('User', UserSchema);