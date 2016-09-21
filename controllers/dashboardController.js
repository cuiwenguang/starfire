
// 管理中心首页
exports.index = function(req,res){
    res.render('dashboard/index');
}

// 用户设置
exports.settings = function(req, res){
    res.render('dashboard/settings');
}
