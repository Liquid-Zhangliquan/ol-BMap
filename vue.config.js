module.exports = {
  publicPath: './',
  devServer: {
    port: 8095,
    proxy: {
      '/gaodejpg': {
        target: 'http://localhost:5000/',
        changeOrigin: true,
        pathRewrite: {
          '^/gaodejpg': ''
        }
      },
    }

  }
}