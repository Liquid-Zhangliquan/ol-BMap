module.exports = {
  publicPath: './',
  devServer: {
    port: 8095,
    proxy: {
      '/offlineMap': {
        target: 'http://localhost:5000/',
        changeOrigin: true,
        pathRewrite: {
          '^/offlineMap': ''
        }
      },
    }

  }
}