const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const Dotenv = require('dotenv-webpack');

const path = require("path")

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new CleanWebpackPlugin(),
    new Dotenv({
      systemvars: true,
    })
  ],
  entry: {
    mapdashboard: path.resolve(__dirname, './src/index.tsx'),
  },
  output: {
    filename: `[name].${process.env.MODE}.js`,
    path: path.resolve(__dirname, `deploy-${process.env.MODE}`)
  },
  devServer: {
    contentBase: './deploy',
    open: true,
    port:8080
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource'},
      { test: /\.tsx?$/, loader: 'ts-loader', exclude: '/node_modules/' },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.tsx'],
    fallback: {
      fs: false,
      path: false,
    },
  }
}
