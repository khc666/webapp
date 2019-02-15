var querydb = require('../utils/querydb');
var crypto = require('crypto'); // 加载crypto库

//登录界面
exports.login = function (req, res) {
    res.render('login');
}

//登录提交
exports.loginsubmit = async function (req, res, next) {
    var userName = req.body.username;
    var passWord = req.body.password;
    var autoLogin = req.body.autoLogin;

    // md5加密password
    var md5 = crypto.createHash('md5');
    md5.update(passWord); // 加密
    var psw = md5.digest('hex');
    var sql = 'SELECT id,username,password FROM goodsuser WHERE username = ? AND password = ?';
    var parameters = [userName, psw];
    try {
        var data = await querydb(sql, parameters);

        // 判断登录是否成功
        if (data.length === 0) {
            res.render('login', {
                'message': '用户名或密码出错！',
            });
        } else {
            // 判断是否需要记住密码
            if (autoLogin === 'on') {
                res.cookie('user', {
                    'username': userName,
                    'password': passWord,
                }, {
                    maxAge: 1000 * 60 * 60 * 24, // cookie信息保存一天
                });
            } else {
                res.clearCookie('user'); // 清除cookie
            }

            // 保存登录状态到session-目的是登录认证,拦截器处使用
            // 重定向到主界面
            var redirectUrl = '/main.do';
            if (req.session.originalUrl) {
                redirectUrl = req.session.originalUrl;
                req.session.originalUrl = null;
            }
            res.redirect(redirectUrl);
        }
    } catch (error) {
        next(error);
    }
};
/**
 * 主界面
 */

exports.main = function (req, res) {
    res.render('index');
};

/*
 * 注册
 */
exports.enroll = function (req, res) {
    res.render('enroll');
};