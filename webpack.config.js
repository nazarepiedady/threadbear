const path = require('path');
const webpack = require('webpack');

function getFullPath(stringPath) {
  return path.resolve(__dirname, stringPath);
}

module.exports = [
  {
    entry: getFullPath('resources/js/app.js'),
    output: {
      path: getFullPath('public/js/'),
      filename: 'app.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
  },
  
/*  {
    entry: path.resolve(__dirname, 'resources/sass/app.scss'),
    output: {
      path: path.resolve(__dirname, 'public/css/'),
      filename: 'app.css'
    },
    module: {
      rules: [
        { test: /\.scss$/, use: 'sass-loader' }
      ]
    }
  }*/
];
