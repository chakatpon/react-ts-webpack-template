var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    resolve: {extensions: ['.ts','.tsx','.js']},
    module: {
        rules: [
          { 
            test: /\.tsx?$/,
            exclude: /node_modules/, 
            loader: 'babel-loader'
          }
        ]
      },
      plugins: [new HtmlWebpackPlugin({
        template: './public/index.html'
    })]
}