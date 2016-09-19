'use strict'

module.exports = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    //客户端错误定义，自定客户端错误从450开始
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_VALIDATE: 450, //验证错误
    REQUEST_TIMEOUT: 408,
    //服务端错误定义，自定义服务端状态从520开始 
    SERVER_ERROR: 500,
    
    jsonResult: function(status,data,message){
        return {
            "status": status,
            "message": message,
            "data": data
        }
    }
}
