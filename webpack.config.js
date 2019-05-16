const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, argv) => {
  return {
    entry: './src/index.tsx',
    mode: 'development',
    resolve: {extensions: ['.ts','.tsx','.js']},

    module: {
        rules: [
          {
            enforce: 'pre',
            test: /\.js$/,
            exclude: /(node_modules|bower_components|vendors)/,
            loader: 'eslint-loader',
            options: {
            fix: true,
            },
          },
          { 
            test: /\.tsx?$/,
            exclude: /(node_modules|bower_components|vendors)/,
            loader: 'babel-loader'
          },
          { 
            test: /\.css$/,
            loader: ['style-loader','css-loader']
          },
          {
            test: /\.html$/,
            loader: 'html-loader',
            options: {
            minimize: true,
            removeComments: true,
            collapseWhitespace: true,
            },
            },
          {
            test: /\.(sa|sc)ss$/,
            use: [argv.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          },
          {
            test: /\.(jpe?g|png|gif)$/,
            loader: 'file-loader',
            options: {
            outputPath: 'assets/',
            },
          },
          {
            test: /\.(eot|svg|ttf|woff2?|otf)$/,
            loader: 'file-loader',
            options: {
            outputPath: 'assets/',
            }
          }          
        ]
      },

      plugins: [
        new HtmlWebPackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        }),

        new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.$': 'jquery',
        'window.jQuery': 'jquery',
        Waves: 'node-waves',
        _: 'underscore',
        Promise: 'es6-promise',
        }),

        new MiniCssExtractPlugin({
        filename: argv.mode !== 'production' ? '[name].css' : '[name].[hash].css',
        chunkFilename: argv.mode !== 'production' ? '[id].css' : '[id].[hash].css',
        cssProcessorOptions: {
        safe: true,
        discardComments: {
        removeAll: true,
        },
        },
        }),

        new CopyWebpackPlugin([
        {
        from: '**/*',
        to: 'mdb-addons',
        context: path.resolve(__dirname, 'src', 'vendors', 'mdb', 'mdb-addons'),
        },
        ]),

        new CleanWebpackPlugin(),

        ],

        optimization: {
        splitChunks: {
        chunks: 'all',
        },
        minimizer: [
        new TerserPlugin({
        parallel: true,
        sourceMap: true,
        terserOptions: {
        output: {
        comments: false,
        },
        },
        }),

        new OptimizeCSSAssetsPlugin({}),
        ],

        },
        performance: {
        hints: false,
        },

  }      
}