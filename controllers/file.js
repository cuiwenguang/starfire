'use strict';

const QinNiu = require('../utils/image');

exports.token = function(req, res){
    const qiniu = new QinNiu();
    let token = qiniu.getToken();
    res.json({uptoken:token});
} 