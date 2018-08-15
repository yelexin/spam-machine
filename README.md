# spam-machine

#### 项目介绍
Spam machine

#### 软件架构
    ├── account // 切割结果，矿池
    │   ├── 163aa
    │   ├── 163ab
    │   ├── 163ac
    │   └── 163bl
    ├── bigFileCut // 大文件切割加工
    │   ├── bigFiles
    │   │   └── large.txt
    │   └── cut.sh
    ├── common
    │   └── schemas // 数据库 modules
    │       ├── goldSchema.js
    │       ├── goodProxySchema.js
    │       ├── proxySchema.js
    │       └── silverSchema.js
    ├── db
    ├── dbBak
    ├── goldChecker // 定期检查挖掘到的可用账号的可用性
    │   ├── content.js
    │   ├── index.js
    │   ├── mixText.js
    │   └── randomChar.js
    ├── goodProxyChecker // 定期检查可用的 socks 代理可用性
    │   └── index.js
    ├── httpProxyChecker // 定期检查 http 代理可用性
    │   └── index.js
    ├── miner // 挖掘 smtp 可用账号
    │   ├── content.js
    │   ├── index.js
    │   ├── mixText.js
    │   └── randomChar.js
    ├── package.json
    ├── package-lock.json
    ├── proxyChecker // 检查所有代理可用性
    │   └── index.js
    ├── proxyCrawler // 代理爬虫
    │   └── index.js
    ├── raw // 未加工账号大文件
    │   ├── 163邮箱1-06.txt
    │   └── large.txt
    ├── spammer // 垃圾邮件发送器
    │   ├── content.js
    │   ├── index.js
    │   ├── mixText.js
    │   └── randomChar.js
    └── target // 垃圾邮件接受对象
        └── target.js

