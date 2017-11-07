const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: 'styles.css'
});

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'scripts.js'
  },
  devServer: {
    contentBase: './'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    }],
    rules: [{
      test: /\.css$/,
      use: extractSass.extract({
        use: [
          {
            loader: 'css-loader',
            options: { url: false, importLoaders: 1 }
          }, 
          'postcss-loader'
        ]
      })
    }]
  },
  plugins: [
    new UglifyJSPlugin(),
    extractSass
  ]
};