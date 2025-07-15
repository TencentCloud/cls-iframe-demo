# CLS 免登陆跳转控制台

[内嵌日志服务控制台]

本项目为 内嵌日志服务控制台 的开箱即用演示样例，核心逻辑代码请参考 `utils/roleAccess.js` 文件。<br />
用户可将代码逻辑拷贝到自己的项目中，为免登陆用户提供链接生成服务。

**注意：**<br/>
**1. 该 demo 中不包含鉴权外部系统鉴权逻辑，部署后所有访问者（即使未登陆腾讯云）均可以 demo 中配置的角色权限查看账户中的数据。为保障数据隐私，请自行添加外部系统鉴权逻辑或限制其仅在内网中可访问，以确保有权限的用户才能够查看该页面。**<br/>
**2. 目前主流浏览器均计划严格限制[第三方Cookie](https://developer.mozilla.org/zh-CN/docs/Web/Privacy/Guides/Third-party_cookies)，具体策略可参考[浏览器如何处理第三方Cookie](https://developer.mozilla.org/zh-CN/docs/Web/Privacy/Guides/Third-party_cookies#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E7%AC%AC%E4%B8%89%E6%96%B9_cookie)。如需通过iframe嵌入本demo所示的免登录链接，需确保浏览器允许使用第三方Cookie能力，否则将无法在iframe中完成自动登陆。**<br/>

# 配置

在项目根目录创建 `.env` 文件，填入 password, SecretId, SecretKey, RoleArn。
或在 config/default.js 中直接进行值配置

| 参数                  | 描述                                                                                                                                                                                                                                                                                                                        |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| password             | 跳转服务密码，输入后即可以配置的身份访问控制台                                                                                                                                                                                                                                                                                                   |
| port                 | 服务端口号，默认值为 3000                                                                                                                                                                                                                                                                                                           |
| s_url                | 内嵌页面跳转地址                                                                                                                                                                                                                                                                                                                  |
| baseCloudApiEndpoint | 云API访问主域名，默认 tencentcloudapi.com                                                                                                                                                                                                                                                                                                             |
| SecretId             | [云 API 密钥]SecretId                                                                                                                                                                                                                                                                                                        |
| SecretKey            | [云 API 密钥]SecretKey                                                                                                                                                                                                                                                                                                       |
| RoleArn              | [AssumeRole]接口请求参数。<br>角色的资源描述，可在[访问管理]，点击角色名获取。<br>普通角色：<br>qcs::cam::uin/12345678:role/4611686018427397919、qcs::cam::uin/12345678:roleName/testRoleName<br>服务角色：<br>qcs::cam::uin/12345678:role/tencentcloudServiceRole/4611686018427397920、qcs::cam::uin/12345678:role/tencentcloudServiceRoleName/testServiceRoleName |
| RoleSessionName      | [AssumeRole]接口请求参数，默认为 cls-iframe。<br>临时会话名称，由用户自定义名称。<br>长度在 2 到 128 之间，可包含大小写字符，数字以及特殊字符：=,.@-。 正则为：[\w+=,.@-]\*                                                                                                                                                                                                        |

# 运行

### 容器化运行方案

> 从源码构建最新镜像版本
> `docker build . --tag=cls_iframe_demo`
>
> 运行容器
> `docker run --env-file ./.env -p 3000:3000 cls_iframe_demo`

### Nodejs 运行方案

1. 安装 [nodejs] v14 以上版本

2. 进入项目根目录，使用命令 `npm i` 安装依赖

3. 运行 `npm run start`

4. 查看命令行中打印的 `Server running at http://xxxx` url 地址，在浏览器中打开。

[云api密钥]: https://console.cloud.tencent.com/capi
[assumerole]: https://cloud.tencent.com/document/product/598/33164
[访问管理]: https://console.cloud.tencent.com/cam/role
[内嵌日志服务控制台]: https://cloud.tencent.com/document/product/614/45742
[nodejs]: https://nodejs.org/

---

# 对于有权限自定义控制，控制台与自有页面结合等复杂诉求的客户，可使用 [cls-console-sdk](https://github.com/TencentCloud/cls-console-sdk) 方案 自定义开发以集成控制台展示能力

将腾讯云日志服务以内嵌方式集成到其他系统中，免登录实现一站式日志访问，方便快捷使用 CLS 日志服务（包含检索分析，仪表盘）
