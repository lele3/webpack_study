const merge = require('webpack-merge');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const cssnano = require('cssnano');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  module: {
    rules: [{
      test: /\.css$/,
      use: 'ignore-loader',
    },
    {
      test: /\.less$/,
      use: 'ignore-loader',
    },
    ],
  },
  plugins: [
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /.css$/g,
      cssProcessor: cssnano,
    }),
    // 分离基础包，用于cdn引入
    new HtmlWebpackExternalsPlugin({
      externals: [{
        module: 'react',
        entry: 'https://cdn.bootcss.com/react/16.9.0-rc.0/cjs/react.development.js',
        global: 'React',
      }, {
        module: 'react-dom',
        entry: 'https://cdn.bootcss.com/react-dom/16.9.0-rc.0/cjs/react-dom-server.browser.development.js',
        global: 'ReactDOM',
      }],
    }),
  ],
  // 利用SplitChunksPlugin分离页面公共文件
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);
