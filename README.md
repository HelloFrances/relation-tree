# dataextention

> A gs-ui template project

### 项目结构
```Javascript
|--build
|--config
|--dist             //webpack打包后生成的文件夹
|--node_modules     //项目的依赖所在的文件夹
|--src              //文件入口
|   |--components   //组件存放文件夹
|       |--xxx.vue  //组件
|   |--router
|       |--index.js //路由配置文件
|   |--service          //HTTP库的封装
|   |--store        //vuex状态管理
|       |--module   //store分割的模块
|       |--index.js 
|   |--views        //视图文件存放文件夹
|   |--App.vue      //最顶层组件
|   |--index.js      //主js文件
|--public
|   |--index.html       //主html文件
|--package.json
```

### 使用技术
- `Vue.js` 轻量级的MVVM框架
  - `vue-router` 前端路由
  - `vuex` Vue.js应用程序开发的状态管理模式
- `mikaisa` 构建工具，[使用说明](https://gitlab.gridsum.com/frontend/gs-ui/mikaisa)
- `gs-ui` 基于Vue.js的UI组件库


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm start

# build for production with minification
npm run build

# build dll
npm run dll

# build for production and view the bundle analyzer report
npm run build --report

# run all tests
npm test
```
