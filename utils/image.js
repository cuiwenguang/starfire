/**
 * create by cui at 2016.9
 * 使用七牛存储图片
 */
'use strict';

const qiniu = require("qiniu")
qiniu.conf.ACCESS_KEY = 'Cwg1gO9gEUEdv_-0bNYdlU1tnGMCskvMIpI47u0I';
qiniu.conf.SECRET_KEY = '6Bsyii2USb1H4qBe91uj_1YzwGSx_60b5jNlxmXf';
domain = 'od8jfw5zo.bkt.clouddn.com';
let bucket = 'starfire';

class QiNiu{
    constructor(key){
        this.key = key;
        const putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
        this.token = putPolicy.token();
    }
    uploadFile(file, done){
        var extra = new qiniu.io.PutExtra();
        qiniu.io.putFile(this.token,this.key,file, extra,done);
    }
} 

module.exports = QiNiu;

