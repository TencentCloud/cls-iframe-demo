# CLS iframe demo

[内嵌日志服务控制台]

# 环境

nodejs >= 10

# 配置

在 config/default.js 中填入 SecretId, SecretKey, RoleArn。

参数 | 描述
---- | -----
host | 本地运行IP
port | 本地运行端口
s_url | 内嵌页面跳转地址
SecretId | 腾讯云API密钥SecretId
SecretKey | 腾讯云API密钥SecretKey
Region | [AssumeRole]接口请求地域
RoleArn | [AssumeRole]接口请求参数
RoleSessionName | [AssumeRole]接口请求参数

# 运行

### 1. 本地运行

##### 1.1 安装[nodejs], [yarn]

##### 1.2 安装依赖

`cd YOUR_PATH/cls-iframe-demo`

`yarn install`

##### 1.3 运行

`yarn start`

##### 1.4 浏览器打开demo页面

查看命令行中打印的 `Server running at http://xxxx` url地址，在浏览器中打开。

[AssumeRole]: https://cloud.tencent.com/document/product/598/33164
[内嵌日志服务控制台]: https://cloud.tencent.com/document/product/614/45742
[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/