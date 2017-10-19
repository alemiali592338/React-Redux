const webpack = require('webpack');
const config = require('../webpack.config.dev');
const WebpackDevServer = require("webpack-dev-server");
/* eslint-disable no-console */
const port = 3000;

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    contentBase: './src/',
    historyApiFallback: {
        index: '/index.html',
        disableDotRule: true
    }
  }).listen(port, 'localhost', function (err, result) {
    if (err) {
      return console.log(err);
    }
  
    console.log(`Listening at http://localhost:${port}/`);
  });