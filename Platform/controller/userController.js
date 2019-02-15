/* eslint-disable valid-jsdoc */
/* eslint-disable radix */
var querydb = require('../utils/querydb');
var crypto = require('crypto'); // 加载crypto库加密

/**
 * 异步检查用户名是否已经存在 AJAX
 */
exports.checkUser = async function (req, res, next) {
    var username = req.body.username;

    var sql = 'SELECT count(*) AS count  FROM goodsuser WHERE username = ?';
    var data = await querydb(sql, [username]);
    var num = data[0].count;
    // 判断用户名是否存在
    if (num !== 0) {
        res.send({
            code: 1,
            msg: '用户名已经存在 !',
        });
    } else {
        res.send({
            code: 0,
        });
    }
};

/**
 * 注册用户提交
 */
exports.enroll = async function (req, res, next) {
    var userName = req.body.clientname;
    var passWord = req.body.password;
    var phone = req.body.phone;
    var email = req.body.email;
    // md5加密password
    var md5 = crypto.createHash('md5');
    md5.update(passWord); // 加密
    var psw = md5.digest('hex');
    try {
        var sql = 'INSERT INTO goodsuser (username,password,phone,email)VALUES (?,?,?,?)';
        var paramers = [userName, psw, phone, email];
        await querydb(sql, paramers);
        res.redirect('/');
    } catch (error) {
        next(error);
    }
};