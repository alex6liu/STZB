# stock dairy

> An electron-vue sqlite3 project

#### Build Setup

``` bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 本地打包（安装程序）
npm run build

# 本地打包（直接目录）
npm run build:dir

# 问题
### windows
需要安装 [.NET Framework 2.0](https://www.microsoft.com/en-us/download/confirmation.aspx?id=1639)
和
`npm install -g --production windows-build-tools`

### mac
`npm i` 

直接可以`npm run dev` 和 `npm run build` (build出的是mac上的软件,有dmg)
```

### icon 
来自iView `https://www.iviewui.com/components/icon-en`

---

## 项目

在[easy-invoices](https://github.com/CaanDoll/easy-invoices)的基础上进行修改
[参考](https://miss-me.github.io/2018/12/04/react-electron-ant-design-sqlite3%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E6%A1%8C%E9%9D%A2%E5%BA%94%E7%94%A8/)
## 目的

### version 1
- 记录下率土之滨的武将阵容

### version 2
- 添加适用于自己的配将记录
- 添加武将库 技能库

### version 3
- 使用draggable组件, 配置自己的组队

#### bug
- UnicodeToAscii 会导致非unicode的数字等符号丢失