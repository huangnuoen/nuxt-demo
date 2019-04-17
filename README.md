# nuxt-app

> My super Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## 目录

### nuxt.config.js
1. 全局引入css/less/sass
```javascript
  css: [{
    src: '@/assets/css/reset.less',
    lang: 'less'
  }],
```
2. proxy
3. 引入第三方ui库
### package.json
1. 根据编译命令生成不同的文件
```javascript
script: {
  "dev": "cross-env NODE_ENV=development nodemon server/index.js --watch server",
    "build": "nuxt build",
    "start": "cross-env NODE_ENV=production node server/index.js",
    "generate": "nuxt generate",
    "build:gh-pages": "cross-env DEPLOY_ENV=GH_PAGES nuxt build",
    "generate:gh-pages": "cross-env DEPLOY_ENV=GH_PAGES nuxt generate"
}

const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: './'
  }
} : {}
```
