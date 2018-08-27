const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const tailwindcss = require('tailwindcss')

module.exports = [
  {
    entry: {
      index: './client/views/index.js',
    },
    output: {
      path: path.resolve('dist'),
      filename: '[name]_bundle.js',
      publicPath: '/'
    },
    resolve: {
      extensions: [".js", ".jsx", ".es6"]
    },
    module: {
      rules: [
        { test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { importLoaders: 1 } },
            { loader: 'postcss-loader', options: {
              ident: 'postcss',
              plugins: () => [
                postcssPresetEnv({ stage: 0 }),
                tailwindcss('./client/styles/tailwind.js'),
                require('autoprefixer')
              ]
            } }
          ]
        },
        {
          test: /.*\.(gif|png|jpe?g|svg)$/i,
          use: "file-loader?name=[hash].[ext]&publicPath=assets/&outputPath=assets/"
        }, {
          test: /.*\.(eot|ttf|woff|woff2|)$/i,
          loader: "file-loader?name=[hash].[ext]&publicPath=/assets/fonts/&outputPath=assets/fonts/"
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ]
  }
]
