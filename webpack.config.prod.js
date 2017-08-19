const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    bundle: path.join(__dirname, './src/index.js'),
    vendors: [
      "react",
      "react-dom",
      "react-redux",
      "react-router",
      "react-router-redux",
      "redux",
      "redux-thunk",
      "toastr"
    ]
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].min.js',
    publicPath: '/',
    sourceMapFilename: '[file].map',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      // alias all third party dependencies to this module
      "react": path.resolve('./node_modules/react'),
      "react-dom": path.resolve('./node_modules/react-dom'),
      "react-redux": path.resolve('./node_modules/react-redux'),
      "react-router": path.resolve('./node_modules/react-router'),
      "react-router-redux": path.resolve('./node_modules/react-router-redux'),
      "redux": path.resolve('./node_modules/redux'),
      "redux-thunk": path.resolve('./node_modules/redux-thunk'),
      "toastr": path.resolve('./node_modules/toastr')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new CleanWebpackPlugin(['dist'], {
    // Without `root` CleanWebpackPlugin won't point to our
    // project and will fail to work.
    root: process.cwd()
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),
    new CopyWebpackPlugin([
      
    ]),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './src/template.html',
      attrs: ['img:src', 'link:href']
    })
  ],
  module: {
    rules: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel-loader']},
      {test: /(\.css)$/, loaders: ['style-loader', 'css-loader']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
      {test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'}
    ]
  }
}