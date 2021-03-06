var path = require('path')
var webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index/main.js',
    settings: './src/settings/main.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  plugins: [
    new ExtractTextPlugin("main.css"),
    new HtmlWebpackPlugin({
      title: 'Departure Board',
      filename: 'index.html',
      template: 'src/template.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      title: 'Settings',
      filename: 'settings.html',
      template: 'src/template.html',
      chunks: ['settings']
    }),
    new CleanWebpackPlugin(),
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  console.log('Production build');
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
