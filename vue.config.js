// eslint-disable-next-line @typescript-eslint/no-var-requires
const CompressionPlugin = require("compression-webpack-plugin")
console.log(process.env.NODE_ENV)
module.exports = {
  // publicPath: process.env.NODE_ENV === 'development' ? '/' : "/vue-admin-work-x",
  publicPath: '/',
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    hot: true,
    port: 8888,
    open: true,
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        }
      ]
    }
  },
  chainWebpack(config) {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin')
        .use(new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.html$|\.css/,
          threshold: 50240,
          deleteOriginalAssets: false
        }))
    }
  },
  // eslint-disable-next-line no-dupe-keys
  devServer: {
    host: 'localhost',        //设置本地服务器   选填
    port: 8888,              //设置本地默认端口  选填
    proxy: {                 //设置代理，必须填
        '/api': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
            target: 'http://124.70.37.65:8000',     //代理的目标地址，这是豆瓣接口地址网址
            changeOrigin: true,              //是否设置同源，输入是的
            pathRewrite: {                   //路径重写
                '/api': '/',                    //路径转发代理 /api 的意思就是 用/api 代替http:localhost：8080
            }
        },
        // '/cloud': {
        //     target: 'http://localhost:3000',
        //     changeOrigin: true,
        //     pathRewrite: {
        //         '^/cloud': '',
        //     }
        // }
    }
}
};
