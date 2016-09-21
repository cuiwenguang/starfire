$(function(){
    const uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',    //上传模式,依次退化
        browse_button: 'selPicture',       //上传选择的点选按钮，**必需**
        uptoken_url: '/api/file/token',   //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
        // uptoken : '<Your upload token>', //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
        unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
        // save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
        domain: 'http://od8jfw5zo.bkt.clouddn.com/',   //bucket 域名，下载资源时用到，**必需**
        get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
        container: 'modalAvatarBody',           //上传区域DOM ID，默认是browser_button的父元素，
        max_file_size: '20mb',           //最大文件体积限制
        //flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
        max_retries: 2,                   //上传失败最大重试次数
        dragdrop: true,                   //开启可拖曳上传
        drop_element: 'modalAvatarBody',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb',                //分块上传时，每片的体积
        auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
                'FilesAdded': function(up, files) {
                    plupload.each(files, function(file) {
                        // 文件添加进队列后,处理相关的事情
                    });
                },
                'BeforeUpload': function(up, file) {
                        // 每个文件上传前,处理相关的事情
                },
                'UploadProgress': function(up, file) {
                        // 每个文件上传时,处理相关的事情
                },
                'FileUploaded': function(up, file, info) {
                        // 每个文件上传成功后,处理相关的事情
                        // 其中 info 是文件上传成功后，服务端返回的json，形式如
                        // {
                        //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                        //    "key": "gogopher.jpg"
                        //  }
                        // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
                    var domain = up.getOption('domain');
                    var res = $.parseJSON(info);
                    var sourceLink = domain + res.key;  //获取上传成功后的文件的Url
                    $("#avatarView").attr("src", sourceLink + "?imageView2/0/w/260");
                    $("#avatarView").cropper({
                        aspectRatio: 1 / 1,
                        crop: function(e){
                            img_w = e.width;
                            img_h = e.height;
                            img_x = e.x;
                            img_y = e.y;
                        }
                    });
                },
                'Error': function(up, err, errTip) {
                        //上传出错时,处理相关的事情
                },
                'UploadComplete': function() {
                        //队列文件处理完毕后,处理相关的事情
                },
                'Key': function(up, file) {
                    // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                    // 该配置必须要在 unique_names: false , save_key: false 时才生效

                    var key = "";
                    // do something with key here
                    return key
                }
            }
    });

    var img_w = 128;
    var img_h = 128;
    var img_x = 0;
    var img_y = 0;

    //裁剪头像
    $("#setHeader").click(function(){
        $("#modalAvatar").modal();
    });
    $("#savePicture").click(function(){
        var img_url = $("#avatarView").attr("src")
        img_url += "/crop/!"+img_w+"x"+img_h+"a"+img_x+"a"+img_y+"/";
        $("#setHeader").attr("src",img_url);
        $("#avatar").val(img_url);
        $("#modalAvatar").modal('hide');
    });

    $('#form1').bootstrapValidator({
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
                    regexp: {
                         regexp: /^[a-zA-Z0-9_\.]+$/,
                         message: '用户名由数字字母下划线和.组成'
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
            }
        }
    }).on('success.form.bv',function(e){
        e.preventDefault();
        var $form = $(e.target);
        $.ajax({
            url: $form.attr('action'),
            type: 'PUT',
            data: $form.serialize(),
            success: function(result){
                if(result.status===200){
                    let alert = '<div id="a1" class="alert alert-success fade in">用户信息已更新</div>';
                    $(alert).appendTo("#alertInfo");
                    setTimeout(function() {
                        $('#a1').hide();
                        $('#saveUser').removeAttr('disabled');
                    }, 3000); 
                }else{
                    let alert = '<div id="a1" class="alert alert-warning fade in">'+ result.message +'</div>';
                    $(alert).appendTo("#alertInfo");
                    setTimeout(function() {
                        $('#a1').hide();
                        $('#saveUser').removeAttr('disabled');
                    }, 3000); 
                }
            }
        });
    });
});