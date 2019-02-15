/* eslint-disable radix */
var express = require('express');
var control = require('../controller/userController');
var userRouter = express.Router();

/* 检查用户名是否存 */
userRouter.post('/checkUser.do', control.checkUser);
/* 注册用户提交 */
userRouter.post('/enroll.do', control.enroll);

module.exports = userRouter;
