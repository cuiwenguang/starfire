/**
 * 注册表单验证
 */
$(function(){
    //验证
    $('#signform').bootstrapValidator({
        message: '验证不通过，请修改输入框红色部分',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            username:{
                message: "用户名验证不通过",
                validators:{
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    stringLength:{
                        min: 3,
                        max: 30,
                        message: "用户名长度在3～30之间"
                    },
                    threshold: 3, //三个字符以上开始验证
                    remote:{
                        url: '/api/user/exist',
                        message: '用户名已存在',
                        delay: 3000, //3秒请求一次
                        type: 'POST'
                    },
                    regexp: {
                         regexp: /^[a-zA-Z0-9_\.]+$/,
                         message: '用户名由数字字母下划线和.组成'
                     }
                }
            },
            password:{
                message: '密码无效',
                validators:{
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    stringLength:{
                        min: 6,
                        max: 30,
                        message: "密码长度在6～30之间"
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: '邮箱不能为空'
                    },
                    emailAddress: {
                        message: '邮箱格式不对'
                    }
                }
            },
            chkpwd: {
                validators:{
                    notEmpty:{
                        message: '不能为空'
                    },
                    identical:{
                        field: 'password',
                        message: '两次密码不一致'
                    }
                }
                
            }
        }
    });
   
});

/**
 * 登陆验证
 */
$(function(){
    $('#loginform').bootstrapValidator({
        message: '验证不通过，请修改输入框红色部分',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            username:{
                message: "用户名验证不通过",
                validators:{
                    notEmpty: {
                        message: "用户名不能为空"
                    }
                }
            },
            password:{
                message: '密码无效',
                validators:{
                    notEmpty: {
                        message: "密码不能为空"
                    }
                }
            }
        },
        submitHandler: function(validator, form, submitButton){
            
        }
    }).on('success.form.bv',function(e){
        e.preventDefault();
        var $form = $(e.target);

        $.post($form.attr('action'), $form.serialize(),function(result){
            if(result.status===200){
                location.href = '/';
            }else{
                alert(result);
            }
        });
    });
});
