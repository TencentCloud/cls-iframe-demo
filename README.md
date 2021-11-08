# CLS iframe demo

[内嵌日志服务控制台]

**注意：**<br/>
**该demo中不包含鉴权外部系统鉴权逻辑，部署后所有访问者（即使未登陆腾讯云）均可以demo中配置的角色权限查看账户中的数据。**<br/>
**为保障数据隐私，请自行添加外部系统鉴权逻辑或限制其仅在内网中可访问，以确保有权限的用户才能够查看该页面。**

# 环境

nodejs >= 10

# 配置

在 config/default.js 中填入 SecretId, SecretKey, RoleArn。

参数 | 描述
---- | -----
host | 本地运行IP
port | 本地运行端口
s_url | 内嵌页面跳转地址
SecretId | [云API密钥]SecretId
SecretKey | [云API密钥]SecretKey
Region | [AssumeRole]接口请求地域
RoleArn | [AssumeRole]接口请求参数。<br>角色的资源描述，可在[访问管理]，点击角色名获取。<br>普通角色：<br>qcs::cam::uin/12345678:role/4611686018427397919、qcs::cam::uin/12345678:roleName/testRoleName<br>服务角色：<br>qcs::cam::uin/12345678:role/tencentcloudServiceRole/4611686018427397920、qcs::cam::uin/12345678:role/tencentcloudServiceRoleName/testServiceRoleName
RoleSessionName | [AssumeRole]接口请求参数，默认为cls-iframe。<br>临时会话名称，由用户自定义名称。<br>长度在2到128之间，可包含大小写字符，数字以及特殊字符：=,.@-。 正则为：[\w+=,.@-]*

# 运行

### 本地运行

##### 1 安装[nodejs], [yarn]

##### 2 安装依赖

`cd YOUR_PATH/cls-iframe-demo`

`yarn install`

##### 3 运行

`yarn start`

##### 4 浏览器打开demo页面

查看命令行中打印的 `Server running at http://xxxx` url地址，在浏览器中打开。

[云API密钥]: https://console.cloud.tencent.com/capi
[AssumeRole]: https://cloud.tencent.com/document/product/598/33164
[访问管理]: https://console.cloud.tencent.com/cam/role
[内嵌日志服务控制台]: https://cloud.tencent.com/document/product/614/45742
[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
