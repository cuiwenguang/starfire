/**
 * Created by cui on 16/9/3.
 */
'use strict';

const mongoose = require('mongoose');

const User = mongoose.model('User');


exports.create = function(req, res, next){
    const user = new User(req.body);
    user.save();
    res.send('ok');

}