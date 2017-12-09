const webpack                 = require('webpack');
const path                    = require('path');
const HtmlWebpackPlugin       = require('html-webpack-plugin');
const CleanWebpackPlugin      = require('clean-webpack-plugin');
const ExtractTextPlugin       = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StyleLintPlugin         = require('stylelint-webpack-plugin');
const UglifyJsPlugin          = require('uglifyjs-webpack-plugin');
const FaviconsWebpackPlugin   = require('favicons-webpack-plugin');
// const merge                   = require('webpack-merge');

const PATHS = {
  source: path.join(__dirname, 'assets'),
  build: path.join(__dirname, 'build'),
};

module.exports = function(env) {
  const enabled = (env === 'prod');
  console.log('STATUS prod: ', enabled);

  return {
    entry: {
      'about': PATHS.source + '/views/about/about.js',
      'blog': PATHS.source + '/views/blog/blog.js',
      'index': PATHS.source + '/views/index/index.js',
      'works': PATHS.source + '/views/works/works.js',
    },
    devServer: {
      stats: 'errors-only',
    },
    // devtool: !enabled ? 'inline-cheap-module-source-map' : '(none)',
    output: {
      path: PATHS.build,
      filename: './js/[name].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'about.html',
        chunks: ['about', 'common'],
        template: PATHS.source + '/views/about/about.pug',
      }),
      new HtmlWebpackPlugin({
        filename: 'blog.html',
        chunks: ['blog', 'common'],
        template: PATHS.source + '/views/blog/blog.pug',
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['index', 'common'],
        template: PATHS.source + '/views/index/index.pug',
      }),
      new HtmlWebpackPlugin({
        filename: 'works.html',
        chunks: ['works', 'common'],
        template: PATHS.source + '/views/works/works.pug',
      }),
      /* Удаление папки с билдом */
      new CleanWebpackPlugin(PATHS.build),
      new ExtractTextPlugin('./css/[name].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
      }),
      /* Оптимизация css файлов */
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          discardComments: {
            removeAll: !enabled,
          },
        },
      }),
      /* Линтинг scss файлов */
      new StyleLintPlugin({
        configFile: './.stylelintrc',
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
      /* Сжатие js файлов */
      new UglifyJsPlugin(),
      /* Генерация favicon */
      new FaviconsWebpackPlugin({
        logo: PATHS.source + '/img/leaf.png',
        prefix: 'icons-[name]/',
      }),
    ],
    module: {
      rules: [
        /* Компиляция pug файлов в html файлы*/
        {
          test: /\.pug$/,
          loader: 'pug-loader',
          options: {
            pretty: true,
          },
        },
        /* Компиляция sass файлов в css файлы */
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            publicPath: '../',
            use: [
              'css-loader',
              'sass-loader',
            ],
          }),
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
            ]
          }),
        },
        /* Линтинг javascript файлов */
        {
          test: /\.js$/,
          enforce: "pre",
          exclude: /node_modules/,
          loader: "eslint-loader",
        },
        /* Преобразование es6 в es5 */
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        /* Копирование и оптимизация изображений */
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[name].[ext]',
              },
            },
            {
              loader: 'img-loader',
              options: {
                enabled: enabled,
              }
            },
          ],
        },
        /* Оптимизация svg файлов и генерация svg спрайта*/
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-sprite-loader'
            },
            {
              loader: 'svgo-loader',
              options: {
                plugins: [
                  { removeNonInheritableGroupAttrs: true },
                  { collapseGroups: true },
                  { removeAttrs: { attrs: '(fill|stroke)' } },
                ],
              },
            },
          ],
        },
        /* Генерация шрифтов и запись font-face в css */
        {
          test: /^(?!.*\.generated\.ttf$).*\.ttf$/,
          use: ExtractTextPlugin.extract({
            publicPath: '../',
            use: ['css-loader', 'fontface-loader'],
          }),
        },
        /* Перетаскивание шрифтов в папку fonts */
        {
          test: /\.generated.(ttf|eot|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts/',
                name: '[name].[ext]',
              },
            },
          ],
        },
      ],
    },
  };
};