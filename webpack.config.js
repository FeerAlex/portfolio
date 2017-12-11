const webpack                 = require('webpack');
const path                    = require('path');
const HtmlWebpackPlugin       = require('html-webpack-plugin');
const CleanWebpackPlugin      = require('clean-webpack-plugin');
const ExtractTextPlugin       = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StyleLintPlugin         = require('stylelint-webpack-plugin');
const UglifyJsPlugin          = require('uglifyjs-webpack-plugin');
const FaviconsWebpackPlugin   = require('favicons-webpack-plugin');

const PATHS = {
  source: path.join(__dirname, 'assets'),
  build: path.join(__dirname, 'build'),
};

const dev = process.env.NODE_ENV === 'dev';
const prod = process.env.NODE_ENV === 'prod';

module.exports = {
  entry: {
    'about': PATHS.source + '/views/about/about.js',
    'blog': PATHS.source + '/views/blog/blog.js',
    'index': PATHS.source + '/views/index/index.js',
    'works': PATHS.source + '/views/works/works.js',
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  devtool: dev ? 'inline-cheap-module-source-map' : '(none)',
  output: {
    path: PATHS.build,
    filename: prod ? './js/[name].min.js' : './js/[name].js',
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
    new ExtractTextPlugin('./css/[name].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
    }),
    new StyleLintPlugin({
      configFile: './.stylelintrc',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true,
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          publicPath: '../',
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 } },
            {
              loader: 'postcss-loader',
              options:{
                plugins: (loader) => [
                  require('autoprefixer')({
                    browsers: ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11']
                  })
                ]
              }
            },
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
      {
        test: /\.js$/,
        enforce: "pre",
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        exclude: /node_modules/,
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
              enabled: prod,
            }
          },
        ],
      },
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
      {
        test: /^(?!.*\.generated\.ttf$).*\.ttf$/,
        use: ExtractTextPlugin.extract({
          publicPath: '../',
          use: ['css-loader', 'fontface-loader'],
        }),
      },
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

if (prod) {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new CleanWebpackPlugin(PATHS.build),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions:{
        discardComments:{
          removeAll: true,
        },
      },
    }),
    new UglifyJsPlugin(),
    new FaviconsWebpackPlugin({
      logo: PATHS.source + '/img/leaf.png',
      prefix: 'icons-[name]/',
    }),
  ]);
};