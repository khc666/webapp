var express = require('express');
var indexRouter = express.Router();

var control = require('../controller/indexController');

/* 登录界面*/
indexRouter.get('/', control.login);
/* 主界面 */
indexRouter.get('/main.do', control.main);
/* 登录提交 */
indexRouter.post('/login.do', control.loginsubmit);
/* 注册界面 */
indexRouter.get('/enroll.do', control.enroll);

module.exports = indexRouter;