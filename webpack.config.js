const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => ({
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: argv.mode === 'production'
      ? '[name].[contenthash].js'
      : '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      // JS / JSX: Babel + React
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // Здесь подключаем пресеты для ES и React
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            // Если нужно — можно включить поддержку class-properties:
            plugins: [
              // '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },
      // CSS
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // Картинки, иконки
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext][query]'
        }
      },
      // Шрифты (если понадобятся)
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      }
    ],
  },
  devServer: {
    static: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true,
  },
  plugins: [
    // Очищаем dist перед каждой сборкой
    new CleanWebpackPlugin(),
    // Генерируем index.html и внедряем скрипты
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
  ],
  // Генерация source maps в dev режиме
  devtool: argv.mode === 'production' ? false : 'inline-source-map',
  performance: {
    hints: false,
  },
});
