const webpack = require('webpack')
      path = require('path'),
      ExtractTextPlugin = require("extract-text-webpack-plugin"),
      HTMLWebpackPlugin = require('html-webpack-plugin'),
      ExtractCSS = new ExtractTextPlugin("css/[name].[chunkhash].css"),
      CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    vendor: [
      'script-loader!jquery/dist/jquery.js',
      'script-loader!tether/dist/js/tether.js',
      'script-loader!bootstrap/dist/js/bootstrap.js'
    ],
    bundle: [
      'webpack-dev-server/client?http://localhost:8080',
      './src/index.js',
    ],
    site: './src/css/site.scss',
    vendorCSS: './src/css/vendor.scss'
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },

  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
         test: /\.scss/,
         loader: ExtractTextPlugin.extract({
           fallbackLoader: 'style-loader',
           loader: "css-loader!sass-loader",
         }),
       },
       {
         test: /\.(png|woff|woff2|eot|ttf|svg)$/,
         loader: 'url-loader?limit=100000'
       }
    ]
  },

  devServer: {
    contentBase: './dist',
    inline: true,
    historyApiFallback: true,
    headers: {'Access-Control-Allow-Origin': '*'}
  },


  plugins: [

    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),

    ExtractCSS,

    new CopyWebpackPlugin([
        {
          from: './src/images/',
          to: 'images/'
        },
      ],
      {
        copyUnmodified: true
      }
    ),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),

    new HTMLWebpackPlugin({
      template: 'src/index.html'
    }),

  ]
};
