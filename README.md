# travel

#### 项目介绍
投票系统
1. 基于koa2基础上搭建升级
2. swagger自动生成接口文档测试
3. api 目录下是接口名编写及参数验证
4. controllers 下来是逻辑处理
5. 数据库才用knex库，官网https://knexjs.org/

#### 软件架构
- public  --静态文件
- swagger --调试界面
- server  --服务
-     apis    --接口编写
-     config  --配置文件 pm2 start pm2.json --env development ==> development     pm2 start pm2.json --env production ==> production 
-     controllers --逻辑处理模块
-     deps    --库
-     lib     --框架核心
-     middlewares --中间件存放位置
-     index.js    --文件引入
- app.js  --启动目录
- package-lock.json
- package.json    --包管理

#### 安装教程

1. git clone
2. npm i
3. node app.js

#### 使用说明
因redis和mysql用的服务器的
直接可以启动



