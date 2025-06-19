const { defineConfig } = require('@vue/cli-service')
const path = require('path');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
  },
  devServer: {
    port: 8080,
    open: true,
  }
});
