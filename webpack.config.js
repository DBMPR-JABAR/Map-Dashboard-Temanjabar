const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const path = require("path")
const { env } = require("./env")

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      templateParameters: {
        baseUrl: env.baseUrl
      }
    }),
    new CleanWebpackPlugin()
  ],
  entry: {
    main: path.resolve(__dirname, './src/index.tsx'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'deploy')
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
    extensions: ['.ts', '.js', '.json', '.tsx']
  }
}
