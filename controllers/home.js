/**
 * Created by cui on 16/9/3.
 */
'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.index =function (req, res) {
    res.render('home/index', {'title': 'star fire club'});    
}
