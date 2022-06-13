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
  
  {
    entry: getFullPath('resources/sass/app.scss'),
    output: {
      path: getFullPath('public/css/'),
      filename: 'app.css'
    },
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.scss', '.css']
    }
  }

];
