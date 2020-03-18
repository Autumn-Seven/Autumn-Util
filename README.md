# Autumn-util
前端常用的工具函数，支持umd


业务开发过程中，会经常用到`日期格式化`、`url参数转对象`、`浏览器类型判断`、`节流函数`等常用函数，

##  安装使用

1. 直接下载`dest`目录下的[autumn-util.min.js](https://github.com/Autumn-Seven/Autumn-util/blob/master/dest/autumn-util.min.js)使用，支持UMD通用模块规范
2. 使用npm安装

### 浏览器:
``` html
  <script src="autumn-util.min.js"></script>
  <script>
        AUtil.isFunction()
  </script>
```

### npm:
``` bash
$ npm install --save-dev  autumn-util
```

webpack、RequireJS、SeaJS等

``` javascript
// 完整引入
const AUtil = require('autumn-util')

```


