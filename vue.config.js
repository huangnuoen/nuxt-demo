
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const path = require('path')
const staticPath = '../../view/bs-face/dist/'
// const publicPath = 'http://dev.kangaroo.com/view/bs-face/dist/'
// const publicPath = 'http://test.daishutijian.com/kangaroo/view/bs-face/dist/'

module.exports = {
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? staticPath : '/',
  indexPath: 'index.php',
  configureWebpack: config => {
    if (1 || process.env.NODE_ENV !== 'production') return
    return {
      plugins: [
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          routes: ['/', '/upload-card'],
          renderer: new Renderer({
            inject: {
              foo: 'bar'
            },
            headless: false,
            renderAfterDocumentEvent: 'render-event',
            // 在一定时间后再捕获页面信息，使得页面数据信息加载完成
            captureAfterTime: 5000
          })
        })
      ]
    }
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    config.plugins.delete('prefetch')
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      '/proxyApi': {
        target: 'http://dev.kangaroo.com',
        // target: 'http://dev.daishutijian.com',
        changeOrigin: true,
        pathRewrite: {
          '/proxyApi': ''
        }
      }
    }
  }
}
function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, '@/assets/css/variable.less') // 需要全局导入的less
      ]
    })
}
