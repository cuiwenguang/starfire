$(function(){
    $("#settings").click(function(){
        var uploader;
        $.get('/user/settings', function(data){
            //个人信息设置
            $("#placeholder").html(data);
<<<<<<< HEAD
 
            if(uploader == undefined) initUploader("selPicture","avatarView",false);

            //裁剪头像
            $("#").click(function(){
                $("#modalAvatar").modal();
            });
            $("#savePicture").click(function(){
                var img_url = $("#avatarView").attr("src")
                img_url += "/crop/!"+img_w+"x"+img_h+"a"+img_x+"a"+img_y+"/";
                $("#setHeader").attr("src",img_url);
                $("#avatar").val(img_url);
                $("#modalAvatar").modal(hidden);
=======
            initUploader("selPicture",false)
            //裁剪头像
            $("#").click(function(){
                $("#modalAvatar").modal();
>>>>>>> a1af9e5e1c10f4d95ae74979ca0ccbd82be305e0
                //上传头像按钮
                $("#selPicture").click(function(){
                    uploader = initUploader(this.id,'avatarView',false);
                });
<<<<<<< HEAD
            });        
        });
    });
});

var uploader;
var img_w = 128;
var img_h = 128;
var img_x = 0;
var img_y = 0;

function initUploader(pickButton,preview,multiple){
    uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',    //上传模式,依次退化
        browse_button: pickButton,       //上传选择的点选按钮，**必需**
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
                        sourceLink += '?imageMogr2/thumbnail/300x' //七牛图片处理接口缩放图片，宽度为300
                        if(preview){
                            $("#"+preview).attr("src", sourceLink);
                            $("#"+preview).cropper({
                                aspectRatio: 1 / 1,
                                resizable:false,
                                crop: function(e){
                                    img_x = e.x;
                                    img_y = e.y;
                                    img_w = e.width;
                                    img_h = e.height
                    var domain = up.getOption('domain');
                    var res = $.parseJSON(info);
                    var sourceLink = domain + res.key;  //获取上传成功后的文件的Url
                    if(preview){
                        $("#"+preview).attr("src", sourceLink + "?imageView2/0/w/260");
                    }
                    
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

                                }
                            });
                        }
                        
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
=======
                $("#avatarView").cropper({
                     aspectRatio: 1 / 1,
                    crop: function(e){
                        /*
                        console.log(e.x);
                        console.log(e.y);
                        console.log(e.width);
                        console.log(e.height);
                        console.log(e.rotate);
                        console.log(e.scaleX);
                        console.log(e.scaleY);
                        */
                    }
                });
            });        
        });
    });
});

function initUploader(pickButton,preview,multiple){
    var uploader = Qiniu.uploader({
    runtimes: 'html5,flash,html4',    //上传模式,依次退化
    browse_button: pickButton,       //上传选择的点选按钮，**必需**
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
                    if(preview){
                        $("#"+preview).attr("src", sourceLink + "?imageView2/0/w/260");
                    }
                    
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

    return uploader;
>>>>>>> a1af9e5e1c10f4d95ae74979ca0ccbd82be305e0
}

