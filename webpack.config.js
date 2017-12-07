const webpack             = require('webpack');
const path                = require('path');
const HtmlWebpackPlugin   = require('html-webpack-plugin');
const merge               = require('webpack-merge');

const pug                 = require('./tasks/pug');
const devserver           = require('./tasks/devserver');
const sass                = require('./tasks/sass');
const uglify              = require('./tasks/uglify');
const jsLint              = require('./tasks/js.lint');
const sassLint            = require('./tasks/sass.lint');
const img                 = require('./tasks/img');
const favicon             = require('./tasks/favicon');
const svg                 = require('./tasks/svg');
const fonts               = require('./tasks/fonts');

const PATHS = {
  source: path.join(__dirname, 'assets'),
  build: path.join(__dirname, 'build'),
};

const common = merge([
  {
    entry: {
      'about': PATHS.source + '/views/about/about.js',
      'blog': PATHS.source + '/views/blog/blog.js',
      'index': PATHS.source + '/views/index/index.js',
      'works': PATHS.source + '/views/works/works.js',
    },
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
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
      }),
    ],
  },
  pug(),                            /* Компиляция pug файлов в html файлы*/
  sass(),                           /* Компиляция sass файлов в css файлы */
  jsLint({paths: PATHS.source}),    /* Линтинг javascript файлов */
  sassLint(),                       /* Линтинг scss файлов */
  img(),                            /* Копирование и оптимизация изображений */
  svg(),                            /* Обработка svg файлов и генерация svg спрайта*/
  fonts(),                          /* Генерация шрифтов и запись font-face в css */
]);

module.exports = function (env) {

  if (env === 'prod') {
    console.log('RUN PRODUCTION');

    return merge([
      common,
      uglify({useSourceMap: true}),
      favicon()
    ]);
  }

  if (env === 'dev') {
    console.log('RUN DEVELOPMENT');

    return merge([
      common,
      devserver(),
    ]);
  }

};

// hot module replacement